import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import FieldComponents from "./field-components";
import dynamic from "next/dynamic";
const FieldConfiguration = dynamic(() => import("./field-configuration"), {
  ssr: false,
});

const Sidebar = () => {
  return (
    <div className="flex h-full">
      <div className=" w-[350px] bg-white dark:bg-gray-800 p-3  border-r border-gray-200 dark:border-gray-700 h-full">
        <Tabs defaultValue="components">
          <TabsList className="grid  w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>
          <TabsContent value="components">
            <FieldComponents />
          </TabsContent>
          <TabsContent value="configuration">
            <FieldConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sidebar;
