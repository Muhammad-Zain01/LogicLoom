import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiSettings } from "react-icons/ci";

const CountdownTimer = ({ id }: { id: string }) => {
  const countDownId = `${id}|countdown`;
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(countDownId);
    return savedTime ? parseInt(savedTime) : 300; // 5 minutes in seconds if no saved time
  });
  const [isRunning, setIsRunning] = useState(false);
  const [editTime, setEditTime] = useState(() => Math.floor(time / 60)); // Initial time in minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem(countDownId, newTime.toString());
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, countDownId]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    const newTime = editTime * 60;
    setTime(newTime);
    localStorage.setItem(countDownId, newTime.toString());
    setIsRunning(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    if (!isNaN(newTime) && newTime > 0) {
      setEditTime(newTime);
    }
  };

  const applyNewTime = () => {
    const newTime = editTime * 60;
    setTime(newTime);
    localStorage.setItem(countDownId, newTime.toString());
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full mx-auto relative  h-full flex items-center flex-col justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-6xl font-bold">{formatTime(time)}</div>
        <div className="flex space-x-2">
          <Button
            onClick={toggleTimer}
            variant={isRunning ? "destructive" : "default"}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} variant="secondary">
            Reset
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-2 absolute top-0 right-0">
                <CiSettings size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Edit Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the countdown time in minutes
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Input
                      type="number"
                      value={editTime}
                      onChange={handleTimeChange}
                      min="1"
                    />
                    <span className="col-span-2">minutes</span>
                  </div>
                  <Button onClick={applyNewTime}>Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
