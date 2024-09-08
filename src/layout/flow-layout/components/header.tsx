"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex h-16 px-6 items-center border-b bg-gray-100  dark:border-gray-800 dark:bg-gray-950">
      <div className="flex justify-end w-full">
        <Button
          variant="outline"
          className="rounded-lg text-gray-500"
          onClick={() => {
            router.push("form");
          }}
        >
          Check Form Builder
        </Button>
      </div>
    </header>
  );
};

export default Header;