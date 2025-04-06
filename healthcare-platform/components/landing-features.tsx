import { Activity, FileText, Lock, MessageSquare, Stethoscope, Calendar } from "lucide-react"

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-medical-light">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-medical-primary px-3 py-1 text-sm text-white">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need in One Place</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform provides a comprehensive solution for managing your healthcare journey with advanced features
              and AI-driven insights.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="rounded-full bg-medical-primary p-3">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Centralized Records</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Store all your medical records in one secure location, accessible anytime.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="rounded-full bg-medical-primary p-3">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">AI-Powered Insights</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Get simplified explanations of your prescriptions and medical reports.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="rounded-full bg-medical-primary p-3">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Blockchain Security</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your records are secured with blockchain technology for tamper-proof auditing.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="rounded-full bg-medical-primary p-3">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Smart Chatbot</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Get answers to your health queries based on your medical history.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="rounded-full bg-medical-primary p-3">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Doctor Connectivity</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Connect with healthcare providers for consultations and follow-ups.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="rounded-full bg-medical-primary p-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Appointment Management</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Schedule and manage your medical appointments with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

