"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stethoscope, Menu, X } from "lucide-react"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-medical-primary" />
          <span className="text-xl font-bold text-medical-primary">MediConnect</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-medical-primary transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-medical-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-medical-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button className="bg-medical-primary hover:bg-medical-accent" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 pb-6 border-b">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-medical-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-medical-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-medical-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button className="w-full bg-medical-primary hover:bg-medical-accent" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

