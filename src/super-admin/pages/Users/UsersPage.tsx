import PageScaffold from '../../components/PageScaffold/PageScaffold'

function UsersPage() {
  return (
    <PageScaffold
      description="Review user accounts and their website-level access after verified backend fields are available."
      emptyDescription="User data is not connected. No identity, account status, website association, or role fields are being assumed."
      emptyTitle="No users available"
      title="Users"
    />
  )
}

export default UsersPage
