import { useState, type ReactNode } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Topbar from '../components/Topbar/Topbar'
import '../styles/super-admin.css'

interface SuperAdminLayoutProps {
  currentPath: string
  children: ReactNode
}

function SuperAdminLayout({ currentPath, children }: SuperAdminLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="super-admin">
      <Sidebar
        currentPath={currentPath}
        isOpen={isSidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
      />
      <div className="super-admin__main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="super-admin__security-banner" role="status">
          This frontend scaffold is not protected by platform owner authorization.
          Do not use it to access production data.
        </div>
        <main className="super-admin__content">{children}</main>
      </div>
    </div>
  )
}

export default SuperAdminLayout
