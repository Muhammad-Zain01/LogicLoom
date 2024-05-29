import DashboardLayout from "@/layout/dashboard-layout";
import GlobalLayout from "@/layout/global-layout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout>
      <DashboardLayout>{children}</DashboardLayout>
    </GlobalLayout>
  );
}
