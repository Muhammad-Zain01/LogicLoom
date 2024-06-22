import { FormItem } from "@/types/form";

type ComponentProps = {
  description: string | null;
  children: React.ReactNode;
};
const DescriptionWrapper: React.FC<ComponentProps> = ({
  children,
  description,
}) => {
  if (description) {
    return (
      <div>
        <p className="text-gray-400 text-sm m-0 mb-2">{description}</p>
        {children}
      </div>
    );
  }
  return children;
};

export default DescriptionWrapper;
