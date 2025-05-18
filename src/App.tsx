
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FinancialReport from "./pages/FinancialReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<NotFound />} />
          <Route path="/plan/new" element={<NotFound />} />
          <Route path="/reports" element={<NotFound />} />
          <Route path="/calendar" element={<NotFound />} />
          <Route path="/crops" element={<NotFound />} />
          <Route path="/finances" element={<NotFound />} />
          <Route path="/loans" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          <Route path="/help" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/financial-report" element={<FinancialReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
