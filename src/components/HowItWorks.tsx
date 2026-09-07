import React from 'react';
import { CalendarCheck, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      stepNumber: '1',
      title: 'Book online or walk in',
      description: 'Use our easy online booking form or drop directly into our Eccles workshop. Walk-ins are always welcomed.',
      icon: CalendarCheck,
      color: 'bg-blue-600',
      badge: 'Immediate check-in',
    },
    {
      stepNumber: '2',
      title: 'We diagnose & fix',
      description: 'Our certified technicians run multi-point diagnostic checks and give an exact upfront quote. Most fixes completed in 30-45 minutes.',
      icon: Wrench,
      color: 'bg-indigo-600',
      badge: 'While you wait',
    },
    {
      stepNumber: '3',
      title: 'Collect & go',
      description: 'Pick up your revitalized device with full testing verified and our comprehensive 12-month guarantee. No fix? Zero charge.',
      icon: ShieldCheck,
      color: 'bg-emerald-600',
      badge: '12-Month Guarantee',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-[#0B0F17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Streamlined Process
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            How it works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Sorted in 3 simple steps — transparent, rapid, and completely hassle-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                {/* Step number watermark */}
                <span className="absolute top-4 right-5 text-4xl sm:text-5xl font-black font-display text-slate-800/40 select-none group-hover:text-blue-500/20 transition-colors">
                  0{step.stepNumber}
                </span>

                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-950/50`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx === 0 && (
                  <button
                    onClick={onOpenBooking}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 group/btn"
                  >
                    <span>Schedule now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
