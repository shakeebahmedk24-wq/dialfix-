import React from 'react';
import { MapPin, Clock, Phone, Navigation, Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export const FindUsSection: React.FC = () => {
  return (
    <section id="location" className="py-14 sm:py-20 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Find us
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Conveniently located in Eccles on Liverpool Road. Free parking nearby.
          </p>
        </div>

        {/* The prominent Find Us Card matching screenshot design with enhanced precision styling */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle circuit backdrop accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Information items */}
            <div className="lg:col-span-7 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                    Address
                  </span>
                  <a
                    id="findus-address-link"
                    href={BUSINESS_INFO.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>{BUSINESS_INFO.address}</span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Google Maps Plus Code: <span className="text-slate-300 font-mono">{BUSINESS_INFO.plusCode}</span>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Opening Hours
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-white">
                    {BUSINESS_INFO.hours.weekdays}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {BUSINESS_INFO.hours.sunday}
                  </p>
                </div>
              </div>

              {/* Community Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span>LGBTQ+ friendly</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Free Diagnostic Check</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Steps from Peel Green bus stops</span>
                </span>
              </div>
            </div>

            {/* Right side: Action buttons & Interactive Map trigger */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-4">
              {/* Big Blue Call Button (Matching screenshot) */}
              <a
                id="findus-call-btn"
                href={BUSINESS_INFO.phoneTel}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 transition-all active:scale-98"
              >
                <Phone className="w-5 h-5" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              {/* Directions Button */}
              <a
                id="findus-directions-btn"
                href={BUSINESS_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all group"
              >
                <Navigation className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
                <span>Open Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              {/* Map embed preview card */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Shop Open Now in Eccles</span>
                </span>
                <a
                  href={BUSINESS_INFO.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View on Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
