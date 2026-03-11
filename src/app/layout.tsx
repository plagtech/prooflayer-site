import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofLayer — Agent Trust Infrastructure",
  description: "Opt-in behavioral trust scoring SDK for AI agents. Multi-dimensional scoring, on-chain EAS attestations, and verifiable report cards.",
  openGraph: {
    title: "ProofLayer — Agent Trust Infrastructure",
    description: "Secure your agent's intent. Behavioral trust scoring for the autonomous economy.",
    url: "https://prooflayer.net",
    siteName: "ProofLayer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofLayer — Agent Trust Infrastructure",
    description: "Secure your agent's intent. Behavioral trust scoring for the autonomous economy.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#060610" }}>
        {children}
      </body>
    </html>
  );
}
