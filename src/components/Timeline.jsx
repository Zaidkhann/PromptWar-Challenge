import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  FileText,
  Search,
  Megaphone,
  Layers,
  PieChart,
  Trophy,
  ChevronRight,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Schedule Announcement',
    date: 'T-60 Days',
    desc: 'Election Commission announces polling dates and phases across the country.',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Nomination Phase',
    date: 'T-45 Days',
    desc: 'Candidates file papers. Digital submission is now encouraged for transparency.',
    icon: FileText,
  },
  {
    id: 3,
    title: 'Scrutiny & Withdrawal',
    date: 'T-35 Days',
    desc: 'Verification of candidate eligibility and final list publication.',
    icon: Search,
  },
  {
    id: 4,
    title: 'Election Campaigning',
    date: 'T-30 Days',
    desc: 'Political rallies, manifestos, and public debates reach their peak.',
    icon: Megaphone,
  },
  {
    id: 5,
    title: 'Polling Day',
    date: 'The Big Day',
    desc: 'Millions head to booths. Finger inking and EVM voting takes place.',
    icon: Layers,
  },
  {
    id: 6,
    title: 'Counting of Votes',
    date: 'Post-Poll',
    desc: 'EVMs are unsealed and every vote is meticulously accounted for.',
    icon: PieChart,
  },
  {
    id: 7,
    title: 'Declaration of Results',
    date: 'Final Outcome',
    desc: 'The mandate of the people is revealed. New leadership begins.',
    icon: Trophy,
  },
];

/**
 * Timeline component displaying a sequential process with expandable descriptions.
 * @returns {JSX.Element} The rendered Timeline component.
 */
const Timeline = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isOpen = openId === step.id;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : step.id)}
              aria-expanded={isOpen}
              aria-controls={`timeline-desc-${step.id}`}
              className="w-full text-left p-4 rounded-xl bg-[#12121a] border border-white/5 hover:border-white/10 transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">{step.title}</span>
                    <span className="text-xs text-zinc-500 ml-2 shrink-0">{step.date}</span>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-zinc-600 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`timeline-desc-${step.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 ml-14">
                    <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default memo(Timeline);
