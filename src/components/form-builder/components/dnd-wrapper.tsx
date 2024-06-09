import { useFormDraggingStore, useFormStore } from "@/store/form";
import {
  DndContext,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

type ComponentProps = {
  children: React.ReactNode;
};

const DndWrapper: React.FC<ComponentProps> = ({ children }) => {
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

      if (overId) {
        const newFormItem = {
          id: `${Math.random() * 5222}-${active.id}`,
          type: "single-line",
          label: active.id,
          placeholder: "Enter your first name",
          description: "Enter your first name",
          is_required: true,
          is_readonly: false,
          settings: {},
        };
        const index = form.findIndex((item: any) => item.id == overId);
        if (index >= -1 && index < form.length) {
          const formCopy = [...form];
          console.log(formCopy, newFormItem);
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
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default DndWrapper;
