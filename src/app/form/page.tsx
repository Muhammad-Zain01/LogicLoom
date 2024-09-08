import dynamic from "next/dynamic";

const FormBuilder = dynamic(
  () => import("@/components/form-builder/form-builder"),
  {
    ssr: false,
  }
);

const FormViewPage = () => {
  return (
    <div className="flex justify-center bg-gray-100 h-full overflow-scroll">
      <FormBuilder />
    </div>
  );
};

export default FormViewPage;
