import React, { useState } from 'react';
import { Clock, ShieldCheck, MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#0B0F17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why DialFix</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Why Choose DialFix?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            We combine local Manchester expertise with a commitment to quality you won't find at a standard high-street kiosk. Not a franchise, not a kiosk — real technicians who truly care about your digital life.
          </p>
        </div>

        {/* Real Repair Results Showcase */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold text-center mb-4">
            REAL REPAIR RESULTS · INTERACTIVE COMPARISON
          </div>

          {/* Interactive Before/After Card */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl aspect-[16/9] sm:aspect-[21/9] max-h-[440px]">
            {/* Split Comparison */}
            <div className="relative w-full h-full flex select-none">
              {/* Left Side: Before (Shattered display simulation & micro inspection) */}
              <div
                className="relative h-full overflow-hidden bg-slate-900 border-r-2 border-blue-500"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={ASSET_IMAGES.heroPoster}
                  alt="Damaged logic board and cracked assembly before repair"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-red-950/20 backdrop-brightness-90" />
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-red-900/90 text-red-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-red-700 shadow-md whitespace-nowrap">
                  <span className="sm:hidden">Before: Damaged</span>
                  <span className="hidden sm:inline">Before: Shattered / Corroded</span>
                </div>
              </div>

              {/* Right Side: After (Pristine repaired device) */}
              <div
                className="relative h-full overflow-hidden bg-slate-900 flex-1"
              >
                <img
                  src={ASSET_IMAGES.labMicroscope}
                  alt="Fully repaired pristine display in testing lab"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-950/10" />
                <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-900/90 text-emerald-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-700 shadow-md whitespace-nowrap">
                  <span className="sm:hidden">After: Restored ✓</span>
                  <span className="hidden sm:inline">After: OEM Restored ✓</span>
                </div>
              </div>

              {/* Interactive Draggable Slider Thumb */}
              <input
                type="range"
                min="10"
                max="90"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Drag to compare before and after repair"
              />

              {/* Slider Line Indicator */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-white to-blue-400 pointer-events-none z-20 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-black text-xs border-2 border-blue-500">
                  ↔
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Drag slider left or right to inspect clean OEM-grade restoration
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Same-Day Service</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Most repairs done in under an hour while you wait in our comfortable reception.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No Fix, No Fee</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                If we can't fix it, you pay nothing. Simple, risk-free diagnosis every time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Local Manchester Experts</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Based right on Liverpool Rd in Eccles — not a remote mailing depot, not an inexperienced kiosk.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button: "Book a Repair Today" */}
        <div className="text-center">
          <button
            id="why-us-book-repair-btn"
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all active:scale-95 group"
          >
            <span>Book a Repair Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
