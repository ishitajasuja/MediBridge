"use client"
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
  Users,
  Plus,
  Clock,
  ArrowUpRight,
  Search,
  BarChart,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function DoctorDashboard() {
  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Doe",
      age: 45,
      reason: "Follow-up",
      date: "Today",
      time: "3:00 PM",
      image: "",
    },
    {
      id: 2,
      patient: "Jane Smith",
      age: 32,
      reason: "Consultation",
      date: "Today",
      time: "4:30 PM",
      image: "",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      age: 58,
      reason: "Test Results",
      date: "Tomorrow",
      time: "10:00 AM",
      image: "",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      lastVisit: "May 10, 2025",
      condition: "Hypertension",
      image: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      lastVisit: "May 8, 2025",
      condition: "Diabetes",
      image: "",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 58,
      lastVisit: "May 5, 2025",
      condition: "Arthritis",
      image: "",
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 29,
      lastVisit: "May 1, 2025",
      condition: "Asthma",
      image: "",
    },
  ]

  const pendingReports = [
    {
      id: 1,
      patient: "John Doe",
      type: "Blood Test",
      date: "May 12, 2025",
      status: "pending",
    },
    {
      id: 2,
      patient: "Jane Smith",
      type: "MRI Scan",
      date: "May 11, 2025",
      status: "pending",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userType="doctor" />

      <div className="flex-1">
        <DashboardHeader userType="doctor" />

        <main className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button className="bg-medical-primary hover:bg-medical-accent">
                <Plus className="mr-2 h-4 w-4" />
                New Patient
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {upcomingAppointments.filter((a) => a.date === "Today").length}
                </div>
                <p className="text-xs text-muted-foreground">Next: Today at 3:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingReports.length}</div>
                <p className="text-xs text-muted-foreground">Requires your review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <Progress value={92} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled appointments for today and tomorrow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start justify-between border-b pb-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={appointment.image} />
                          <AvatarFallback className="bg-medical-light text-medical-primary">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{appointment.patient}</h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.age} years • {appointment.reason}
                          </p>
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
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/doctor/appointments">
                    View All Appointments
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Patient Search</CardTitle>
                  <CardDescription>Quickly find and access patient records</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search patients by name or ID..." className="w-full pl-8" />
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-3">Recent Patients</h4>
                    <div className="space-y-3">
                      {recentPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={patient.image} />
                              <AvatarFallback className="bg-medical-light text-medical-primary">
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h5 className="font-medium">{patient.name}</h5>
                              <p className="text-xs text-muted-foreground">
                                {patient.age} years • {patient.condition}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/doctor/patients">
                    View All Patients
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Reports</CardTitle>
                <CardDescription>Medical reports awaiting your review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div key={report.id} className="flex items-start justify-between border-b pb-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-medical-light p-2">
                          <FileText className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{report.type}</h4>
                          <p className="text-sm text-muted-foreground">{report.patient}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-muted-foreground mr-2">{report.date}</p>
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending Review</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/doctor/reports">
                    View All Reports
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Patient statistics and practice metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="patients">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="patients">Patients</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="patients" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">New Patients</h4>
                        <span className="text-sm font-medium text-green-600">+12%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-muted-foreground">12 new patients this month vs. 9 last month</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Patient Age Distribution</h4>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="h-16 bg-medical-primary/20 rounded-t-md relative">
                            <div
                              className="absolute bottom-0 w-full bg-medical-primary rounded-t-md"
                              style={{ height: "40%" }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1">0-18</p>
                        </div>
                        <div>
                          <div className="h-16 bg-medical-primary/20 rounded-t-md relative">
                            <div
                              className="absolute bottom-0 w-full bg-medical-primary rounded-t-md"
                              style={{ height: "60%" }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1">19-35</p>
                        </div>
                        <div>
                          <div className="h-16 bg-medical-primary/20 rounded-t-md relative">
                            <div
                              className="absolute bottom-0 w-full bg-medical-primary rounded-t-md"
                              style={{ height: "80%" }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1">36-55</p>
                        </div>
                        <div>
                          <div className="h-16 bg-medical-primary/20 rounded-t-md relative">
                            <div
                              className="absolute bottom-0 w-full bg-medical-primary rounded-t-md"
                              style={{ height: "50%" }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1">56+</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="appointments" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Appointment Completion</h4>
                        <span className="text-sm font-medium text-green-600">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        38 of 40 scheduled appointments completed this month
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Appointment Types</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-lg font-bold text-medical-primary">65%</div>
                          <p className="text-xs">Follow-ups</p>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-lg font-bold text-medical-primary">25%</div>
                          <p className="text-xs">New Consults</p>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-lg font-bold text-medical-primary">10%</div>
                          <p className="text-xs">Emergencies</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-medical-primary hover:bg-medical-accent" asChild>
                  <Link href="/dashboard/doctor/analytics">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

