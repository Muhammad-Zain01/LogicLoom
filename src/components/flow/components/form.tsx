"use client";
import React, { useEffect, useState } from "react";
import { useFormStore } from "@/store/form";
import QuestionItem from "@/components/form-builder/components/question-item";
import { FormItem as FormItemType } from "@/types/form";
import { Button } from "@/components/ui/button";
import { isValidJSON } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FormViewModal = ({
  formValues,
  formData,
  setIsModalOpen,
}: {
  formValues: Record<string, any>;
  formData: any;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 m-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Form Results</h2>
        {Object.entries(formValues).map(([id, value]) => {
          const form = formData?.find((item: any) => item.id == id);
          if (form) {
            const parsedValue = isValidJSON(value);
            if (form?.is_form_item) {
              return (
                <p key={id} className=" flex my-2">
                  <strong className="min-w-[120px] ">{form?.label}:</strong>{" "}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: parsedValue
                        ? parsedValue?.join(", ")
                        : value
                        ? String(value)
                        : "-",
                    }}
                  ></p>
                </p>
              );
            }
          }
        })}
        <Button onClick={() => setIsModalOpen(false)} className="mt-4">
          Close
        </Button>
      </div>
    </div>
  );
};

const FormComponent = () => {
  const formData = useFormStore((state) => state.form);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const router = useRouter();
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      useFormStore.getState().setForm(JSON.parse(savedFormData));
    }
  }, []);

  const calculateFormValues = () => {
    const values = formData.reduce<Record<string, any>>((acc, question) => {
      if (question.answer !== undefined) {
        acc[question.id] = question.answer;
      }
      return acc;
    }, {});
    setFormValues(values);
    setIsModalOpen(true);
  };

  if (!formData || !formData?.length) {
    return (
      <div>
        <Button
          onClick={() => {
            router.push("/form");
          }}
        >
          Create Form
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-2 flex justify-between flex-col w-full h-full p-5">
      <div>
        {formData.map((question: FormItemType) => (
          <QuestionItem key={question.id} question={question} viewOnly={true} />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={calculateFormValues}>Submit</Button>
      </div>
      {isModalOpen && (
        <FormViewModal
          formValues={formValues}
          formData={formData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default FormComponent;
