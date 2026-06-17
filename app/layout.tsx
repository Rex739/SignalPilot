import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalPilot",
  description: "Explainable BNB Chain strategy intelligence for professional market research workflows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
