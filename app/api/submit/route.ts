import { NextResponse } from "next/server";
import { CONFIG } from "@/lib/config";

/**
 * POST /api/submit
 *
 * Receives the full survey payload from the multi-step form.
 * For now: logs to the server console and returns 200.
 *
 * When CONFIG.WEBHOOK_URL is set (GoHighLevel / Zapier), the payload is
 * forwarded there as JSON. Wire that up later by setting the constant.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Server-side log (visible in `vercel logs` / local terminal).
  console.log("[/api/submit] New lead received:", JSON.stringify(payload, null, 2));

  // Optional: forward to GoHighLevel / Zapier webhook when configured.
  if (CONFIG.WEBHOOK_URL) {
    try {
      const res = await fetch(CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(
          `[/api/submit] Webhook responded ${res.status} ${res.statusText}`
        );
      }
    } catch (err) {
      // Don't fail the user's submission if the webhook is down.
      console.error("[/api/submit] Webhook forward failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
