import type { SuperAdminNavigationItem } from '../types/navigation'

export const superAdminNavigation: SuperAdminNavigationItem[] = [
  { label: 'Command Center', path: '/super-admin', icon: 'command' },
  { label: 'Tenant Intelligence', path: '/super-admin/tenants', icon: 'tenants' },
  { label: 'Users', path: '/super-admin/users', icon: 'users' },
  { label: 'Subscriptions & Billing', path: '/super-admin/subscriptions', icon: 'billing' },
  { label: 'Product Analytics', path: '/super-admin/product-analytics', icon: 'analytics' },
  { label: 'Industry Explorer', path: '/super-admin/industry-explorer', icon: 'industry' },
  { label: 'Plans & Pricing', path: '/super-admin/plans-pricing', icon: 'pricing' },
  { label: 'Costs & Profitability', path: '/super-admin/costs-profitability', icon: 'costs' },
  { label: 'Platform Health', path: '/super-admin/platform-health', icon: 'health' },
  { label: 'Audit & Security', path: '/super-admin/audit-security', icon: 'audit' },
]
