import DashboardLayout from "@/layout/dashboard-layout";
import FormLayout from "@/layout/form-layout";
import GlobalLayout from "@/layout/global-layout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout>
      <FormLayout>{children}</FormLayout>
    </GlobalLayout>
  );
}
