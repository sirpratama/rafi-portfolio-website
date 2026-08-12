import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
