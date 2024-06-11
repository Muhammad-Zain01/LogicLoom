import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import clsx from "clsx";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaUnderline,
} from "react-icons/fa6";

type ComponentProps = {
  question: FormItem;
};

const AlignmentSettings: React.FC<ComponentProps> = ({ question }) => {
  const updateQuestion = useFormStore((state) => state.updateQuestion);
  const isBold = question?.settings?.is_bold || false;
  const isItalic = question?.settings?.is_italic || false;
  const isUnderline = question?.settings?.is_underline || false;
  const align = question?.settings?.align || "left";

  const SelectorButton = ({
    value,
    isValue,
    type,
    children,
  }: {
    isValue: boolean;
    value: string | boolean;
    type: string;
    children: React.ReactNode;
  }) => {
    return (
      <Button
        variant="outline"
        className={clsx("w-full", isValue && "bg-gray-100")}
        onClick={() => {
          updateQuestion(question.id, {
            settings: { ...question.settings, [type]: value },
          });
        }}
      >
        {children}
      </Button>
    );
  };

  return (
    <div className="flex justify-center mt-3 gap-2">
      <SelectorButton
        type="is_underline"
        isValue={isUnderline}
        value={!isUnderline}
      >
        <FaUnderline />
      </SelectorButton>
      <SelectorButton type="is_italic" isValue={isItalic} value={!isItalic}>
        <FaItalic />
      </SelectorButton>
      <SelectorButton type="is_bold" isValue={isBold} value={!isBold}>
        <FaBold />
      </SelectorButton>
      <SelectorButton type="align" isValue={align == "left"} value={"left"}>
        <FaAlignLeft />
      </SelectorButton>
      <SelectorButton type="align" isValue={align == "center"} value={"center"}>
        <FaAlignCenter />
      </SelectorButton>
      <SelectorButton type="align" isValue={align == "right"} value={"right"}>
        <FaAlignRight />
      </SelectorButton>
    </div>
  );
};

export default AlignmentSettings;
