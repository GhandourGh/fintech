import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { OverviewPage } from './pages/OverviewPage';
import { ScorecardPage } from './pages/ScorecardPage';
import { WoePage } from './pages/WoePage';
import { ValidationPage } from './pages/ValidationPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { DecisionsPage } from './pages/DecisionsPage';
import { ExpectedLossPage } from './pages/ExpectedLossPage';
import { PricingPage } from './pages/PricingPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { ClientTestPage } from './pages/ClientTestPage';
import { PerformancePage } from './pages/PerformancePage';
import { FinalPage } from './pages/FinalPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="scorecard" element={<ScorecardPage />} />
            <Route path="woe" element={<WoePage />} />
            <Route path="validation" element={<ValidationPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="decisions" element={<DecisionsPage />} />
            <Route path="expected-loss" element={<ExpectedLossPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="explorer" element={<ExplorerPage />} />
            <Route path="test" element={<ClientTestPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="final" element={<FinalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
