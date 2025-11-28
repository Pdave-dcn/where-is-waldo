import { createGameCompletion } from "@/api/completion.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompletionMutation = () => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
