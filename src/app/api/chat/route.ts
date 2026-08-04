import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body || {};

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
        output: `Thank you for reaching out! Our AI Agent is ready. (Note: Please set N8N_WEBHOOK_URL in your .env file to connect your live n8n workflow).`,
      });
    }

    // Call external n8n webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned status ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    let replyText = "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      replyText =
        typeof data === "string"
          ? data
          : data?.output ||
            data?.text ||
            data?.message ||
            data?.response ||
            JSON.stringify(data);
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
