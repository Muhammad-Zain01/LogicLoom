"use client";
import DndWrapper from "@/components/form-builder/components/dnd-wrapper";
import FormLayout from "@/layout/form-layout";
import GlobalLayout from "@/layout/global-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout>
      <DndWrapper>
        <FormLayout>{children}</FormLayout>
      </DndWrapper>
    </GlobalLayout>
  );
}
