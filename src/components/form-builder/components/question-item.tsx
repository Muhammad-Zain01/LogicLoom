import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import QuestionWrapper from "./question-wrapper";

const QuestionItem = ({ form, question, renderField }: any) => {
  return (
    <QuestionWrapper id={question.id}>
      <FormField
        control={form.control}
        name={question.id}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[14px]">{question.label}</FormLabel>
            {question.description && (
              <FormDescription>
                <Input value={question.description} />
              </FormDescription>
            )}
            <FormControl>{renderField(question, field)}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </QuestionWrapper>
  );
};

export default QuestionItem;
