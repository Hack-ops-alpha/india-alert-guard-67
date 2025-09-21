import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import AIChatbot from "./components/AIChatbot";
import Index from "./pages/Index";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } />
                  <Route path="/modules" element={
                    <ProtectedRoute>
                      <Modules />
                    </ProtectedRoute>
                  } />
                  <Route path="/quiz" element={
                    <ProtectedRoute>
                      <Quiz />
                    </ProtectedRoute>
                  } />
                  <Route path="/leaderboard" element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/community" element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              
              {/* AI Chatbot - only show when authenticated */}
              <ProtectedRoute>
                <AIChatbot 
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </ProtectedRoute>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
