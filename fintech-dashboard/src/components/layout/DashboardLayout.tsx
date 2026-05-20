import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { HelpBanner } from './HelpBanner';

export function DashboardLayout() {
  return (
    <motion.div className="min-h-screen mesh-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-64 min-h-screen">
        <motion.div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
          <HelpBanner />
          <Outlet />
        </motion.div>
      </main>
    </motion.div>
  );
}
