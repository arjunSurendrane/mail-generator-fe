// src/app/profile/page.tsx
import UserDetailsForm from '@/components/user/userDetailsForm'
import ProjectForm from '@/components/user/projectForm'

export default function ProfilePage() {
  return (
    <main className="container mx-auto py-10 space-y-10">
      <UserDetailsForm />
      <ProjectForm />
    </main>
  )
}
