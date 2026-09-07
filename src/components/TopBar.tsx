import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export const TopBar: React.FC = () => {
  return (
    <div
      id="desktop-top-bar"
      className="hidden md:block bg-[#070A12] border-b border-slate-800/80 text-xs text-slate-300 relative z-50 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Location & Address */}
          <div className="flex items-center gap-6">
            {/* Location */}
            <div className="flex items-center gap-2 text-slate-300">
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/50">
                <MapPin className="w-3 h-3" />
              </span>
              <span className="font-medium">
                Location:{' '}
                <strong className="text-white font-semibold">
                  Eccles, Manchester
                </strong>
              </span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Address with Google Maps link */}
            <a
              id="topbar-address-link"
              href={BUSINESS_INFO.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors group"
              title="Open directions in Google Maps"
            >
              <Navigation className="w-3 h-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span>
                Address:{' '}
                <span className="text-slate-200 group-hover:text-blue-300 group-hover:underline">
                  530 Liverpool Rd, Eccles, M30 7JA
                </span>
              </span>
            </a>
          </div>

          {/* Right: Operating Hours & Direct Phone Call */}
          <div className="flex items-center gap-6">
            {/* Operating Hours */}
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>
                <strong className="text-slate-300 font-medium">Mon–Sat: 9:00 AM – 7:15 PM</strong>
              </span>
            </div>

            <span className="hidden lg:inline text-slate-700">|</span>

            {/* Phone Number (Tap to Call) */}
            <a
              id="topbar-phone-link"
              href={BUSINESS_INFO.phoneTel}
              className="flex items-center gap-2 font-semibold text-slate-200 hover:text-white group"
              title="Call Dialfix now"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Phone className="w-3 h-3 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-slate-300">Phone:</span>
              <span className="text-blue-400 font-bold tracking-wide group-hover:text-blue-300 group-hover:underline">
                {BUSINESS_INFO.phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
