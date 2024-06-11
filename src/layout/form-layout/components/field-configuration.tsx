import AlignmentSettings from "@/components/form-builder/components/alignment-settings";
import SizeSettings from "@/components/form-builder/components/heading-settings";
import LabelEditor from "@/components/form-builder/components/label-editor";
import { useFormStore } from "@/store/form";
import { useMemo } from "react";

const FieldConfiguration = () => {
  const { questionSelectedId, form, updateQuestion } = useFormStore(
    (state) => state
  );

  const question = useMemo(() => {
    return form.find((question) => question.id === questionSelectedId);
  }, [form, questionSelectedId]);

  if (!question) {
    return (
      <div className="flex h-[500px] w-full justify-center items-center">
        No question selected
      </div>
    );
  }
  return (
    <div>
      <LabelEditor
        value={question.label}
        onChange={(value: string) => {
          updateQuestion(question.id, { label: value });
        }}
      />
      {["heading", "button"].includes(question.type) && (
        <SizeSettings question={question} />
      )}
    </div>
  );
};

export default FieldConfiguration;
