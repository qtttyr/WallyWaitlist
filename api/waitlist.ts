/**
 * File: /api/waitlist.ts
 * Location: Create this at the project root's /api directory
 * This is a Vercel serverless function for handling waitlist signups
 *
 * Note: keep this file free of @vercel/node and Node typings so it compiles
 * cleanly in environments without @types/node. We declare the minimal
 * `process.env` shape and small request/response types below.
 */

declare const process: {
  env: {
    RESEND_API_KEY?: string;
    OWNER_EMAIL?: string;
    FROM_EMAIL?: string;
    WAITLIST_DEBUG?: string;
  };
};

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const DEBUG = process.env.WAITLIST_DEBUG === "1";

type Req = {
  method: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type ResLike = {
  status: (code: number) => { json: (payload: ResponseData) => void };
};

type ResponseData = { success: true } | { error: string; details?: string };

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

function formatTimestamp(): string {
  const now = new Date();
  return now.toISOString();
}

export default async function handler(req: Req, res: ResLike): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const maybeBody = req.body as Record<string, unknown> | undefined;
    const email =
      typeof maybeBody?.email === "string"
        ? (maybeBody.email as string).trim()
        : undefined;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = (email as string).toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Send confirmation email to user
    if (!resend) {
      console.error("RESEND_API_KEY is not configured");
      const details = DEBUG ? "RESEND_API_KEY missing or empty" : undefined;
      return res
        .status(500)
        .json(
          details
            ? { error: "Email service not configured", details }
            : { error: "Email service not configured" },
        );
    }

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@wally.ai",
        to: normalizedEmail,
        subject: "You're on the Wally waitlist!",
        html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="font-size: 24px; margin-bottom: 16px;">You're in! 🎉</h1>

              <p style="margin-bottom: 12px;">
                Welcome to the Wally waitlist. You're officially in line for early access to the next generation of personal finance.
              </p>

              <p style="margin-bottom: 12px;">
                As an early adopter, you'll get <strong>3 months of Pro for free</strong> when we launch. That includes unlimited receipt scans, unlimited budgets, AI-powered insights, CSV exports, and priority support.
              </p>

              <p style="margin-bottom: 24px;">
                We'll notify you at <strong>${normalizedEmail}</strong> as soon as Wally opens for early access. In the meantime, stay tuned!
              </p>

              <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                  Questions? Reply to this email anytime.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      });
    } catch (err) {
      console.error("Failed to send user confirmation email:", err);
      const details = DEBUG ? String(err) : undefined;
      return res
        .status(500)
        .json(
          details
            ? { error: "Failed to send confirmation email", details }
            : { error: "Failed to send confirmation email" },
        );
    }

    // Send notification email to owner (best-effort)
    const ownerEmail = process.env.OWNER_EMAIL;
    if (ownerEmail) {
      if (!resend) {
        console.warn(
          "Owner notification skipped: RESEND_API_KEY not configured",
        );
      } else {
        try {
          await resend.emails.send({
            from: process.env.FROM_EMAIL || "noreply@wally.ai",
            to: ownerEmail,
            subject: "New Wally waitlist signup",
            html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="margin-bottom: 16px;">New Waitlist Signup</h2>
                <p style="margin-bottom: 8px;"><strong>Email:</strong> ${normalizedEmail}</p>
                <p style="margin-bottom: 8px;"><strong>Timestamp:</strong> ${formatTimestamp()}</p>
              </div>
            </body>
          </html>
        `,
          });
        } catch (err) {
          console.warn("Failed to send owner notification email:", err);
          // Don't fail the request if owner notification fails — user confirmation already sent
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    const details = DEBUG ? String(error) : undefined;
    res
      .status(500)
      .json(
        details
          ? { error: "Internal server error", details }
          : { error: "Internal server error" },
      );
  }
}
