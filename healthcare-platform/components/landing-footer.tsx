import Link from "next/link"
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-medical-primary" />
              <span className="text-xl font-bold text-medical-primary">MediConnect</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Centralized medical records with AI-driven insights for better healthcare management.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-gray-500 hover:text-medical-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-medical-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-medical-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-medical-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              Home
            </Link>
            <Link href="#features" className="text-sm text-gray-500 hover:text-medical-primary">
              Features
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              About Us
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              Cookie Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-medical-primary">
              HIPAA Compliance
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-gray-500">
              123 Medical Plaza, <br />
              Healthcare District, <br />
              New York, NY 10001
            </p>
            <p className="text-sm text-gray-500">
              Email: info@mediconnect.com <br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>© 2025 MediConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

