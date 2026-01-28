import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'
import './Layout.css'

interface LayoutProps {
  theme: 'light' | 'dark'
}

export function Layout({ theme }: LayoutProps) {
  return (
    <div className={`layout layout--${theme}`}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
