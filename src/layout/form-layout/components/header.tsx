"use client";
import GithubButton from "@/components/form-builder/components/github-button";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFormStore } from "@/store/form";
import { useRouter } from "next/navigation";
import { CgFormatLineHeight } from "react-icons/cg";

const Header = () => {
  // @ts-ignore
  const { setEditable } = useFormStore();
  const router = useRouter();
  return (
    <header className="flex h-16 items-center w-full border-b bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex-1 border-b bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex bg-gray-100 items-center w-full h-16 p-3 gap-3">
          <CgFormatLineHeight size={18} />
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-gray-50">
            Form Builder
          </h2>
        </div>
      </div>
      <div className="flex items-center ">
       
        <Switch
          onCheckedChange={(e) => {
            setEditable(!e);
          }}
        />{" "}
        <span className="text-sm mx-3">Preview Mode</span>
      </div>
      <Button
        variant="outline"
        className="rounded-lg ml-3 text-gray-500"
        onClick={() => {
          router.push("flow");
        }}
      >
        Check Flow Builder
      </Button>
      <GithubButton />
    </header>
  );
};

export default Header;
