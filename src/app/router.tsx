import { Navigate, createHashRouter } from 'react-router-dom'
import { RootLayout } from '@/features/ui/components/RootLayout.tsx'
import { RootErrorScreen } from '@/features/ui/components/RootErrorScreen.tsx'
import { AuthPage } from '@/features/auth/pages/AuthPage.tsx'
import { LandingPage } from '@/features/onboarding/pages/LandingPage.tsx'
import { StoryPage } from '@/features/onboarding/pages/StoryPage.tsx'
import { ChoosePetPage } from '@/features/onboarding/pages/ChoosePetPage.tsx'
import { GoalsPage } from '@/features/tasks/pages/GoalsPage.tsx'
import { EmptyGoalsPage } from '@/features/tasks/pages/EmptyGoalsPage.tsx'
import { AddTaskPage } from '@/features/tasks/pages/AddTaskPage.tsx'
import { EditTaskPage } from '@/features/tasks/pages/EditTaskPage.tsx'
import { CongratsPage } from '@/features/tasks/pages/CongratsPage.tsx'
import { FailPage } from '@/features/tasks/pages/FailPage.tsx'
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx'
import { Dashboard as DashboardComponent } from '@/Dashboard.tsx'

export const router = createHashRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RootErrorScreen />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <RootErrorScreen />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardComponent />
      </ProtectedRoute>
    ),
    errorElement: <RootErrorScreen />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <RootErrorScreen />,
    children: [
      { path: 'story', element: <StoryPage /> },
      { path: 'choose', element: <ChoosePetPage /> },
      { path: 'goals', element: <GoalsPage /> },
      { path: 'empty-goals', element: <EmptyGoalsPage /> },
      { path: 'tasks/new', element: <AddTaskPage /> },
      { path: 'tasks/:id/edit', element: <EditTaskPage /> },
      { path: 'congrats', element: <CongratsPage /> },
      { path: 'fail', element: <FailPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
