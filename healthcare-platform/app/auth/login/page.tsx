"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Stethoscope, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("patient")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect based on user type
      if (userType === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/doctor")
      }
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
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <Tabs defaultValue="patient" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Patient Login</CardTitle>
                  <CardDescription>Access your medical records and appointments</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input id="patient-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="patient-password">Password</Label>
                        <Link href="/auth/reset-password" className="text-xs text-medical-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="patient-password" type="password" required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="patient-remember" />
                      <Label
                        htmlFor="patient-remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-medical-primary hover:bg-medical-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="doctor">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Doctor Login</CardTitle>
                  <CardDescription>Access your patient records and appointments</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email">Email</Label>
                      <Input id="doctor-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="doctor-password">Password</Label>
                        <Link href="/auth/reset-password" className="text-xs text-medical-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="doctor-password" type="password" required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doctor-remember" />
                      <label
                        htmlFor="doctor-remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-medical-primary hover:bg-medical-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-medical-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

