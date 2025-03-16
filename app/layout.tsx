import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { StepperProvider } from "../context/stepper-context";

const vazir = Vazirmatn({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "alo komak",
  description: "alo komak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <StepperProvider>{children}</StepperProvider>
      </body>
    </html>
  );
}
