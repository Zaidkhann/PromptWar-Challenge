import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Vote, ChevronDown } from 'lucide-react';

const Timeline = lazy(() => import('./components/Timeline'));
const Checklist = lazy(() => import('./components/Checklist'));
const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
import './index.css';

const App = () => {
  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col md:flex-row overflow-hidden text-white font-sans">
      
      {/* Mobile Nav */}
      <nav className="md:hidden fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Vote className="text-white w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">VANGUARD</span>
          </div>
        </div>
      </nav>

      {/* LEFT PANE - AI Assistant */}
      <div className="w-full h-[60vh] md:h-full md:w-[45%] lg:w-[40%] flex-shrink-0 border-r border-white/5 order-2 md:order-1 pt-16 md:pt-0">
        <Suspense fallback={<div className="h-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <ChatAssistant />
        </Suspense>
      </div>

      {/* RIGHT PANE - Content */}
      <div className="flex-1 h-[40vh] md:h-full overflow-y-auto no-scrollbar order-1 md:order-2 pt-16 md:pt-0 bg-[#0a0a0f]">
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex sticky top-0 w-full z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 px-8 h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Vote className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">VANGUARD</span>
          </div>
          <a href="#readiness" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Check Readiness
          </a>
        </nav>

        <div className="px-6 md:px-12 pb-24">
          {/* Hero */}
          <header className="pt-12 md:pt-20 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
                Election 2026 Guide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                Understand the Election<br />Process in Minutes.
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                A simple guide to the Indian election lifecycle — from announcement to results. Use the AI Assistant to ask anything.
              </p>
              <a href="#timeline" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group">
                Explore the steps 
                <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </header>

          {/* Timeline Section */}
          <section id="timeline" className="py-12 border-t border-white/5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">The Process</h2>
              <Suspense fallback={<div className="animate-pulse bg-white/5 h-64 rounded-xl"></div>}>
                <Timeline />
              </Suspense>
            </div>
          </section>

          {/* Checklist Section */}
          <section id="readiness" className="py-12 border-t border-white/5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Voter Readiness</h2>
              <p className="text-zinc-400 text-lg mb-10">Make sure you&apos;re prepared for polling day.</p>
              <Suspense fallback={<div className="animate-pulse bg-white/5 h-64 rounded-xl"></div>}>
                <Checklist />
              </Suspense>
            </div>
          </section>
        </div>

      </div>

    </div>
  );
};

export default App;
