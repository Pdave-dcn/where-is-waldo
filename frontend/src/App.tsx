import Index from "./pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import { GameDataProvider } from "./contexts/GameDataProvider";
import LeaderboardPage from "./pages/LeaderboardPage";
import { GameProgressProvider } from "./contexts/GameProgressProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

const App = () => {
  return (
    <GameDataProvider>
      <GameProgressProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Toaster position="top-center" richColors />
            <div className="relative">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <div className="fixed bottom-4 right-4 z-50">
                <ThemeToggle />
              </div>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </GameProgressProvider>
    </GameDataProvider>
  );
};

export default App;
