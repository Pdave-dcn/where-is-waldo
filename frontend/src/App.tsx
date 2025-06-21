import Index from "./pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
