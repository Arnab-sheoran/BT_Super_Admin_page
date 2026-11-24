import { superAdminNavigation } from '../../constants/navigation'
import type { SuperAdminNavigationItem } from '../../types/navigation'

interface SidebarProps {
  currentPath: string
  isOpen: boolean
  onNavigate: () => void
}

const iconPaths: Record<SuperAdminNavigationItem['icon'], string> = {
  command: 'M4 5h7v6H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 13h7v6H4z',
  tenants: 'M3.5 20V8l8.5-4 8.5 4v12M8 20v-6h8v6M7 9h.01M12 9h.01M17 9h.01',
  users: 'M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 4.2a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3 4.25V20',
  billing: 'M4 7h16v13H4zM4 10h16M8 15h3M7 4h10',
  analytics: 'M4 19V5M4 19h16M8 16v-5M12 16V7M16 16v-8',
  industry: 'M4 20V9l8-5 8 5v11M8 20v-6h8v6M8 10h.01M12 10h.01M16 10h.01',
  pricing: 'M12 3v18M17 7.5c0-1.4-1.8-2.5-4.5-2.5S8 6.1 8 7.5 9.8 10 12.5 10s4.5 1.1 4.5 2.5-1.8 2.5-4.5 2.5S8 13.9 8 12.5',
  costs: 'M4 7h16M6 4v3M18 4v3M5 7v13h14V7M8 11h8M8 15h5',
  health: 'M3 12h4l2.5-6 5 12 2.5-6h4',
  audit: 'M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5',
}

function Sidebar({ currentPath, isOpen, onNavigate }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close navigation"
          className="sidebar-backdrop"
          onClick={onNavigate}
          type="button"
        />
      )}
      <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>
        <a className="brand" href="/super-admin" onClick={onNavigate}>
          <span className="brand__mark" aria-hidden="true">B</span>
          <span className="brand__text">
            <strong>Bluethyme</strong>
            <small>Super Admin</small>
          </span>
        </a>
        <p className="sidebar__section-label">WORKSPACE</p>
        <nav aria-label="Super Admin navigation" className="sidebar__nav">
          {superAdminNavigation.map((item) => {
            const isActive = currentPath === item.path
              || (item.path === '/super-admin/tenants'
                && currentPath === '/super-admin/tenants/details')

            return (
              <a
                aria-current={isActive ? 'page' : undefined}
                className={`sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
                href={item.path}
                key={item.path}
                onClick={onNavigate}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d={iconPaths[item.icon]} />
                </svg>
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
        <div className="sidebar__footer">
          <span className="sidebar__footer-dot" />
          <span>Scaffold environment</span>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
