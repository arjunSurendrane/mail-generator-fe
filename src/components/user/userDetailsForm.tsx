// src/components/user/UserDetailsForm.tsx
'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { User, Briefcase, Star } from 'lucide-react'

interface UserFormData {
  username: string
  user_about: string
  user_specialization: string
  user_job_role: string
}

export default function UserDetailsForm() {
  const [formData, setFormData] = React.useState<UserFormData>({
    username: '',
    user_about: '',
    user_specialization: '',
    user_job_role: ''
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Add your API call here
      console.log('Form submitted:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Update Profile</CardTitle>
        <CardDescription className="text-center">
          Update your personal information and expertise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <Label htmlFor="username">Username</Label>
            </div>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-gray-500" />
              <Label htmlFor="user_specialization">Specialization</Label>
            </div>
            <Input
              id="user_specialization"
              name="user_specialization"
              value={formData.user_specialization}
              onChange={handleChange}
              placeholder="Your area of expertise"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-500" />
              <Label htmlFor="user_job_role">Job Role</Label>
            </div>
            <Input
              id="user_job_role"
              name="user_job_role"
              value={formData.user_job_role}
              onChange={handleChange}
              placeholder="Your current job role"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user_about">About</Label>
            <Textarea
              id="user_about"
              name="user_about"
              value={formData.user_about}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  )
}