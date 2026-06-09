import type { Metadata } from "next";
import Script from "next/script";
import { CONFIG } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkmark Collections — No Recovery, No Fee | B2B Debt Recovery",
  description:
    "Get paid what you're owed. Checkmark Collections is a professional B2B collection agency — 20+ years of ethical, results-driven revenue recovery. No recovery, no fee.",
  openGraph: {
    title: "Checkmark Collections — No Recovery, No Fee",
    description:
      "Professional B2B debt recovery. You pay nothing unless we collect. 20+ years experience, ACA International member.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pixelId = CONFIG.META_PIXEL_ID;

  return (
    <html lang="en">
      <head>
        {/* ============================================================
            META (FACEBOOK) PIXEL — base code
            Fires PageView on load. Replace CONFIG.META_PIXEL_ID with the
            real Pixel ID to activate. While the ID is empty, this is a
            no-op (guarded so nothing fires and no errors are thrown).
            The "Lead" event is fired from the survey on final submit.
        ============================================================ */}
        {pixelId ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        ) : null}
      </head>
      <body className="font-sans text-navy antialiased">{children}</body>
    </html>
  );
}
