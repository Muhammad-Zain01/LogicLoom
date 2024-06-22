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

type QuestionItemProps = {
  question: FormItemType;
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const renderField = (item: FormItemType, field: any = null) => {
    // @ts-ignore
    const Field = FieldMap[item.type];
    if (!Field) {
      return null;
    }

    return <Field question={item} field={field} />;
  };

  return (
    <QuestionWrapper id={question.id}>
      {question.is_form_item ? (
        <div className="flex flex-col w-full p-2">
          <Label className="mb-3">{question.label}</Label>
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
