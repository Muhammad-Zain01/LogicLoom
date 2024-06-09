import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { RxDragHandleDots2 } from "react-icons/rx";

export const PlaceHolder: React.FC<{ id: string; isTop: boolean }> = ({
  id,
  isTop,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${id}-${isTop ? "top" : "bottom"}`,
    data: {
      id,
      isTop: isTop,
    },
  });

  return (
    <div ref={setNodeRef} className="min-h-3">
      {isOver && (
        <div
          className={
            "w-full h-[20px] rounded bg-primary opacity-75 border-2 border-primary flex justify-center items-center "
          }
        />
      )}
    </div>
  );
};

const QuestionItem = ({ form, question, renderField }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: question.id,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const isSelected = false;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={clsx(
        `flex bg-white px-3 pb-7 pt-5 rounded relative`,
        isDragging ? `shadow-lg z-50` : "shadow z-0",
        isSelected && "border-2 border-primary"
      )}
    >
      <div {...listeners} className="flex items-center mr-2">
        <RxDragHandleDots2 size={15} className="text-gray-400" />
      </div>
      <FormField
        control={form.control}
        name={question.reference}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[14px]">{question.label}</FormLabel>
            {question.description && (
              <FormDescription>
                <Input value={question.description} />
              </FormDescription>
            )}
            <FormControl>{renderField(question, field)}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default QuestionItem;
