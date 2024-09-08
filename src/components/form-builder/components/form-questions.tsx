'use client'
import { useFormStore } from "@/store/form";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";
import QuestionItem from "./question-item";
import { PlaceHolder } from "./placeholder";
import Lottie from "lottie-react";
import animation from "@/assets/animation";
type ComponentProps = {
  form: UseFormReturn<any> | null;
};

const FormQuestions: React.FC<ComponentProps> = ({ form }) => {
  const formData = useFormStore((state) => state.form);

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
  );
};

export default FormQuestions;
