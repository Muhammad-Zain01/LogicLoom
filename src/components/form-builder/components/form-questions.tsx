import { useFormStore } from "@/store/form";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment } from "react";
import { Button } from "react-day-picker";
import { UseFormReturn } from "react-hook-form";
import QuestionItem from "./question-item";
import { PlaceHolder } from "./placeholder";
import FieldMap from "./field-map";

type ComponentProps = {
  form: UseFormReturn<any>;
};

const FormQuestions: React.FC<ComponentProps> = ({ form }: any) => {
  const formData = useFormStore((state) => state.form);

  const renderField = (item: any, field: any) => {
    // @ts-ignore
    const Field = FieldMap[item.type];
    if (!Field) {
      return null;
    }
    return <Field field={field} />;
  };

  if (formData && !formData.length) {
    return (
      <div className="flex">
        <PlaceHolder id="initial" isInitial />
      </div>
    );
  }
  return (
    <SortableContext items={formData} strategy={verticalListSortingStrategy}>
      {formData.map((item: any, index: number) => {
        if (item.type == "button") {
          return <Button key={item.id}>Submit</Button>;
        }
        return (
          <Fragment key={item.id}>
            {index == 0 && <PlaceHolder id={item.id} isTop={true} />}
            <QuestionItem
              form={form}
              question={item}
              renderField={renderField}
            />
            {<PlaceHolder id={item.id} isTop={false} />}
          </Fragment>
        );
      })}
    </SortableContext>
  );
};

export default FormQuestions;
