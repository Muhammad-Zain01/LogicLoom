import { FormItem, HeadingSize } from "@/types/form";
import clsx from "clsx";
import DescriptionWrapper from "../description-wrapper";

type ComponentProps = {
  question: FormItem;
};

type Align = "left" | "center" | "right";
const SizeMap: { [HeadingSize: string]: string } = {
  small: "text-xs",
  large: "text-sm",
  extra_large: "text-md",
};

const AlignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const Description: React.FC<ComponentProps> = ({ question }) => {
  const Size: HeadingSize = question.settings?.size || "small";

  const isBold = question?.settings?.is_bold || false;
  const align: Align = question?.settings?.align || "left";
  const isItalic = question?.settings?.is_italic || false;
  const isUnderline = question?.settings?.is_underline || false;
  const color = question?.settings?.color || false;

  return (
    <p
      style={{ color: color ? color : "black" }}
      className={clsx(
        SizeMap[Size],
        isBold && "font-bold",
        AlignMap[align],
        isItalic && "italic",
        isUnderline && "underline"
      )}
    >
      {question.description || (
        <div className="text-center text-gray-400">No Description</div>
      )}
    </p>
  );
};
export default Description;
