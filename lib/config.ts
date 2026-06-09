/**
 * ============================================================================
 *  CHECKMARK COLLECTIONS — CONFIG
 *  Edit these values to wire up integrations. Nothing else needs to change.
 * ============================================================================
 */

export const CONFIG = {
  /**
   * Webhook URL for GoHighLevel / Zapier.
   * The /api/submit route forwards the full survey payload here.
   * Leave empty ("") to skip forwarding (it will just log to the server console).
   */
  WEBHOOK_URL: "",

  /**
   * Where to send a disqualified landlord when they click "back to main site".
   */
  LANDLORD_REDIRECT_URL: "https://www.checkmarkcollections.com",

  /**
   * Meta (Facebook) Pixel ID.
   * Replace with the real Pixel ID when available. While this is the empty
   * placeholder, the pixel code is a no-op (nothing fires, no errors).
   */
  META_PIXEL_ID: "",

  /**
   * Business contact details (used across the page + footer).
   */
  PHONE_DISPLAY: "(888) 909-6722",
  PHONE_HREF: "tel:+18889096722",
  EMAIL: "info@checkmarkcollections.com",
} as const;
