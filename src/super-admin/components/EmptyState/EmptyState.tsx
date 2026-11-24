interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section className="empty-state" aria-label={title}>
      <div className="empty-state__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 5.75A1.75 1.75 0 0 1 6.75 4h10.5A1.75 1.75 0 0 1 19 5.75v12.5A1.75 1.75 0 0 1 17.25 20H6.75A1.75 1.75 0 0 1 5 18.25V5.75Z" />
          <path d="M8 9h8M8 12.5h5" />
        </svg>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && (
        <a className="text-link" href={action.href}>
          {action.label}
        </a>
      )}
    </section>
  )
}

export default EmptyState
