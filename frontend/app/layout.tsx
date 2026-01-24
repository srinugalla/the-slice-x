import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "The Slice X",
  description: "Trusted land marketplace",
   icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          flex 
          flex-col 
          min-h-screen
          bg-white 
          text-black
        `}
      >
        {/* Global Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  )
}
