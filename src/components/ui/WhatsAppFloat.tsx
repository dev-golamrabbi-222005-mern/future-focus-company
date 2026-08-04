"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-xl bg-[#25D366] px-4 py-2 text-sm font-bold text-white shadow-lg whitespace-nowrap"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={siteConfig.offices.saudi.Whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/40"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="relative z-10 h-7 w-7"
          aria-hidden="true"
        >
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.77.74 5.4 2.04 7.67L.5 31.5l8.05-2.02A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.76 13.76 0 0 1-7-1.9l-.5-.3-5.18 1.3 1.35-4.93-.33-.51A13.73 13.73 0 0 1 2.2 16C2.2 8.93 8.93 2.2 16 2.2S29.8 8.93 29.8 16 23.07 28.8 16 28.8zm7.6-10.26c-.42-.21-2.47-1.22-2.85-1.36-.38-.14-.66-.21-.94.21-.28.42-1.08 1.36-1.33 1.64-.24.28-.49.31-.91.1-.42-.21-1.77-.65-3.37-2.08-1.25-1.11-2.09-2.49-2.34-2.91-.24-.42-.03-.65.18-.86.19-.19.42-.49.63-.73.21-.24.28-.42.42-.7.14-.28.07-.52-.03-.73-.1-.21-.94-2.26-1.29-3.09-.34-.8-.68-.69-.94-.7h-.8c-.28 0-.73.1-1.11.52-.38.42-1.45 1.42-1.45 3.46s1.48 4.01 1.69 4.29c.21.28 2.92 4.46 7.08 6.25.99.43 1.76.68 2.36.87.99.31 1.89.27 2.6.16.79-.12 2.47-1.01 2.82-1.98.35-.97.35-1.8.24-1.98-.1-.18-.38-.28-.8-.49z" />
        </svg>
      </motion.a>
    </div>
  );
}
