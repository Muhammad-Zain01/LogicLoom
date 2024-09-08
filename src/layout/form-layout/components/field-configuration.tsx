import ColorSelector from "@/components/form-builder/components/color-selector";
import SizeSettings from "@/components/form-builder/components/heading-settings";
import InputEditor from "@/components/form-builder/components/input-editor";
import { useFormStore } from "@/store/form";
import { useMemo } from "react";
import FieldMap from "@/components/form-builder/components/field-map";
import Toggle from "@/components/form-builder/components/toggle";
import SortableList from "@/components/ui/sortable-list";
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
  const QuestionItem = FieldMap[question.type];
  console.log(question?.is_form_item);
  return (
    <div>
      {!["divider"].includes(question.type) && (
        <>
          {!["description"].includes(question.type) && (
            <InputEditor
              label="Label"
              placeholder="Enter field label..."
              value={question.label}
              onChange={(value: string) => {
                updateQuestion(question.id, { label: value });
              }}
            />
          )}
          <InputEditor
            label="Description"
            placeholder="Enter field description..."
            value={question.description}
            onChange={(value: string) => {
              updateQuestion(question.id, { description: value });
            }}
          />
          {question?.is_form_item && (
            <>
              <InputEditor
                label="Placeholder"
                placeholder="Enter field placeholder..."
                value={question.placeholder}
                onChange={(value: string) => {
                  updateQuestion(question.id, { placeholder: value });
                }}
              />
              <Toggle
                label="Is Required"
                value={question.is_required}
                onChange={(e: boolean) => {
                  updateQuestion(question.id, { is_required: e });
                }}
              />
            </>
          )}
        </>
      )}

      {["heading", "button", "description"].includes(question.type) && (
        <SizeSettings question={question} />
      )}
      {["heading", "description", "button"].includes(question.type) && (
        <ColorSelector
          value={question.settings?.color}
          onChange={(value: string) => {
            updateQuestion(question.id, {
              settings: { ...question.settings, color: value },
            });
          }}
        />
      )}
      {QuestionItem?.Settings && <QuestionItem.Settings question={question} />}

      {["dropdown", "checkbox", "radio"].includes(question.type) && (
        <SortableList
          label="Values"
          key_item="list_values"
          question={question}
        />
      )}
    </div>
  );
};

export default FieldConfiguration;
