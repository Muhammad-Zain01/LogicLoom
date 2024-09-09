import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

const APITest = ({ id }: { id: string }) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(`apiTest-${id}`);
    if (storedData) {
      const { url, method, headers, body } = JSON.parse(storedData);
      setUrl(url);
      setMethod(method);
      setHeaders(headers);
      setBody(body);
    }
  }, [id]);

  const saveToLocalStorage = () => {
    const dataToSave = { url, method, headers, body };
    localStorage.setItem(`apiTest-${id}`, JSON.stringify(dataToSave));
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const parsedHeaders = JSON.parse(headers);
      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== "GET" && method !== "HEAD") {
        options.body = body;
      }

      const res = await fetch(url, options);
      const responseData = await res.text();

      setResponse(responseData);
      saveToLocalStorage();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 space-y-4">
      <div>
        <Label htmlFor={`api-url-${id}`}>API URL</Label>
        <Input
          id={`api-url-${id}`}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            saveToLocalStorage();
          }}
          placeholder="Enter API URL"
        />
      </div>
      <div>
        <Label htmlFor={`api-method-${id}`}>Method</Label>
        <Select 
          value={method} 
          onValueChange={(value) => {
            setMethod(value);
            saveToLocalStorage();
          }}
        >
          <SelectTrigger id={`api-method-${id}`}>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`api-headers-${id}`}>Headers (JSON)</Label>
        <CodeMirror
          value={headers}
          height="100px"
          extensions={[json()]}
          onChange={(value) => {
            setHeaders(value);
            saveToLocalStorage();
          }}
          theme="dark"
          className="border rounded-md"
        />
      </div>
      <div>
        <Label htmlFor={`api-body-${id}`}>Body</Label>
        <CodeMirror
          value={body}
          height="100px"
          extensions={[json()]}
          onChange={(value) => {
            setBody(value);
            saveToLocalStorage();
          }}
          theme="dark"
          className="border rounded-md"
        />
      </div>
      <Button onClick={handleSendRequest} disabled={loading}>
        {loading ? "Sending..." : "Send Request"}
      </Button>
      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded">
          Error: {error}
        </div>
      )}
      {response ? (
        <div>
          <Label>Response</Label>
          <CodeMirror
            value={response}
            height="300px"
            extensions={[json()]}
            readOnly={true}
            theme="dark"
            className="border rounded-md"
          />
        </div>
      ) : (
        <div className="text-center my-5 text-gray-500 text-xs">No Response Found</div>
      )}
    </div>
  );
};

export default APITest;
