import PageScaffold from '../../components/PageScaffold/PageScaffold'

function TenantsPage() {
  return (
    <PageScaffold
      action={{ label: 'View tenant details structure', href: '/super-admin/tenants/details' }}
      description="Explore customer organizations and their connected Bluethyme resources."
      emptyDescription="Tenant data is not connected. No tenant records or organization details are available."
      emptyTitle="No tenant data connected"
      title="Tenant Intelligence"
    />
  )
}

export default TenantsPage
