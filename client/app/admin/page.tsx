"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminEventForm } from "@/components/admin-event-form"
import { AdminUserManagement } from "@/components/admin-user-management" // New import

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <p className="text-xl">Loading admin panel...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">Admin Panel</h1>
      <AdminEventForm />
      <AdminUserManagement /> {/* New component for user management */}
    </div>
  )
}
