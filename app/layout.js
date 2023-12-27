import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const madeGentle = localFont({ src: "../fonts/made-gentle.otf" });

export const metadata = {
  title: "AI Language Learning Assitant",
  description: "Language learning assistant powered by GPT-4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={madeGentle.className}>{children}</body>
    </html>
  );
}
