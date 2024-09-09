"use client";
import { useFormStore } from "@/store/form";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment, useEffect } from "react";
import QuestionItem from "./question-item";
import { PlaceHolder } from "./placeholder";
import Lottie from "lottie-react";
import animation from "@/assets/animation";
import { Button } from "@/components/ui/button";

const FormQuestions = () => {
  const formData = useFormStore((state) => state.form);
  const setFormData = useFormStore((state) => state.setForm);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    } else {
      setFormData([]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (formData && formData.length > 0) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  if (formData && !formData.length) {
    return (
      <div className="flex flex-col">
        <PlaceHolder
          id="initial"
          isInitial
          InitialRender={
            <div>
              <div className="flex mt-10 items-center justify-center flex-col">
                <Lottie
                  animationData={animation.thinking}
                  loop={true}
                  className="w-[400px]"
                />
              </div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setFormData([]);
          }}
        >
          Reset
        </Button>
      </div>
      <SortableContext items={formData} strategy={verticalListSortingStrategy}>
        {formData.map((item: any, index: number) => {
          return (
            <Fragment key={item.id}>
              {index == 0 && <PlaceHolder id={item.id} isTop={true} />}
              <QuestionItem question={item} />
              {<PlaceHolder id={item.id} isTop={false} />}
            </Fragment>
          );
        })}
      </SortableContext>
    </>
  );
};

export default FormQuestions;
