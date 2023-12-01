import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import favicon from "../public/favicon.ico";
import { RtkProvider } from "@/rtk/rtkProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/dashboardComp/theme-provider";

const secondFont = Playfair_Display({ subsets: ["latin"], variable: "--second-font" });
const mainFont = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freelancer Dash",
  icons: [{ rel: "icon", url: favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={secondFont.variable}>
      <ClerkProvider>
        <body className={`bg-colorBg text-colorText ${mainFont.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster position="bottom-right" closeButton />
            <RtkProvider>{children}</RtkProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
