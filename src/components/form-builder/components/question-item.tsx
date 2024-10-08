import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import QuestionWrapper from "./question-wrapper";
import { Label } from "@/components/ui/label";
import { FormItem as FormItemType } from "@/types/form";
import FieldMap from "./field-map";
import DescriptionWrapper from "./description-wrapper";
import { useFormStore } from "@/store/form";

type QuestionItemProps = {
  question: FormItemType;
  viewOnly?: boolean;
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question, viewOnly }) => {
  const { updateQuestion } = useFormStore();

  const onChange = (value: any) => {
    updateQuestion(question.id, { answer: value });
  };
  const renderField = (item: FormItemType, field: any = null) => {
    // @ts-ignore
    const Field = FieldMap[item.type];
    if (!Field) {
      return null;
    }

    return <Field question={item} field={field} onChange={onChange} />;
  };

  return (
    <QuestionWrapper id={question.id} viewOnly={viewOnly}>
      {question.is_form_item ? (
        <div className="flex flex-col w-full p-2">
          <Label className="mb-3">
            {question.label}{" "}
            <span className="text-red-700   text-xs ml-2">
              {question.is_required ? "*" : ""}
            </span>
          </Label>
          <DescriptionWrapper description={question.description}>
            {renderField(question)}
          </DescriptionWrapper>
        </div>
      ) : (
        <div className="w-full">{renderField(question)}</div>
      )}
    </QuestionWrapper>
  );
};

export const QuestionFormItem = ({ form, question, renderField }: any) => {
  return (
    <QuestionWrapper id={question.id}>
      <FormField
        control={form.control}
        name={question.id}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[14px]">{question.label}</FormLabel>
            <FormControl>{renderField(question, field)}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </QuestionWrapper>
  );
};

export default QuestionItem;
