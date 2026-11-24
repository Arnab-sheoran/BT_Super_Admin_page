interface TopbarProps {
  onMenuClick: () => void
}

function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="topbar">
      <button
        aria-label="Open navigation"
        className="topbar__menu"
        onClick={onMenuClick}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <div className="topbar__context">
        <span className="topbar__context-label">Platform administration</span>
      </div>
      <span className="authorization-notice">
        <span aria-hidden="true" />
        Owner authorization not configured
      </span>
    </header>
  )
}

export default Topbar
