"use client";
import { useForm } from "react-hook-form";
import FormQuestions from "./components/form-questions";

const FormBuilder = () => {
  const form = useForm();

  return (
    <div className="w-[80%] rounded-lg p-8 bg-white border my-6">
      <div className="space-y-0">
        <FormQuestions form={form} />
      </div>
    </div>
  );
};

export default FormBuilder;
