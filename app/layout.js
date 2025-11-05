import { Prompt } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "ลอยกระทงออนไลน์ - Loy Krathong Online",
  description: "มาร่วมกันลอยกระทงออนไลน์ ร่วมกันลดขยะ รักษาสิ่งแวดล้อมให้อยู่กับเราตลอดไป 🌕🎉 สนใจติดต่อทำเว็บไซต์ได้ที่ โทร: 095-724-9324, email: polawathuang@gmail.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${prompt.variable} font-prompt antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
