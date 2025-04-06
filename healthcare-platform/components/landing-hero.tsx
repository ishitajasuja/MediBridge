import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stethoscope, FileText, Activity, Shield } from "lucide-react"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Health Records, <span className="text-medical-primary">Unified</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Centralized medical records with AI-driven insights. Connect with doctors, access your health data, and
                take control of your healthcare journey.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-medical-primary hover:bg-medical-accent" size="lg" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-medical-primary" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4 text-medical-primary" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4 text-medical-primary" />
                <span>Centralized</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-medical-light rounded-full opacity-50 blur-2xl"></div>
              <div className="relative bg-white rounded-xl shadow-lg p-6 border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-medical-primary flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">MediConnect</h3>
                    <p className="text-sm text-gray-500">Healthcare Platform</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-20 bg-medical-light rounded-lg flex items-center justify-center">
                    <Activity className="h-8 w-8 text-medical-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-100 rounded-lg p-3">
                      <div className="text-xs text-gray-500">Prescriptions</div>
                      <div className="text-lg font-semibold">12</div>
                    </div>
                    <div className="h-24 bg-gray-100 rounded-lg p-3">
                      <div className="text-xs text-gray-500">Reports</div>
                      <div className="text-lg font-semibold">8</div>
                    </div>
                  </div>
                  <div className="h-12 bg-medical-primary/10 rounded-lg flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Next Appointment: Today, 3:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

