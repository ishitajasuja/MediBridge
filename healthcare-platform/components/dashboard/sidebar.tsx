"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Stethoscope,
  Home,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  Upload,
  BarChart,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  userType: "patient" | "doctor"
  userName?: string
  userImage?: string
}

export function DashboardSidebar({
  userType = "patient",
  userName = userType === "patient" ? "John Doe" : "Dr. Smith",
  userImage,
}: DashboardSidebarProps) {
  const pathname = usePathname()

  const patientMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard/patient",
    },
    {
      title: "Prescriptions",
      icon: FileText,
      href: "/dashboard/patient/prescriptions",
    },
    {
      title: "Medical Reports",
      icon: FileText,
      href: "/dashboard/patient/reports",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/dashboard/patient/appointments",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      href: "/dashboard/patient/chat",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/patient/settings",
    },
  ]

  const doctorMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard/doctor",
    },
    {
      title: "Patients",
      icon: Users,
      href: "/dashboard/doctor/patients",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/dashboard/doctor/appointments",
    },
    {
      title: "Upload Records",
      icon: Upload,
      href: "/dashboard/doctor/upload",
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/dashboard/doctor/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/doctor/settings",
    },
  ]

  const menuItems = userType === "patient" ? patientMenuItems : doctorMenuItems

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-2">
            <Stethoscope className="h-6 w-6 text-medical-primary" />
            <span className="text-xl font-bold text-medical-primary">MediConnect</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={userImage} />
              <AvatarFallback className="bg-medical-primary text-white">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground capitalize">{userType}</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start mt-4" asChild>
            <Link href="/auth/login">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

