import { Button as ShadCnButton } from "@/components/ui/button";
import { FormItem } from "@/types/form";
import clsx from "clsx";

type ComponentProps = {
  question: FormItem;
};

const SizeMap = {
  small: "sm",
  large: "md",
  extra_large: "lg",
};
const AlignMap = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const Button: React.FC<ComponentProps> = ({ question }) => {
  const size = question.settings?.size || "medium";
  const align = question.settings?.align || "left";

  return (
    // @ts-ignore
    <div className={clsx("flex", AlignMap[align])}>
      <ShadCnButton
      // @ts-ignore
        size={SizeMap[size]}
        className={clsx(question.settings?.is_bold && "font-bold")}
      >
        {question.label}
      </ShadCnButton>
    </div>
  );
};

export default Button;
