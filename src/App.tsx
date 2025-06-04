
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Public pages
import MarketingLanding from "./pages/MarketingLanding";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Employee pages
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/Dashboard";
import BenefitCatalog from "./pages/employee/BenefitCatalog";
import PointsAllocator from "./pages/employee/PointsAllocator";
import UsageHistory from "./pages/employee/UsageHistory";
import SupportTickets from "./pages/employee/SupportTickets";
import EmployeeSettings from "./pages/employee/Settings";

// HR pages
import HrLayout from "./pages/hr/HrLayout";
import HrOverview from "./pages/hr/Dashboard";
import EmployeeTable from "./pages/hr/EmployeeTable";
import BenefitConfig from "./pages/hr/BenefitConfig";
import DataImport from "./pages/hr/DataImport";
import Analytics from "./pages/hr/Analytics";
import AiInsights from "./pages/hr/AiInsights";
import HrSettings from "./pages/hr/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MarketingLanding />} />
            <Route path="/login" element={<Auth />} />
            
            {/* Employee routes */}
            <Route path="/employee" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/employee/dashboard" replace />} />
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="catalog" element={<BenefitCatalog />} />
              <Route path="allocate" element={<PointsAllocator />} />
              <Route path="history" element={<UsageHistory />} />
              <Route path="support" element={<SupportTickets />} />
              <Route path="settings" element={<EmployeeSettings />} />
            </Route>
            
            {/* HR routes */}
            <Route path="/hr" element={
              <ProtectedRoute allowedRoles={['hr']}>
                <HrLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="dashboard" element={<HrOverview />} />
              <Route path="employees" element={<EmployeeTable />} />
              <Route path="benefit-config" element={<BenefitConfig />} />
              <Route path="upload" element={<DataImport />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="recommendations" element={<AiInsights />} />
              <Route path="settings" element={<HrSettings />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
