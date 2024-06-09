import { FormFields } from "@/constants/form-fields";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type ItemWrapperProps = {
  label: string;
  icon: React.ReactNode;
};

const ItemWrapper: React.FC<ItemWrapperProps> = ({ label, icon }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: label,
      data: {
        isSidebarItem: true,
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
          className="opacity-100 absolute w-[150px] flex items-center justify-center rounded p-4 bg-white border-2 border-dashe text-blue-300 border-blue-300"
        >
          {label}
        </div>
      )}
      <div className="flex border  bg-[#f8f8f8] border-[#e3e3e3] rounded justify-center items-center dark:bg-gray-900 cursor-grab">
        <div className="flex flex-col items-center justify-center p-1 py-5 h-full w-full ">
          {icon}
          <span className="text-[12px] text-center font-medium text-gray-500 dark:text-gray-50 mx-2">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

const FieldComponents = () => {
  return (
    <div>
      <div className="my-3 mt-6 text-gray-300">Components</div>
      <div className="grid grid-cols-3 gap-2">
        {FormFields.map((item, idx) => {
          return <ItemWrapper key={idx} label={item.label} icon={item.icon} />;
        })}
      </div>
    </div>
  );
};

export default FieldComponents;
