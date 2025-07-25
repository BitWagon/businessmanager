import Sidebar from '@/components/Sidebar';
import AuthWrapper from '@/components/AuthWrapper';

export const metadata = {
  title: 'Dashboard',
  description: 'Business software dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen z-50">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 bg-gray-100 p-4 min-h-screen overflow-y-auto">
        <AuthWrapper>{children}</AuthWrapper>
      </main>
    </div>
  );
}
