import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const madeGentle = localFont({ src: "../fonts/made-gentle.otf" });
const meteoraDemo = localFont({ src: "../fonts/MeteoraDemo.ttf" });

export const metadata = {
  title: "AI Language Learning Assitant",
  description: "Language learning assistant powered by GPT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={meteoraDemo.className}>{children}</body>
    </html>
  );
}
