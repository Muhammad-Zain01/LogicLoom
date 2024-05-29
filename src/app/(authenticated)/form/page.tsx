"use client";

import { useState } from "react";
import SingleLine from "./fields/single-line";

const FormPage = () => {
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow a drop
    setDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const data = e.dataTransfer.getData("application/field-type");
    setForm((prev) => [...prev, data]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    console.log("enter", e);
  };

  const handleDragLeave = (e) => {
    setDragging(false);
    console.log("leave", e);
  };
  console.log(form);
  return (
    <div>
      <div
        className={`w-full flex h-64 items-center justify-center rounded-lg border-4 border-dashed ${
          dragging ? "border-gray-400" : "border-gray-300"
        } bg-white p-6 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-700 ${
          dragging ? "dark:hover:border-gray-600" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Drop fields here
        </h3>
      </div>
      {form.map((item) => {
        return <SingleLine key={item} />;
      })}
    </div>
  );
};

export default FormPage;
