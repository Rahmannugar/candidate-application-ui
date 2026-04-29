import type { Metadata } from "next";
import AppProvider from "@/lib/client/AppProvider";
import "byte-datepicker/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Candidate Application",
  description: "Candidate application form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
