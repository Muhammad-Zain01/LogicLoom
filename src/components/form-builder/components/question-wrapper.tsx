import { useFormStore } from "@/store/form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { FaTrash } from "react-icons/fa6";
import { RiDragMove2Fill } from "react-icons/ri";

type QuestionWrapperProps = {
  children: React.ReactNode;
  id: string;
  viewOnly?: boolean;
};

const QuestionWrapper: React.FC<QuestionWrapperProps> = ({
  id,
  children,
  viewOnly,
}) => {
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
  const { questionSelectedId, selectQuestion, removeFormQuestion, editable } =
    useFormStore((state) => state);

  const isSelected = questionSelectedId == id;
  const style = {
    transition,
    transform: CSS.Transform.toString({
      scaleX: 1,
      scaleY: 1,
      // @ts-ignore
      x: transform?.x,
      // @ts-ignore
      y: transform?.y,
    }),
  };

  if (!editable || viewOnly) return <div className="my-2">{children}</div>;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={clsx(
        `flex bg-white px-3 pb-7 pt-5 rounded relative m-0`,
        isDragging ? `z-50` : "z-0",
        isSelected && "border-2 border-primary"
      )}
      onClick={() => selectQuestion(id)}
    >
      {children}
      {isSelected && (
        <>
          <div className="absolute top-0 p-2 right-0 bg-primary text-white rounded-sm flex items-center gap-2">
            <FaTrash size={13} onClick={() => removeFormQuestion(id)} />
            <div {...listeners}>
              <RiDragMove2Fill size={17} className="text-white" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionWrapper;
