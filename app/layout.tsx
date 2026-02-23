import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Counter +1",
  description: "Send a number to FastAPI and get N + 1.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>{children}</body>
    </html>
  );
}
