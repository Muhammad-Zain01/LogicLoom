import { CardContent, Card } from "@/components/ui/card";
import { Widgets } from "@/constants/widgets";
import { TrashIcon } from "@radix-ui/react-icons";
import { GoWorkflow } from "react-icons/go";

type ItemWrapperProps = {
  label: string;
  icon: React.ReactNode;
  onDragStart: (event: any) => void;
};

const ItemWrapper: React.FC<ItemWrapperProps> = ({
  label,
  icon,
  onDragStart,
}) => {
  return (
    <div onDragStart={onDragStart} draggable>
      <Card className="bg-white rounded-sm dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow cursor-grab">
        <CardContent className="flex flex-col items-center justify-center p-3">
          {icon}
          <span className="text-[12px] mt-1 font-medium text-gray-900 dark:text-gray-50">
            {label}
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-gray-100 px-6 items-center border w-full h-16 border-gray-200 dark:border-gray-700 p-3 gap-3">
        <GoWorkflow size={18} />
        <h2 className="text-[18px] font-semibold text-gray-900 dark:text-gray-50">
          Flow Builder
        </h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 w-64 p-6 border-r border-gray-200 dark:border-gray-700 h-full">
        <nav className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Widgets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Widgets.map((item, idx) => {
                return (
                  <ItemWrapper
                    key={idx}
                    label={item.label}
                    icon={item.icon}
                    onDragStart={(event: any) => onDragStart(event, item.type)}
                  />
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
