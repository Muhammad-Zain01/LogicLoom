import { useFormDraggingStore } from "@/store/form";
import { DragOverlay } from "@dnd-kit/core";

const FormItemOverlay = () => {
  const { activeId } = useFormDraggingStore((state) => state);

  return (
    <DragOverlay>
      {activeId?.data?.current?.isSidebarItem ? (
        <div className="w-64 h-20 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-center">
          Drag me
        </div>
      ) : (
        <div className="w-[600px] h-20 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-center">
          Test
        </div>
      )}
    </DragOverlay>
  );
};

export default FormItemOverlay;
