import React from 'react';
import { Smartphone, Laptop, ShieldCheck, Clock, Star, Droplets, Cpu, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesDetailedProps {
  onOpenBooking: () => void;
}

export const ServicesDetailed: React.FC<ServicesDetailedProps> = ({ onOpenBooking }) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#090D15] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Master Technician Expertise</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            OUR SERVICES
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Component-level diagnostics and certified micro-repairs in Manchester with genuine 12-month warranties.
          </p>
        </div>

        {/* Two Major Service Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Professional Phone Repair */}
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-semibold border border-blue-800/60 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Trusted in Manchester</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                Professional Phone Repair
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                At Dialfix, we don't just swap parts — we restore factory performance. Whether it's a shattered screen or a failing battery, our lab is equipped for advanced diagnostics, liquid damage recovery, and logic board microsoldering.
              </p>

              {/* Specific breakdown rows */}
              <div className="space-y-3 mb-8">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Screen & Display Repair</h4>
                    <p className="text-xs text-slate-400 mt-0.5">OEM-grade panels for iPhone, Samsung, Google Pixel, and all Android devices.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-cyan-600/20 text-cyan-400 shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Liquid Damage Recovery</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Full board-level diagnostics — free assessment, same-day ultrasonic treatment.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Logic Board Microsoldering</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Component-level repair for complex power faults and short circuits most shops won't touch.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Triad (5★ Google Rating, 1hr Avg. Repair Time, 12m Warranty) */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
              <div className="p-2 sm:p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                <div className="font-display font-black text-lg sm:text-2xl text-amber-400 flex items-center justify-center gap-1">
                  <span>5</span>
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 leading-tight">Google Rating</span>
              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                <div className="font-display font-black text-lg sm:text-2xl text-emerald-400">
                  1 hr
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 leading-tight">Avg. Repair Time</span>
              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                <div className="font-display font-black text-lg sm:text-2xl text-blue-400">
                  12m
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 leading-tight">Warranty Included</span>
              </div>
            </div>
          </div>

          {/* Card 2: Laptop & Mac Specialists */}
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 mb-4">
                <Laptop className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mac & Windows</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                Laptop & Mac Specialists
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                A slow laptop shouldn't cost you a day's work. Our technicians are experts in hardware upgrades (SSD & RAM) and complex software troubleshooting. From broken hinges to overheating issues, we provide a cost-effective alternative to buying new.
              </p>

              {/* Specific breakdown rows */}
              <div className="space-y-3 mb-8">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Screen & Hinge Repair</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Cracked displays and broken hinges fixed — MacBook Air/Pro, ThinkPad, Dell, HP.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">SSD & RAM Upgrades</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Breathe new life into a slow machine — lightning-fast NVMe boot speeds and expanded memory.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Overheating & Software Fixes</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Thermal paste reapplication, fan replacement, OS reinstall, and virus removal — same day where possible.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Repair CTA Button */}
            <div className="pt-6 border-t border-slate-800">
              <button
                id="book-laptop-repair-btn"
                onClick={onOpenBooking}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 transition-all active:scale-98 group"
              >
                <Laptop className="w-4 h-4" />
                <span>Book a Laptop Repair</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
