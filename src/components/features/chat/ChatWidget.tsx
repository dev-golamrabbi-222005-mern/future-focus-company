"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

function FormattedText({ content }: { content: string }) {
  // 1. Unescape literal \n if returned as string from n8n
  let text = content.replace(/\\n/g, "\n");

  // 2. Pre-process inline bullet dashes (e.g. "Please provide: - Item 1 - Item 2" -> split lines)
  text = text.replace(/([^\n])\s+([-\*•])\s+/g, "$1\n$2 ");

  // 3. Split into lines and parse structured blocks
  const lines = text.split("\n");
  const blocks: Array<{ type: "p" | "ul" | "ol"; items?: string[]; content?: string }> = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      return;
    }

    const isBullet = /^[-\*•]\s+/.test(trimmed);
    const isNumber = /^\d+[\.\)]\s+/.test(trimmed);

    if (isBullet) {
      const itemText = trimmed.replace(/^[-\*•]\s+/, "");
      if (!currentList || currentList.type !== "ul") {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(itemText);
    } else if (isNumber) {
      const itemText = trimmed.replace(/^\d+[\.\)]\s+/, "");
      if (!currentList || currentList.type !== "ol") {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(itemText);
    } else {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "p", content: trimmed });
    }
  });

  if (currentList) blocks.push(currentList);

  const parseInline = (str: string) => {
    // Parse inline bold syntax (**text** or __text__)
    const parts = str.split(/(\*\*.*?\*\*|__.*?__)/g);
    return parts.map((part, i) => {
      if (
        (part.startsWith("**") && part.endsWith("**")) ||
        (part.startsWith("__") && part.endsWith("__"))
      ) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === "ul" && block.items) {
          return (
            <ul key={idx} className="space-y-1.5 my-2 pl-0.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <span className="flex-1">{parseInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol" && block.items) {
          return (
            <ol key={idx} className="space-y-1.5 my-2 pl-0.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-primary shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="flex-1">{parseInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return <p key={idx}>{parseInline(block.content || "")}</p>;
      })}
    </div>
  );
}

export function ChatWidget() {
  const t = useTranslations("ChatWidget");
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Initialize welcome message once on client mount
  React.useEffect(() => {
    setMessages([
      {
        id: "welcome-1",
        role: "bot",
        content: t("welcomeMessage"),
      },
    ]);
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const sessionIdRef = React.useRef<string>("");
  if (!sessionIdRef.current) {
    sessionIdRef.current = "ffc-" + Math.random().toString(36).substring(2, 11);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!res.ok) throw new Error("API response error");

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.output || t("error"),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: t("error"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 right-6 z-50 flex items-center">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? t("close") : t("open")}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 border border-primary/30"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-background" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[540px] max-h-[78vh] flex flex-col rounded-3xl bg-card border border-border shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 text-primary-foreground flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    {t("title")}
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
                  </h3>
                  <p className="text-[11px] opacity-85">{t("subtitle")}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-colors"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 shadow-xs ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-xs text-sm"
                        : "bg-muted text-foreground border border-border/60 rounded-2xl rounded-tl-xs"
                    }`}
                  >
                    {msg.role === "user" ? msg.content : <FormattedText content={msg.content} />}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 max-w-[85%] px-4 py-2.5 text-xs text-muted-foreground bg-muted border border-border/60 rounded-2xl rounded-tl-xs">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    <span>{t("typing")}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-card border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                disabled={loading}
                className="flex-1 rounded-2xl bg-background border border-border/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label={t("send")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all shadow-md"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
