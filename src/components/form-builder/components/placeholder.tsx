import { useFormStore } from "@/store/form";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import { useMemo } from "react";

export const PlaceHolder: React.FC<{
  id?: string;
  isTop?: boolean;
  isInitial?: boolean;
  InitialRender?: React.ReactNode;
}> = ({ id, isTop, isInitial = false, InitialRender }) => {
  const { form, editable } = useFormStore((state) => state);
  const formIds = useMemo(() => form.map((item) => item.id), [form]);
  const { setNodeRef, isOver, active } = useDroppable({
    id: `${id}-${isTop ? "top" : "bottom"}`,
    data: {
      id,
      isTop: isTop,
    },
  });
  if (!editable) return null;
  return (
    <div
      className={clsx(
        " flex  justify-center w-full transition-all",
        isInitial ? "items-start" : "items-center",
        !isInitial ? (isOver ? "h-[35px]" : "h-[18px]") : "h-[200px]"
      )}
    >
      {/* @ts-ignore */}
      {!formIds.includes(active?.id || "") && (
        <div ref={setNodeRef} className="h-[50%] w-full">
          {isOver && (
            <div
              className={
                "w-full h-full rounded-lg bg-[#1f9c4b98] border border-[#04511fab]"
              }
            />
          )}

          {!isOver && isInitial && InitialRender && InitialRender}
        </div>
      )}
    </div>
  );
};
