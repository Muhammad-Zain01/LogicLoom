import {
  DndContext,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { Input } from "./input";
import { FaRegTrashCan, FaTrash } from "react-icons/fa6";
import { Button } from "./button";
import { generateUUID } from "@/lib/utils";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import { useRef } from "react";

type Item = { label: string; id: string };

type SortableListProps = {
  label: string;
  question: FormItem;
  key_item: string;
};

type SortableItemProps = {
  item: Item;
  onUpdate: (id: string, value: string) => void;
};

type SortableWraper = {
  items: Item[];
  children: React.ReactNode;
  onUpdate: (values: Item[]) => void;
};

const SortableWrapper: React.FC<SortableWraper> = ({
  items,
  onUpdate,
  children,
}: any) => {
  const onDragEnd = (event: any) => {
    const { active, over } = event;
    const orgPos = items.findIndex((item: any) => item.id == active?.id);
    const newPos = items.findIndex((item: any) => item.id == over?.id);
    onUpdate(arrayMove(items, orgPos, newPos));
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  return (
    <DndContext
      onDragEnd={onDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

const SortableItem: React.FC<SortableItemProps> = ({ item, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });
  const sortable_ref = useRef();
  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div ref={setNodeRef} {...attributes} style={style} className="my-2 ">
      <div
        ref={sortable_ref}
        className="flex items-center bg-gray-100 px-2 rounded-md justify-between"
      >
        <div className="flex items-center w-full ">
          <MdDragIndicator {...listeners} />
          <Input
            value={item.label}
            onChange={(e) => onUpdate(item.id, e.target.value)}
            placeholder="Enter Value"
            className="border-none w-[100%]  px-2 text-[13px] focus-visible:border-none focus-visible:ring-0 shadow-none"
            onFocus={() => {
              sortable_ref.current.classList.add("ring-1");
              sortable_ref.current.classList.add("ring-ring");
            }}
            onBlur={() => {
              sortable_ref.current.classList.remove("ring-1");
              sortable_ref.current.classList.remove("ring-ring");
            }}
          />
        </div>
        <div>
          <span>
            <FaRegTrashCan onClick={() => onUpdate(item.id, null, true)} />
          </span>
        </div>
      </div>
    </div>
  );
};

const SortableList: React.FC<SortableListProps> = ({
  label,
  key_item,
  question,
}) => {
  const items = question?.settings[key_item] || [];
  const updateQuestion = useFormStore((state) => state.updateQuestion);

  const onUpdate = (values: Item[]) => {
    updateQuestion(question.id, {
      settings: { ...question.settings, [key_item]: values },
    });
  };

  const onUpdateValue = (
    id: string,
    value?: string,
    is_delete: boolean = false
  ) => {
    let newItems = items;
    if (is_delete) {
      newItems = items.filter((item: Item) => item.id !== id);
    } else {
      newItems = items.map((item: Item) => {
        if (item.id === id) {
          return { ...item, label: value };
        }
        return item;
      });
    }
    onUpdate(newItems);
  };

  return (
    <SortableWrapper items={items} onUpdate={onUpdate}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">{label}</span>
        <Button
          size="sm"
          variant={"outline"}
          className="p-2 h-[23px]"
          onClick={() => {
            const newItem = { label: "", id: generateUUID() };
            const values: Item[] = [...(items || []), newItem];
            onUpdate(values);
          }}
        >
          + Add
        </Button>
      </div>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items?.length > 0 ? (
          items.map((item: any, index: number) => {
            return (
              <SortableItem item={item} onUpdate={onUpdateValue} key={index} />
            );
          })
        ) : (
          <div className="text-center my-10 text-gray-400">
            <span className="text-sm ">No items to display</span>
          </div>
        )}
      </SortableContext>
    </SortableWrapper>
  );
};

export default SortableList;
