export interface SuperAdminNavigationItem {
  label: string
  path: string
  icon: 'command' | 'tenants' | 'users' | 'billing' | 'analytics' | 'industry' | 'pricing' | 'costs' | 'health' | 'audit'
}

export type TenantDetailsTab =
  | 'overview'
  | 'websites'
  | 'users'
  | 'subscriptions'
  | 'activity'
