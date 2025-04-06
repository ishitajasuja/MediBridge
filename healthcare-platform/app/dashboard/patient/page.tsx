"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  Clock,
  ArrowUpRight,
  Pill,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function PatientDashboard() {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Today",
      time: "3:00 PM",
      image: "",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "Tomorrow",
      time: "10:30 AM",
      image: "",
    },
  ]

  const recentPrescriptions = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      doctor: "Dr. Sarah Johnson",
      date: "May 15, 2025",
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "May 10, 2025",
    },
    {
      id: 3,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      doctor: "Dr. Michael Chen",
      date: "May 5, 2025",
    },
  ]

  const recentReports = [
    {
      id: 1,
      name: "Blood Test Results",
      doctor: "Dr. Sarah Johnson",
      date: "May 12, 2025",
      status: "normal",
    },
    {
      id: 2,
      name: "Chest X-Ray",
      doctor: "Dr. Robert Williams",
      date: "May 8, 2025",
      status: "review",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userType="patient" />

      <div className="flex-1">
        <DashboardHeader userType="patient" />

        <main className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Patient Dashboard</h1>
            <Button className="bg-medical-primary hover:bg-medical-accent">
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                <p className="text-xs text-muted-foreground">Next: Today at 3:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                <Pill className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentPrescriptions.length}</div>
                <p className="text-xs text-muted-foreground">Last updated: May 15, 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Medical Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentReports.length}</div>
                <p className="text-xs text-muted-foreground">Last updated: May 12, 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <Progress value={85} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Prescriptions</CardTitle>
                <CardDescription>Your most recent medication prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-start justify-between border-b pb-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-medical-light p-2">
                          <Pill className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{prescription.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.dosage} - {prescription.frequency}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Prescribed by {prescription.doctor} on {prescription.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/patient/prescriptions">
                    View All Prescriptions
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start gap-4 border-b pb-4">
                      <Avatar>
                        <AvatarImage src={appointment.image} />
                        <AvatarFallback className="bg-medical-primary text-white">
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{appointment.doctor}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant="outline" className="mr-2 bg-medical-light text-medical-primary border-0">
                            {appointment.date}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/patient/appointments">
                    View All Appointments
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Medical Reports</CardTitle>
                <CardDescription>Your latest medical test results and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-start justify-between border-b pb-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-medical-light p-2">
                          <FileText className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">{report.doctor}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-muted-foreground mr-2">{report.date}</p>
                            <Badge
                              className={
                                report.status === "normal"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              }
                            >
                              {report.status === "normal" ? "Normal" : "Needs Review"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/patient/reports">
                    View All Reports
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Insights</CardTitle>
                <CardDescription>AI-powered insights based on your medical data</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="medications">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                  <TabsContent value="medications" className="space-y-4 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="font-semibold flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-medical-primary" />
                        Amoxicillin Insights
                      </h4>
                      <p className="text-sm mt-2">
                        Take with food to reduce stomach upset. Complete the full course even if you feel better.
                      </p>
                      <div className="mt-2 text-xs text-medical-primary hover:underline cursor-pointer">
                        Learn more about this medication
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-semibold flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-medical-primary" />
                        Lisinopril Insights
                      </h4>
                      <p className="text-sm mt-2">
                        Take at the same time each day. May cause dizziness when standing up quickly.
                      </p>
                      <div className="mt-2 text-xs text-medical-primary hover:underline cursor-pointer">
                        Learn more about this medication
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reports" className="space-y-4 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="font-semibold flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-medical-primary" />
                        Blood Test Analysis
                      </h4>
                      <p className="text-sm mt-2">
                        Your cholesterol levels have improved by 15% since your last test. Continue with your current
                        diet.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-semibold flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-medical-primary" />
                        X-Ray Findings
                      </h4>
                      <p className="text-sm mt-2">
                        Your chest X-ray shows normal lung fields with no significant abnormalities.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-medical-primary hover:bg-medical-accent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask Health Assistant
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>

      {/* Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-medical-primary hover:bg-medical-accent shadow-lg pulse-animation"
        onClick={() => setChatbotOpen(!chatbotOpen)}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open Chatbot</span>
      </Button>
    </div>
  )
}

