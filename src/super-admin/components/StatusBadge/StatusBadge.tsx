type StatusBadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

interface StatusBadgeProps {
  label: string
  tone?: StatusBadgeTone
}

function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${tone}`}>{label}</span>
}

export default StatusBadge
