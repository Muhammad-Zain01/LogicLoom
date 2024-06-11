import { generateFormField } from "@/lib/form-utils";
import { useFormStore } from "@/store/form";
import { useFormDraggingStore } from "@/store/form-drag";
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
  const { form, setForm, addForm } = useFormStore((state) => state);
  const { setActive, setOver } = useFormDraggingStore((state) => state);

  const handleDragStart = (event: any) => {
    const { active, over } = event;
    setActive(active);
    setOver(over);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over?.id) return null;
    if (active?.id == over?.id) return;

    if (!form.map((item) => item.id).includes(active.id)) {
      const overId = over?.data?.current?.id;
      const isTop = over?.data?.current?.isTop;

      if (overId) {
        console.log(">>>", active?.data?.current, over?.data?.current);

        const newFormItem = generateFormField({
          type: active?.data?.current?.type || "",
          is_form_item: active?.data?.current.isFormItem,
          is_widget: active?.data?.current.isWidget,
        });

        if (overId == "initial") {
          addForm(newFormItem);
        } else {
          const index = form.findIndex((item: any) => item.id == overId);
          if (index >= -1 && index < form.length) {
            const formCopy = [...form];
            setForm([
              ...(!isTop ? formCopy.slice(0, index + 1) : [newFormItem]),
              ...(isTop ? formCopy.slice(0, index + 1) : [newFormItem]),
              ...formCopy.slice(index + 1),
            ]);
          }
        }
      }
    } else {
      const orgPos = form.findIndex((item: any) => item.id == active?.id);
      const newPos = form.findIndex((item: any) => item.id == over?.id);
      setForm(arrayMove(form, orgPos, newPos));
    }
    setActive(null);
    setOver(null);
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
