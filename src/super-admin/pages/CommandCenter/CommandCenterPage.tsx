import PageScaffold from '../../components/PageScaffold/PageScaffold'

function CommandCenterPage() {
  return (
    <PageScaffold
      description="A platform-wide operational view will appear here when verified data sources are connected."
      emptyDescription="Platform data is not connected."
      emptyTitle="Command Center is not connected"
      title="Command Center"
    />
  )
}

export default CommandCenterPage
