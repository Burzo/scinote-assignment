import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from './layout/BasicLayout'

const HomePage = lazy(() => import('./pages/HomePage'))
const NoMatchPage = lazy(() => import('./pages/NoMatchPage'))

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    </Routes>
  )
}
