import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMic, MdStop } from "react-icons/md";

const MusicPlayer = ({ id }: { id: string }) => {
  const [isRecording, setIsRecording] = useState(false);
  const audioId = `${id}|audio`;
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const savedAudio = localStorage.getItem(audioId);
    if (savedAudio) {
      setAudioURL(savedAudio);
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        localStorage.setItem(audioId, audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center">
        {isRecording ? (
          <Button
            variant="destructive"
            onClick={stopRecording}
            className="flex items-center space-x-2"
          >
            <MdStop className="w-5 h-5" />
            <span>Stop Recording</span>
          </Button>
        ) : (
          <Button
            onClick={startRecording}
            className="flex items-center space-x-2"
          >
            <MdMic className="w-5 h-5" />
            <span>Start Recording</span>
          </Button>
        )}
      </div>
      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
