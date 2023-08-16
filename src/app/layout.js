import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import ReduxProvider from "@/components/ReduxProvider";

export const metadata = {
  title: "AI Chat demo",
  description: "POC to show off chat logging concepts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider> {children}</ReduxProvider>
      </body>
    </html>
  );
}
