import { FieldItem, FormFields } from "@/constants/form-fields";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type ItemWrapperProps = {
  item: FieldItem;
};

const ItemWrapper: React.FC<ItemWrapperProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.label,
      data: {
        isSidebarItem: true,
        type: item.type,
        isFormItem: item?.isFormItem ? true : false,
        isWidget: item?.isWidget ? true : false,
      },
    });

  const dummyStyle = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: 1,
      scaleY: 1,
    }),
  };
  const style = {
    opacity: isDragging ? 0.5 : 1,
    marginBottom: "4px",
    cursor: "grab",
    zIndex: 50,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isDragging && (
        <div
          style={dummyStyle}
          className="opacity-100 absolute w-[150px] flex items-center justify-center rounded p-4 bg-white border-2 border-dashed text-blue-300 border-blue-300"
        >
          {item.label}
        </div>
      )}
      <div className="flex h-[80px] border bg-[#f8f8f8] border-[#e3e3e3] rounded justify-center items-center dark:bg-gray-900 cursor-grab">
        <div className="flex flex-col items-center justify-center p-0 py-4 h-full w-full ">
          {item.icon}
          <span className="text-[11px] w-full text-center font-medium text-gray-500 dark:text-gray-50 mx-2">
            {item.label}
          </span>
        </div>
      </div>
    </div>
  );
};

const FieldComponents = () => {
  const KEYS = Object.keys(FormFields);
  return (
    <div>
      {KEYS.map((key: string, idx: number) => {
        const FormItem = FormFields[key] as FieldItem[];
        return (
          <>
            <div className="my-2 mt-4 text-gray-400 font-[400] text-[14px]">
              {key}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {FormItem.map((item: FieldItem) => {
                return <ItemWrapper key={idx} item={item} />;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default FieldComponents;
