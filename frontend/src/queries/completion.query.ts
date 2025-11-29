import { createGameCompletion } from "@/api/completion.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCompletionMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      playerData,
      selectedImageId,
    }: {
      playerData: { timeTakenSeconds: number; playerName: string };
      selectedImageId: string;
    }) => {
      createGameCompletion(playerData, selectedImageId);

      return { selectedImageId };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data, _vars, _context) => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      navigate(`/leaderboard/${data.selectedImageId}`);
    },
  });
};
