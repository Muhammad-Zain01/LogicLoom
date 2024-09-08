import ColorSelector from "@/components/form-builder/components/color-selector";
import SizeSettings from "@/components/form-builder/components/heading-settings";
import InputEditor from "@/components/form-builder/components/input-editor";
import { useFormStore } from "@/store/form";
import { useMemo, useCallback } from "react";
import FieldMap from "@/components/form-builder/components/field-map";
import Toggle from "@/components/form-builder/components/toggle";
import SortableList from "@/components/ui/sortable-list";

const FieldConfiguration = () => {
  // @ts-ignore
  const { questionSelectedId, form, updateQuestion } = useFormStore(state => state);

  const question = useMemo(() => 
    form.find(q => q.id === questionSelectedId),
    [form, questionSelectedId]
  );

  const handleUpdate = useCallback((key: string, value: any) => {
    if (question) {
      updateQuestion(question.id, { [key]: value });
    }
  }, [question, updateQuestion]);

  if (!question) {
    return (
      <div className="flex h-[500px] w-full justify-center items-center">
        No question selected
      </div>
    );
  }

  const QuestionItem = FieldMap[question.type as keyof typeof FieldMap];
  const { type, is_form_item } = question;
  const shouldShowDescription = !["heading", "button"].includes(type);
  const shouldShowPlaceholder = !["checkbox", "radio", "rating"].includes(type);
  const isTypography = ["heading", "button", "description"].includes(type);

  return (
    <div>
      {type !== "divider" && (
        <>
          {type !== "description" && (
            <InputEditor
              label="Label"
              placeholder="Enter field label..."
              value={question.label}
              onChange={(value: string) => handleUpdate("label", value)}
            />
          )}
          {shouldShowDescription && (
            <InputEditor
              label="Description"
              placeholder="Enter field description..."
              value={question.description}
              onChange={(value: string) => handleUpdate("description", value)}
            />
          )}
          {is_form_item && (
            <>
              {shouldShowPlaceholder && (
                <InputEditor
                  label="Placeholder"
                  placeholder="Enter field placeholder..."
                  value={question.placeholder}
                  onChange={(value: string) => handleUpdate("placeholder", value)}
                />
              )}
              <Toggle
                label="Is Required"
                value={question.is_required}
                onChange={(value: boolean) => handleUpdate("is_required", value)}
              />
            </>
          )}
        </>
      )}

      {isTypography && <SizeSettings question={question} />}
      {isTypography && (
        <ColorSelector
          value={question.settings?.color}
          onChange={(value: string) => handleUpdate("settings", { ...question.settings, color: value })}
        />
      )}
      {/* @ts-ignore */}
      {QuestionItem?.Settings && <QuestionItem.Settings question={question} />}

      {["dropdown", "checkbox", "radio"].includes(type) && (
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
