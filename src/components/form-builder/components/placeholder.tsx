import { useFormStore } from "@/store/form";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import { useMemo } from "react";

export const PlaceHolder: React.FC<{ id: string; isTop: boolean }> = ({
  id,
  isTop,
}) => {
  const form = useFormStore((state) => state.form);
  const formIds = useMemo(() => form.map((item) => item.id), [form]);
  const { setNodeRef, isOver, active } = useDroppable({
    id: `${id}-${isTop ? "top" : "bottom"}`,
    data: {
      id,
      isTop: isTop,
    },
  });

  return (
    <div
      className={clsx(
        " flex items-center justify-center w-full transition-all",
        isOver ? "h-[35px]" : "h-[15px]"
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
        </div>
      )}
    </div>
  );
};
