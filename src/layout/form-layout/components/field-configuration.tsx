import { useFormStore } from "@/store/form";
import { useMemo } from "react";

const FieldConfiguration = () => {
  const { questionSelectedId, form } = useFormStore((state) => state);

  const question = useMemo(() => {
    return form.find((question) => question.id === questionSelectedId);
  }, [form, questionSelectedId]);

  if (!question) {
    return null;
  }
  return (
    <div>
      {" "}
      Selected Question: {question.label} - {question?.type}{" "}
    </div>
  );
};

export default FieldConfiguration;
