import { Trophy, ArrowLeftCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getRankIcon } from "@/utils/leaderboardUtils";
import { useLeaderboardQuery } from "@/queries/leaderboard.query";
import { GameActions } from "@/services/gameActions.service";
import { LeaderboardSkeleton } from "@/components/Leaderboard/LeaderboardSkeleton";
import { LeaderboardError } from "@/components/Leaderboard/LeaderboardError";
import { formatTime } from "@/utils/formatTime.util";
import { useSingleImageQuery } from "@/queries/image.query";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { id: imageId } = useParams();

  const {
    data: leaderboardData,
    isLoading: leaderboardLoading,
    isError: leaderboardError,
    refetch: refetchLeaderboard,
  } = useLeaderboardQuery(imageId || "");

  const { data: singleImageData } = useSingleImageQuery(imageId || "");

  const resetGame = () => {
    GameActions.resetGame();
    navigate("/");
  };

  if (leaderboardLoading) return <LeaderboardSkeleton />;

  if (leaderboardError)
    return <LeaderboardError onRetry={() => refetchLeaderboard()} />;

  if (!leaderboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-3xl text-gray-700">
          No leaderboard data found for this image.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5, transition: { duration: 0.2 } }}
        >
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-lg text-primary hover:text-primary-dark cursor-pointer"
            onClick={resetGame}
          >
            <ArrowLeftCircle className="w-6 h-6" />
            Back to Image Selection
          </Button>
        </motion.div>

        {/* Game Image Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <CardTitle className="text-center text-3xl font-bold">
                  Leaderboard for: {singleImageData?.name}
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  {singleImageData?.description}
                </p>
              </motion.div>
            </CardHeader>
            <CardContent className="p-0">
              <motion.div
                className="relative aspect-video w-full overflow-hidden"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: "easeOut",
                }}
              >
                <img
                  src={singleImageData?.url}
                  alt={singleImageData?.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl">
                <Trophy className="w-8 h-8 text-yellow-500" /> Top Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboardData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-xl font-semibold mb-2">
                    No scores yet for this image!
                  </p>
                  <p className="text-lg">Be the first to set a record!</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20 text-center">Rank</TableHead>
                      <TableHead>Player Name</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((entry, index) => (
                      <motion.tr
                        key={entry.id}
                        className={
                          index < 3 ? "bg-yellow-50 dark:bg-accent" : ""
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <TableCell className="flex items-center justify-center py-3">
                          {getRankIcon(index + 1)}
                        </TableCell>
                        <TableCell className="font-medium text-lg">
                          {entry.playerName}
                        </TableCell>
                        <TableCell className="font-mono text-green-600 font-semibold text-lg">
                          {formatTime(entry.timeTakenSeconds)}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-base">
                          {new Date(entry.completedAt).toLocaleDateString()}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
