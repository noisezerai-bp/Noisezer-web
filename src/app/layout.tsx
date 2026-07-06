import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noisezer Base Paper",
  description: "The Agentic Newspaper of the Base Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}