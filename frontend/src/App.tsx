import Index from "./pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import { GameDataProvider } from "./contexts/GameDataProvider";
import LeaderboardPage from "./pages/LeaderboardPage";

const App = () => {
  return (
    <GameDataProvider>
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GameDataProvider>
  );
};

export default App;
