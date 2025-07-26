import AdminSidebar from "@/components/admin-sidebar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminSidebar />
        {children}
      </body>
    </html>
  );
}
