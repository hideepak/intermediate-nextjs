// app/dashboard/page.tsx
import { getCurrentUser } from '@/utils/users';

export default async function DashboardPage() {
  // Await the current user. If not authenticated, getCurrentUser will redirect.
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.email}!</h1>
      {/* ...rest of your dashboard UI... */}
    </div>
  );
}

