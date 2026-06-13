import AppSidebar from "@/components/AppSidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
