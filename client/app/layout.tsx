import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header" // New import
import { Footer } from "@/components/footer" // New import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Event Management System",
  description: "Manage and register for events with ease.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="relative min-h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=80')" }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header /> {/* New Header component */}
            <main className="flex-grow">{children}</main>
            <Footer /> {/* New Footer component */}
          </div>
        </div>
      </body>
    </html>
  )
}
