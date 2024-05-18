import { CardContent, Card } from "@/components/ui/card";
import { Widgets } from "@/constants/widgets";
import { TrashIcon } from "@radix-ui/react-icons";

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
        <CardContent className="flex flex-col items-center justify-center p-4">
          {icon}
          <span className="text-xs font-medium text-gray-900 dark:text-gray-50">
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
    <div>
      <div className="flex bg-gray-100 items-center border w-full h-16 border-gray-200 dark:border-gray-700 p-3">
        <TrashIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Dashboard
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
