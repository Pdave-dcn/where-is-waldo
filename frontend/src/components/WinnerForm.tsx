import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameData } from "@/hooks/use-GameData";

interface WinnerFormProps {
  secondsTaken: number | null;
}

const WinnerForm = ({ secondsTaken }: WinnerFormProps) => {
  const [name, setName] = useState("");
  const { createGameCompletion } = useGameData();

  const navigate = useNavigate();

  if (!secondsTaken) return;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secondsTaken) {
      createGameCompletion(secondsTaken, name);
      navigate("/leaderboard");
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  if (!secondsTaken) {
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
              {formatTime(secondsTaken)}
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
              className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
              disabled={!name.trim()}
              onClick={() => handleSubmit}
            >
              Save Score
            </Button>
            <Button
              type="submit"
              variant="outline"
              onClick={() => handleSubmit}
              className="flex-1 cursor-pointer"
            >
              Skip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WinnerForm;
