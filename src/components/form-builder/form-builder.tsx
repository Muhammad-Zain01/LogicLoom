"use client";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormQuestions from "./components/form-questions";

const FormBuilder = () => {
  const form = useForm();

  return (
    <div className="w-[80%] rounded-lg p-8 bg-white border my-6">
      <Form {...form}>
        <form className="space-y-0">
          <FormQuestions form={form} />
        </form>
      </Form>
    </div>
  );
};

export default FormBuilder;
