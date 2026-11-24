import type { ReactNode } from 'react'
import EmptyState from '../EmptyState/EmptyState'
import PageHeader from '../PageHeader/PageHeader'

interface PageScaffoldProps {
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
  eyebrow?: string
  action?: {
    label: string
    href: string
  }
  children?: ReactNode
}

function PageScaffold({
  title,
  description,
  emptyTitle,
  emptyDescription,
  eyebrow,
  action,
  children,
}: PageScaffoldProps) {
  return (
    <div className="page-content">
      <PageHeader title={title} description={description} eyebrow={eyebrow} />
      {children ?? (
        <div className="surface-card">
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            action={action}
          />
        </div>
      )}
    </div>
  )
}

export default PageScaffold
