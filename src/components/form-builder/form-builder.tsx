"use client";
import SingleLine from "./components/fields/single-line";
import { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RxDragHandleDots2 } from "react-icons/rx";
import clsx from "clsx";
import { useFormStore } from "@/store/form";

const FieldMap = {
  "single-line": SingleLine,
  button: Button,
};

const FormBuilder = () => {
  const formData = useFormStore((state) => state.form);

  const formSchema = z.object({
    first_name_123: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name_123: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-[80%] border rounded-lg p-8 h-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormQuestions form={form} formData={formData} />
        </form>
      </Form>
    </div>
  );
};

const Placeholder = () => {
  return (
    <div
      style={{
        padding: "8px",
        border: "2px dashed gray",
        marginBottom: "4px",
        backgroundColor: "#f0f0f0",
      }}
    >
      Drop here
    </div>
  );
};

const FormQuestions = ({ form, formData }: any) => {
  const [overId, setOverId] = useState(null);
  const handleDragOver = (event: any) => {
    const { over } = event;
    if (over) {
      setOverId(over.id);
    }
  };

  const renderField = (item: any, field: any) => {
    // @ts-ignore
    const Field = FieldMap[item.type];
    if (!Field) {
      return null;
    }
    return <Field field={field} />;
  };
  console.log("over", overId);
  return (
    <>
      <SortableContext items={formData} strategy={verticalListSortingStrategy}>
        {formData.map((item: any) => {
          if (item.type == "button") {
            return <Button key={item.id}>Submit</Button>;
          }
          return (
            <Fragment key={item.id}>
              <QuestionItem
                form={form}
                question={item}
                renderField={renderField}
              />
            </Fragment>
          );
        })}
        {overId && !formData.map((item: any) => item.id).includes(overId) && (
          <Placeholder />
        )}
      </SortableContext>
    </>
  );
};

const QuestionItem = ({ form, question, renderField }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: question.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={clsx(
        `flex bg-white px-3 pb-7 pt-5 rounded relative`,
        isDragging ? `shadow-lg z-50` : "shadow z-0"
      )}
    >
      <div {...listeners} className="mr-3 mt-1">
        <RxDragHandleDots2 />
      </div>
      <FormField
        control={form.control}
        name={question.reference}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{question.label}</FormLabel>
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
    </div>
  );
};

export default FormBuilder;
