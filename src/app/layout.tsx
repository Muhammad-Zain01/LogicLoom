import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logic Loom",
  description:
    "LogicLoom is a powerful tool designed to simplify the process of creating forms and designing workflows. With its two core features, Form Builder and Flow Builder, LogicLoom empowers users to create dynamic, interactive forms and design complex logical flows with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
