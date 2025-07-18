"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define the base URL for your backend API
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"

export function AdminUserManagement() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    const token = localStorage.getItem("accessToken")
    if (!token) {
      setError("You are not authenticated. Please log in.")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(`${BACKEND_API_BASE_URL}/api/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password, role: "admin" }), // Always create 'admin' role for now
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Failed to create user.")
        return
      }

      setSuccess(`Admin user "${data.username}" created successfully!`)
      setUsername("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error("Error creating user:", err)
      setError("Unable to create user right now. Please ensure the backend server is running and you are logged in.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Admin User</CardTitle>
        <CardDescription>Only super administrators can create new admin accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="new-username">Username</Label>
            <Input
              id="new-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Password</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-new-password">Confirm Password</Label>
            <Input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating User..." : "Create Admin User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
