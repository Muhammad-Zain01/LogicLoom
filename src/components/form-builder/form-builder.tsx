"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormQuestions from "./components/form-questions";

const FormBuilder = () => {
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
    <div className="w-[80%] rounded-lg p-8 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormQuestions form={form} />
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

export default FormBuilder;
