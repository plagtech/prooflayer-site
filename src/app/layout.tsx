import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProofLayer — Agent Trust Infrastructure",
  description:
    "An opt-in SDK that generates verifiable trust scores for AI agents. On-chain attestations. Multi-dimensional scoring.",
  metadataBase: new URL("https://prooflayer.net"),
  openGraph: {
    title: "ProofLayer — Agent Trust Infrastructure",
    description:
      "Verifiable trust scores for AI agents. On-chain EAS attestations on Base.",
    url: "https://prooflayer.net",
    siteName: "ProofLayer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofLayer",
    description:
      "Agent Trust Infrastructure — verifiable scores, on-chain attestations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
