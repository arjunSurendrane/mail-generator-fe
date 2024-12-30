// src/components/user/ProjectForm.tsx
'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PlusCircle, MinusCircle, Link, Laptop } from 'lucide-react'

interface Project {
  id: number
  projectLink: string
  technologies: string
}

export default function ProjectForm() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, projectLink: '', technologies: '' }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const addProject = () => {
    setProjects(prev => [...prev, {
      id: prev.length + 1,
      projectLink: '',
      technologies: ''
    }])
  }

  const removeProject = (id: number) => {
    if (projects.length > 1) {
      setProjects(prev => prev.filter(project => project.id !== id))
    }
  }

  const handleChange = (id: number, field: keyof Project, value: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Add your API call here
      console.log('Projects submitted:', projects)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    } catch (error) {
      console.error('Error submitting projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Add Projects</CardTitle>
        <CardDescription className="text-center">
          Showcase your work by adding project details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="p-4 border rounded-lg space-y-4 relative bg-gray-50"
            >
              {projects.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 bg-white rounded-full hover:bg-red-100"
                  onClick={() => removeProject(project.id)}
                  disabled={isLoading}
                >
                  <MinusCircle className="h-5 w-5 text-red-500" />
                </Button>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link className="h-5 w-5 text-gray-500" />
                  <Label htmlFor={`projectLink-${project.id}`}>Project Link</Label>
                </div>
                <Input
                  id={`projectLink-${project.id}`}
                  value={project.projectLink}
                  onChange={(e) => handleChange(project.id, 'projectLink', e.target.value)}
                  placeholder="Enter your project URL"
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Laptop className="h-5 w-5 text-gray-500" />
                  <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                </div>
                <Input
                  id={`technologies-${project.id}`}
                  value={project.technologies}
                  onChange={(e) => handleChange(project.id, 'technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={addProject}
            className="w-full border-2 border-dashed bg-transparent hover:bg-gray-50 text-gray-600"
            disabled={isLoading}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Another Project
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Saving Projects...' : 'Save Projects'}
        </Button>
      </CardFooter>
    </Card>
  )
}