"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 ">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono  text-sm lg:flex">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-8 ">
          <div
            className="bg-white cursor-pointer rounded-lg shadow-lg p-8 flex-1 transition-transform hover:scale-105"
            onClick={() => {
              router.push("form");
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Form Builder
            </h2>
            <p className="mb-4 text-gray-600">
              Create dynamic and interactive forms with ease.
            </p>
            <Image
              src="/forms.png"
              alt="Form Builder Illustration"
              width={300}
              height={200}
              className="mx-auto"
            />
          </div>
          <div
            className="bg-white rounded-lg cursor-pointer shadow-lg p-8 flex-1 transition-transform hover:scale-105"
            onClick={() => {
              router.push("flow");
            }}
          > 
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Flow Builder
            </h2>
            <p className="mb-4 text-gray-600">
              Design logical flows effortlessly.
            </p>
            <Image
              src="/flows.png"
              alt="Flow Builder Illustration"
              width={300}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
