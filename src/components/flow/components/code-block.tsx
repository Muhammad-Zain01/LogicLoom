import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeBlock = ({ id }: { id: string }) => {
  const [actionCode, setActionCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedActionCode = localStorage.getItem(`actionCode-${id}`);
    if (storedActionCode) setActionCode(storedActionCode);
  }, [id]);

  const handleActionCodeChange = (value: string) => {
    setActionCode(value);
    localStorage.setItem(`actionCode-${id}`, value);
  };

  const handleRunAction = () => {
    try {
      const actionFunction = new Function(actionCode);
      actionFunction();
      setErrorMessage(null);
    } catch (error) {
      console.error("Error running custom action:", error);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 space-y-4">
      <div className="flex-grow">
        <Label htmlFor={`action-code-${id}`}>Action Code</Label>
        {errorMessage && (
          <div className="text-red-500 my-2 text-xs bg-red-100 p-2 rounded">
            Error: {errorMessage}
          </div>
        )}
        <CodeMirror
          value={actionCode}
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={handleActionCodeChange}
          theme="dark"
          className="border rounded-md"
        />
      </div>
      
      <Button onClick={handleRunAction} className="w-full">
        Run Action
      </Button>
    </div>
  );
};

export default CodeBlock;
