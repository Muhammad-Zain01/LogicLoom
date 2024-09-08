import FlowLayout from "@/layout/flow-layout";
import GlobalLayout from "@/layout/global-layout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout>
      <FlowLayout>{children}</FlowLayout>
    </GlobalLayout>
  );
}
