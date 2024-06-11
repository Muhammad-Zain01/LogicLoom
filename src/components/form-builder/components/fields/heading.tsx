import { FormItem, HeadingSize } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};

const SizeMap = {
  small: "text-2xl",
  large: "text-4xl",
  extra_large: "text-6xl",
};

const AlignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const Heading: React.FC<ComponentProps> = ({ question }) => {
  const Size: HeadingSize = question.settings?.size || "small";
  const isBold = question?.settings?.is_bold || false;
  const align = question?.settings?.align || "left";
  return (
    <h1
      className={`${SizeMap[Size]} ${isBold && "font-bold"} ${AlignMap[align]}`}
    >
      {question.label}
    </h1>
  );
};
export default Heading;
