import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const Text = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full flex items-center justify-center"
    >
      {isEditing ? (
        <Textarea
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="ring-0 border-none focus-visible:ring-0 focus-within:ring-0 focus-within:shadow-none focus-within:border-none flex items-center justify-center text-center resize-none"
        />
      ) : (
        <span className=" text-wrap text-center">{text || 'Click to Edit'}</span>
      )}
    </div>
  );
};
export default Text;
