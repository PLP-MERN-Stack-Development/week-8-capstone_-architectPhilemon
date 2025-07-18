"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setIsLoggedIn(false)
    router.push("/login")
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-900">EventFlow</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Home
        </Link>
        <Link href="/admin" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Admin
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Contact Us
        </Link>
        <Link href="/support" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Support
        </Link>
        {/* Temporarily add admin registration link for setup */}
        <Link href="/register-admin" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Register Admin
        </Link>
        {isLoggedIn ? (
          <Button onClick={handleLogout} variant="ghost" className="text-gray-700 hover:text-gray-900">
            Logout
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Login
            </Button>
          </Link>
        )}
      </nav>
      <Button className="md:hidden">Menu</Button> {/* Placeholder for mobile menu */}
    </header>
  )
}
