import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-black dark:text-white`}>
        <Header />
        <div className="pt-6">{children}</div>

        {/* Simple Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SliceX" className="w-8 h-8 object-contain" />
              <div>
                <div className="font-semibold">SliceX</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Trusted land marketplace</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} SliceX. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
