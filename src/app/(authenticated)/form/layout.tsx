"use client";
import FormItemOverlay from "@/components/form-builder/components/form-item-overlay";
import FormLayout from "@/layout/form-layout";
import GlobalLayout from "@/layout/global-layout";
import { useFormDraggingStore, useFormStore } from "@/store/form";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { form, setForm } = useFormStore((state) => state);
  const { setActiveId, setOverId } = useFormDraggingStore((state) => state);

  const handleDragStart = (event: any) => {
    const { active, over } = event;
    setActiveId(active);
    setOverId(over);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over?.id) return null;
    if (active?.id == over?.id) return;

    if (!form.map((item) => item.id).includes(active.id)) {
      const overId = over?.data?.current?.id;
      const isTop = over?.data?.current?.isTop;
      if (over?.data?.current?.id) {
        const newFormItem = {
          id: `${Math.random() * 5222}-${active.id}`,
          type: "single-line",
          label: active.id,
          reference: "first_name_123",
          placeholder: "Enter your first name",
          description: "Enter your first name",
          is_required: true,
          is_readonly: false,
          settings: {},
        };
        const index = form.findIndex(
          (item: any) => item.id == over?.data?.current?.id
        );
        if (index >= -1 && index < form.length) {
          const formCopy = [...form];

          setForm([
            ...(!isTop ? formCopy.slice(0, index + 1) : [newFormItem]),
            ...(isTop ? formCopy.slice(0, index + 1) : [newFormItem]),
            ...formCopy.slice(index + 1),
          ]);
        }
      }
    } else {
      const orgPos = form.findIndex((item: any) => item.id == active?.id);
      const newPos = form.findIndex((item: any) => item.id == over?.id);
      setForm(arrayMove(form, orgPos, newPos));
    }
    setActiveId(null);
    setOverId(null);
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);
  return (
    <GlobalLayout>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <FormLayout>{children}</FormLayout>
        {/* <FormItemOverlay /> */}
      </DndContext>
    </GlobalLayout>
  );
}
