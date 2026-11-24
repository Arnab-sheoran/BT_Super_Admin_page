import type { ComponentType } from 'react'
import SuperAdminLayout from '../layouts/SuperAdminLayout'
import AuditSecurityPage from '../pages/AuditSecurity/AuditSecurityPage'
import CommandCenterPage from '../pages/CommandCenter/CommandCenterPage'
import CostsProfitabilityPage from '../pages/CostsProfitability/CostsProfitabilityPage'
import IndustryExplorerPage from '../pages/IndustryExplorer/IndustryExplorerPage'
import PlatformHealthPage from '../pages/PlatformHealth/PlatformHealthPage'
import PlansPricingPage from '../pages/PlansPricing/PlansPricingPage'
import ProductAnalyticsPage from '../pages/ProductAnalytics/ProductAnalyticsPage'
import SubscriptionsPage from '../pages/Subscriptions/SubscriptionsPage'
import TenantDetailsPage from '../pages/TenantDetails/TenantDetailsPage'
import TenantsPage from '../pages/Tenants/TenantsPage'
import UsersPage from '../pages/Users/UsersPage'

const pages: Record<string, ComponentType> = {
  '/super-admin': CommandCenterPage,
  '/super-admin/tenants': TenantsPage,
  '/super-admin/tenants/details': TenantDetailsPage,
  '/super-admin/users': UsersPage,
  '/super-admin/subscriptions': SubscriptionsPage,
  '/super-admin/product-analytics': ProductAnalyticsPage,
  '/super-admin/industry-explorer': IndustryExplorerPage,
  '/super-admin/plans-pricing': PlansPricingPage,
  '/super-admin/costs-profitability': CostsProfitabilityPage,
  '/super-admin/platform-health': PlatformHealthPage,
  '/super-admin/audit-security': AuditSecurityPage,
}

function EntryPage() {
  return (
    <main className="app-entry">
      <div className="app-entry__card">
        <span className="brand__mark" aria-hidden="true">B</span>
        <p className="page-header__eyebrow">BLUETHYME</p>
        <h1>Super Admin frontend scaffold</h1>
        <p>Platform owner authorization is not configured.</p>
        <a className="button-link" href="/super-admin">Open Super Admin</a>
      </div>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="app-entry">
      <div className="app-entry__card">
        <h1>Page not available</h1>
        <p>This path is not part of the Super Admin frontend scaffold.</p>
        <a className="text-link" href="/super-admin">Go to Super Admin</a>
      </div>
    </main>
  )
}

function SuperAdminRoutes() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  if (currentPath === '/') return <EntryPage />

  const Page = pages[currentPath]
  if (!Page) return <NotFoundPage />

  return (
    <SuperAdminLayout currentPath={currentPath}>
      <Page />
    </SuperAdminLayout>
  )
}

export default SuperAdminRoutes
