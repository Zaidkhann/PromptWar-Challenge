import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Check, UserCheck, CreditCard, MapPin, ShieldCheck } from 'lucide-react';

const items = [
  {
    id: 1,
    title: 'Voter Registration',
    desc: 'Check your name in the electoral roll on the NVSP portal.',
    icon: UserCheck,
  },
  {
    id: 2,
    title: 'Valid ID Proof',
    desc: 'Ensure you have your EPIC card or one of 12 alternate ID documents.',
    icon: CreditCard,
  },
  {
    id: 3,
    title: 'Locate Polling Station',
    desc: 'Confirm your assigned booth and part number before the day.',
    icon: MapPin,
  },
  {
    id: 4,
    title: 'Know Your Candidates',
    desc: 'Read affidavits of candidates contesting in your constituency.',
    icon: ShieldCheck,
  },
];

/**
 * Checklist component for tracking user readiness with interactive items.
 * @returns {JSX.Element} The rendered Checklist component.
 */
const Checklist = () => {
  const [done, setDone] = useState([]);

  const toggle = (id) => {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const progress = Math.round((done.length / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </div>
        <span className="text-sm font-semibold text-zinc-400 w-12 text-right">{progress}%</span>
      </div>

      {/* Items */}
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => {
          const checked = done.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              aria-pressed={checked}
              className={`text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                checked
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-[#12121a] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checked ? 'bg-emerald-500' : 'border border-zinc-700'
                  }`}
                >
                  {checked && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${checked ? 'text-emerald-400' : 'text-white'}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Checklist);
