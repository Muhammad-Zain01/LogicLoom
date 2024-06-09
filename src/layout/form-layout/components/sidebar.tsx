import { CardContent, Card } from "@/components/ui/card";
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
      <Card className="bg-white rounded-sm dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow cursor-grab">
        <CardContent className="flex items-center justify-center p-2">
          {icon}
          <span className="text-sm text-center font-medium text-gray-900 dark:text-gray-50 mx-2">
            {label}
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="flex h-full">
      <div className="bg-white dark:bg-gray-800 w-64 p-6 border-r border-gray-200 dark:border-gray-700 h-full">
        <nav className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Fields
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {FormFields.map((item, idx) => {
                return (
                  <ItemWrapper key={idx} label={item.label} icon={item.icon} />
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
