import EmptyState from '../../components/EmptyState/EmptyState'
import PageHeader from '../../components/PageHeader/PageHeader'

const subscriptionSections = [
  { title: 'Subscription overview', description: 'No verified subscription overview data is connected.' },
  { title: 'Subscription listing', description: 'Subscription records are not connected.' },
  { title: 'Subscription details', description: 'Subscription detail data is not connected.' },
  { title: 'Billing history', description: 'Billing history is not connected.' },
  { title: 'Payment details', description: 'Payment details are not connected.' },
]

function SubscriptionsPage() {
  return (
    <div className="page-content">
      <PageHeader
        description="Subscription and billing views will be populated only from verified data and calculation rules."
        title="Subscriptions & Billing"
      />
      <div className="section-grid">
        {subscriptionSections.map((section) => (
          <section className="surface-card section-card" key={section.title}>
            <h2 className="section-card__title">{section.title}</h2>
            <EmptyState
              description={section.description}
              title="Not connected"
            />
          </section>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionsPage
