"use client";
import FormQuestions from "./components/form-questions";

const FormBuilder = () => {
  return (
    <div className="w-[80%] rounded-lg p-8 bg-white border my-6 h-fit min-h-[92%] ">
      <div className="space-y-0">
        <FormQuestions  />
      </div>
    </div>
  );
};

export default FormBuilder;
