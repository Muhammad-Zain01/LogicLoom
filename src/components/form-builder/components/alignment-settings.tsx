import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import clsx from "clsx";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
} from "react-icons/fa6";

type ComponentProps = {
  question: FormItem;
};

const AlignmentSettings: React.FC<ComponentProps> = ({ question }) => {
  const updateQuestion = useFormStore((state) => state.updateQuestion);
  const isBold = question?.settings?.is_bold || false;
  const align = question?.settings?.align || "left";
  return (
    <div className="flex justify-center mt-3 gap-2">
      <Button
        variant="outline"
        className={clsx("w-full", isBold && "bg-gray-100")}
        onClick={() => {
          updateQuestion(question.id, {
            settings: { ...question.settings, is_bold: !isBold },
          });
        }}
      >
        <FaBold />
      </Button>
      <Button
        variant="outline"
        className={clsx("w-full", align == "left" && "bg-gray-100")}
        onClick={() => {
          updateQuestion(question.id, {
            settings: { ...question.settings, align: "left" },
          });
        }}
      >
        <FaAlignLeft />
      </Button>
      <Button
        variant="outline"
        className={clsx("w-full", align == "center" && "bg-gray-100")}
        onClick={() => {
          updateQuestion(question.id, {
            settings: { ...question.settings, align: "center" },
          });
        }}
      >
        <FaAlignCenter />
      </Button>
      <Button
        variant="outline"
        className={clsx("w-full", align == "right" && "bg-gray-100")}
        onClick={() => {
          updateQuestion(question.id, {
            settings: { ...question.settings, align: "right" },
          });
        }}
      >
        <FaAlignRight />
      </Button>
    </div>
  );
};

export default AlignmentSettings;
