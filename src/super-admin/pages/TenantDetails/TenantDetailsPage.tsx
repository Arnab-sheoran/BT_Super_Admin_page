import { useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import PageHeader from '../../components/PageHeader/PageHeader'
import type { TenantDetailsTab } from '../../types/navigation'

const tabs: { id: TenantDetailsTab; label: string; emptyMessage: string }[] = [
  { id: 'overview', label: 'Overview', emptyMessage: 'Tenant overview data is not connected.' },
  { id: 'websites', label: 'Websites', emptyMessage: 'Website data for this tenant is not connected.' },
  { id: 'users', label: 'Users', emptyMessage: 'User data for this tenant is not connected.' },
  { id: 'subscriptions', label: 'Subscriptions', emptyMessage: 'Subscription data for this tenant is not connected.' },
  { id: 'activity', label: 'Activity', emptyMessage: 'Tenant activity records are not connected.' },
]

function TenantDetailsPage() {
  const [activeTab, setActiveTab] = useState<TenantDetailsTab>('overview')
  const selectedTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  return (
    <div className="page-content">
      <PageHeader
        description="Tenant details structure"
        eyebrow="TENANT INTELLIGENCE"
        title="Tenant Details"
      />
      <section aria-label="Tenant details sections" className="surface-card">
        <div className="tabs" role="tablist" aria-label="Tenant details">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab.id}
              className={`tabs__tab${activeTab === tab.id ? ' tabs__tab--active' : ''}`}
              id={`tenant-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          aria-labelledby={`tenant-tab-${activeTab}`}
          className="tabs__panel"
          role="tabpanel"
        >
          <EmptyState
            description={`${selectedTab.emptyMessage} Select a tenant after an approved data integration is available.`}
            title="No tenant selected"
          />
        </div>
      </section>
    </div>
  )
}

export default TenantDetailsPage
