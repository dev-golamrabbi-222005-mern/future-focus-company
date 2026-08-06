import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId } = body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    // Fallback when webhook URL is not configured in environment
    if (!webhookUrl) {
      return NextResponse.json({
        output: `Thank you for reaching out! Please set N8N_WEBHOOK_URL in your .env file to connect your live n8n workflow.`,
      });
    }

    const userMessage = message.trim();
    const activeSessionId = sessionId || "ffc-session-default";

    // Payload formatted for n8n Langchain AI Agent & Chat Trigger node (requires chatInput & sessionId)
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "sendMessage",
        chatInput: userMessage,
        message: userMessage,
        input: userMessage,
        sessionId: activeSessionId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(`n8n Webhook Error (${response.status}):`, errorText);

      if (response.status === 404) {
        return NextResponse.json({
          output: `n8n Webhook error (404 Not Found): Please make sure your workflow is Active in n8n (toggle switch in the top-right corner set to ON).`,
        });
      }

      return NextResponse.json({
        output: `n8n Webhook returned status ${response.status}. Please check your n8n workflow executions.`,
      });
    }

    const contentType = response.headers.get("content-type") || "";
    let replyText = "";

    if (contentType.includes("application/json")) {
      let data = await response.json();
      
      // If n8n returns an array, extract the first item
      if (Array.isArray(data) && data.length > 0) {
        data = data[0];
      }

      // Unwrap json property if present
      if (data?.json && typeof data.json === "object") {
        data = data.json;
      }

      replyText =
        typeof data === "string"
          ? data
          : data?.output ||
            data?.text ||
            data?.message ||
            data?.response ||
            (typeof data === "object" ? JSON.stringify(data) : String(data));
    } else {
      replyText = await response.text();
    }

    return NextResponse.json({
      output: replyText || "Message processed successfully.",
    });
  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      {
        output:
          "Sorry, we encountered an error contacting our AI support agent. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
