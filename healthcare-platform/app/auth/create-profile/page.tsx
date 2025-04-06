"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, ArrowLeft, ArrowRight, Upload, Check } from "lucide-react"

export default function CreateProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get("type") || "patient"

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = userType === "patient" ? 3 : 2

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate profile creation
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      router.push(userType === "patient" ? "/dashboard/patient" : "/dashboard/doctor")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12">
        <Link
          href="/auth/signup"
          className="absolute top-8 left-8 inline-flex items-center text-sm font-medium text-medical-primary hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Signup
        </Link>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center">
              <Stethoscope className="h-10 w-10 text-medical-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Complete Your Profile</h1>
            <p className="text-sm text-muted-foreground">
              {userType === "patient"
                ? "Tell us more about yourself to personalize your experience"
                : "Complete your professional profile to connect with patients"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between px-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    step > i + 1
                      ? "border-medical-primary bg-medical-primary text-white"
                      : step === i + 1
                        ? "border-medical-primary text-medical-primary"
                        : "border-gray-300 text-gray-300"
                  }`}
                >
                  {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`h-1 w-12 ${step > i + 1 ? "bg-medical-primary" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">
                {userType === "patient"
                  ? step === 1
                    ? "Basic Information"
                    : step === 2
                      ? "Medical History"
                      : "Lifestyle Information"
                  : step === 1
                    ? "Professional Information"
                    : "Specialization & Experience"}
              </CardTitle>
              <CardDescription>
                {step === totalSteps ? "Last step to complete your profile" : `Step ${step} of ${totalSteps}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userType === "patient" ? (
                // Patient Profile Steps
                <>
                  {step === 1 && (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <RadioGroup defaultValue="male" className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="chronic-conditions">Chronic Conditions</Label>
                          <Textarea
                            id="chronic-conditions"
                            placeholder="List any chronic conditions you have (e.g., diabetes, hypertension)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="allergies">Allergies</Label>
                          <Textarea
                            id="allergies"
                            placeholder="List any allergies you have (e.g., medications, food, environmental)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="current-medications">Current Medications</Label>
                          <Textarea
                            id="current-medications"
                            placeholder="List any medications you are currently taking"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="family-history">Family Medical History</Label>
                          <Textarea
                            id="family-history"
                            placeholder="List any significant medical conditions in your family"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="smoking">Smoking Habits</Label>
                          <Select defaultValue="never">
                            <SelectTrigger>
                              <SelectValue placeholder="Select smoking status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="never">Never smoked</SelectItem>
                              <SelectItem value="former">Former smoker</SelectItem>
                              <SelectItem value="occasional">Occasional smoker</SelectItem>
                              <SelectItem value="regular">Regular smoker</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alcohol">Alcohol Consumption</Label>
                          <Select defaultValue="none">
                            <SelectTrigger>
                              <SelectValue placeholder="Select alcohol consumption" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="occasional">Occasional</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="heavy">Heavy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="exercise">Exercise Frequency</Label>
                          <Select defaultValue="moderate">
                            <SelectTrigger>
                              <SelectValue placeholder="Select exercise frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                              <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                              <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diet">Dietary Preferences</Label>
                          <Select defaultValue="no-restrictions">
                            <SelectTrigger>
                              <SelectValue placeholder="Select dietary preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no-restrictions">No restrictions</SelectItem>
                              <SelectItem value="vegetarian">Vegetarian</SelectItem>
                              <SelectItem value="vegan">Vegan</SelectItem>
                              <SelectItem value="gluten-free">Gluten-free</SelectItem>
                              <SelectItem value="dairy-free">Dairy-free</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                // Doctor Profile Steps
                <>
                  {step === 1 && (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license-number">Medical License Number</Label>
                          <Input id="license-number" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hospital">Primary Hospital/Clinic</Label>
                          <Input id="hospital" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Contact Number</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Select defaultValue="general">
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Practitioner</SelectItem>
                              <SelectItem value="cardiology">Cardiology</SelectItem>
                              <SelectItem value="dermatology">Dermatology</SelectItem>
                              <SelectItem value="neurology">Neurology</SelectItem>
                              <SelectItem value="orthopedics">Orthopedics</SelectItem>
                              <SelectItem value="pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="psychiatry">Psychiatry</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input id="experience" type="number" min="0" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="education">Education & Qualifications</Label>
                          <Textarea
                            id="education"
                            placeholder="List your degrees, certifications, and qualifications"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Professional Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Write a short professional bio that will be visible to patients"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={handleNext} className="bg-medical-primary hover:bg-medical-accent" disabled={isLoading}>
                {isLoading ? (
                  "Processing..."
                ) : step === totalSteps ? (
                  "Complete Profile"
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

