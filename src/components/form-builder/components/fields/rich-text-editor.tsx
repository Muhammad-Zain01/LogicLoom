import { FormItem } from "@/types/form";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const RichTextEditor: React.FC<ComponentProps> = ({ question, onChange }) => {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (question.answer) {
      setEditorContent(question.answer);
    }
  }, [question.answer]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    onChange(content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="space-y-2 pb-5">
      {question.description && (
        <p className="text-sm text-gray-500">{question.description}</p>
      )}
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder={question.placeholder || "Enter your text here..."}
        className="bg-white h-[200px] shadow-none border-none"
      />
    </div>
  );
};

export default RichTextEditor;
