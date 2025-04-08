"use client";
import GithubButton from "@/components/form-builder/components/github-button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-gray-100 ">
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Logic Loom.</h1>
          </div>
          <GithubButton />
        </div>
      </header>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono  text-sm lg:flex">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-8 ">
          <div
            className="bg-white cursor-pointer rounded-2xl border border-solid border-gray-300  p-8 flex-1 transition-all hover:border-gray-400 hover:shadow-[0px_2px_8px_1px_rgba(0,0,0,0.08)]"
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
            className="bg-white rounded-2xl cursor-pointer border border-solid border-gray-300  p-8 flex-1 transition-all hover:border-gray-400 hover:shadow-[0px_2px_8px_1px_rgba(0,0,0,0.08)]"
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


      <footer className="py-3  w-full mt-6 text-center text-gray-400">
        <p>   Copyright {new Date().getFullYear()}. All rights reserved by{" "}
          <a href="https://github.com/Muhammad-Zain01">
            <strong className="ml-1 underline">Muhammad Zain</strong>
          </a>
          .</p>
      </footer>

    </main>
  );
}
