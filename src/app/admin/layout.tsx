import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin — Sree Kamakshi Foods",
  description: "Admin panel for Sree Kamakshi Foods",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
