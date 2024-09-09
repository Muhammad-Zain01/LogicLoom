import React, { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPickerProps {
  id: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ id }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>("🙃");

  useEffect(() => {
    const storedEmoji = localStorage.getItem(`emojiPicker-${id}`);
    if (storedEmoji) {
      setSelectedEmoji(storedEmoji);
    }
  }, [id]);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    localStorage.setItem(`emojiPicker-${id}`, emoji.native);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="text-6xl cursor-pointer">
            {selectedEmoji || '🙃'}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
