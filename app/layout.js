/* eslint-disable @next/next/no-page-custom-font */
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ลอยกระทงออนไลน์",
  description:
    "มาร่วมลอยกระทงออนไลน์ ร่วมกันลดขยะ รักษาสิ่งแวดล้อมให้อยู่กับเราตลอดไป",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ลอยกระทงออนไลน์</title>
        <meta
          name="description"
          content="มาร่วมลอยกระทงออนไลน์ ร่วมกันลดขยะ รักษาสิ่งแวดล้อมให้อยู่กับเราตลอดไป"
        />
        <meta property="og:title" content="ลอยกระทงออนไลน์" />
        <meta
          property="og:description"
          content="Discover amazing content on My Awesome Website."
        />
        <meta property="og:image" content="/images/bg-no-krathong.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loykrathong.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;700&family=Prompt:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
