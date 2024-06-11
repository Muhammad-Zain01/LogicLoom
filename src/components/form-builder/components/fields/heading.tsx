import { FormItem, HeadingSize } from "@/types/form";
import clsx from "clsx";

type ComponentProps = {
  question: FormItem;
};

type Align = "left" | "center" | "right";

const SizeMap: { [HeadingSize: string]: string } = {
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
  const align: Align = question?.settings?.align || "left";
  const isItalic = question?.settings?.is_italic || false;
  const isUnderline = question?.settings?.is_underline || false;

  return (
    <h1
      className={clsx(
        SizeMap[Size],
        isBold && "font-bold",
        AlignMap[align],
        isItalic && "italic",
        isUnderline && "underline"
      )}
    >
      {question.label}
    </h1>
  );
};
export default Heading;
