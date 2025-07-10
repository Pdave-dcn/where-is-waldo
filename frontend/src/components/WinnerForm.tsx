import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WinnerFormProps {
  secondsTakenRef: React.RefObject<number | null>;
}

const WinnerForm = ({ secondsTakenRef }: WinnerFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      console.log(name);
      console.log(secondsTakenRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  if (!secondsTakenRef.current) {
    return;
  }

  return (
    <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-gray-600 text-lg">
            You found both Waldo and Odlaw in{" "}
            <span className="font-bold text-green-600">
              {formatTime(secondsTakenRef.current)}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="playerName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your name to save your score:
            </label>
            <Input
              id="playerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full"
              maxLength={20}
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!name.trim()}
            >
              Save Score
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Skip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WinnerForm;
