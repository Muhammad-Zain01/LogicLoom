"use client";
import FormLayout from "@/layout/form-layout";
import GlobalLayout from "@/layout/global-layout";
import { useFormStore } from "@/store/form";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { form, setForm } = useFormStore((state) => state);
  const [activeId, setActiveId] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
    setDraggingItem(active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id == over.id) return;

    setActiveId(null);
    setDraggingItem(null);
    const orgPos = form.findIndex((item: any) => item.id == active.id);
    const newPos = form.findIndex((item: any) => item.id == over.id);
    console.log(">", arrayMove(form, orgPos, newPos));
    setForm(arrayMove(form, orgPos, newPos));

    // onAdd({ active, over });

    if (over && !form.map((item) => item.id).includes(active.id)) {
      setForm([...form, active.id]);
    }
  };

  return (
    <GlobalLayout>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <FormLayout>{children}</FormLayout>
        {/* <DragOverlay>
          {draggingItem &&
          !form.map((item) => item.id).includes(draggingItem) ? (
            <div
              style={{
                padding: "8px",
                background: "red",
                border: "1px solid gray",
                marginBottom: "4px",
                backgroundColor: "#fff",
                cursor: "grabbing",
              }}
            >
              {draggingItem}
            </div>
          ) : (
            <div className="transition-all p-2 border-blue-200 bg-white">
              drag item
            </div>
          )}
        </DragOverlay> */}
      </DndContext>
    </GlobalLayout>
  );
}
