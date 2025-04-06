"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stethoscope, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("patient")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to profile creation
      router.push(`/auth/create-profile?type=${userType}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12">
        <Link
          href="/"
          className="absolute top-8 left-8 inline-flex items-center text-sm font-medium text-medical-primary hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center">
              <Stethoscope className="h-10 w-10 text-medical-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Sign up to access your healthcare platform</p>
          </div>

          <Tabs defaultValue="patient" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Patient Signup</CardTitle>
                  <CardDescription>Create an account to manage your health records</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input id="patient-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Password</Label>
                      <Input id="patient-password" type="password" required />
                      <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-confirm-password">Confirm Password</Label>
                      <Input id="patient-confirm-password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-medical-primary hover:bg-medical-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="doctor">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Doctor Signup</CardTitle>
                  <CardDescription>Create an account to manage your patients</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email">Email</Label>
                      <Input id="doctor-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-password">Password</Label>
                      <Input id="doctor-password" type="password" required />
                      <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-confirm-password">Confirm Password</Label>
                      <Input id="doctor-confirm-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-license">Medical License Number</Label>
                      <Input id="doctor-license" type="text" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-medical-primary hover:bg-medical-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-medical-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

