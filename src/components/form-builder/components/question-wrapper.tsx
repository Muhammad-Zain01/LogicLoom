import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { RxDragHandleDots2 } from "react-icons/rx";

type QuestionWrapper = {
  children: React.ReactNode;
  id: string;
};

const QuestionWrapper: React.FC<QuestionWrapper> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const isSelected = false;
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={clsx(
        `flex bg-white px-3 pb-7 pt-5 rounded relative m-0`,
        isDragging ? `shadow-lg z-50` : "shadow z-0",
        isSelected && "border-2 border-primary"
      )}
    >
      <div {...listeners} className="flex items-center mr-2">
        <RxDragHandleDots2 size={15} className="text-gray-400" />
      </div>
      {children}
    </div>
  );
};

export default QuestionWrapper;
