import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins font
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "react-loading-skeleton/dist/skeleton.css";

const poppins = Poppins({
  subsets: ["latin"], // Specify the subsets you want
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Include desired weights
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Emailer",
  description: "Easily Generate Email MJML Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} antialiased`} // Apply Poppins font globally
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
