import api from "./axios";

export const createGameCompletion = async (
  playerData: { timeTakenSeconds: number; playerName: string },
  selectedImageId: string
) => {
  try {
    const response = await api.post(
      `/image/${selectedImageId}/game-completion`,
      playerData
    );

    return response.data;
  } catch (error: unknown) {
    console.error("Error in creating new game completion:", error);
    throw error;
  }
};
