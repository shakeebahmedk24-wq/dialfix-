import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Heart, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setName('');
      setContact('');
      setMessage('');
      setInquirySent(false);
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#070A10] border-t border-slate-800 text-slate-400 text-sm relative">
      {/* Quick Inquiry Form Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-slate-800/80">
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Fast Response</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Have a Quick Question?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Send our technician team a quick message. We reply within minutes during business hours with repair estimates and parts availability.
              </p>

              <div className="pt-2 space-y-2 text-xs">
                <p className="text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href={BUSINESS_INFO.phoneTel} className="hover:text-white transition-colors font-semibold">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </p>
                <p className="text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                    {BUSINESS_INFO.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Right side: Quick inquiry form */}
            <div className="lg:col-span-7">
              {inquirySent ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Inquiry Dispatched!</h4>
                  <p className="text-xs text-emerald-200">
                    Thank you! Malik or a member of the Dialfix team will contact you shortly on {contact || 'your provided number'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sandra"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone or Email
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 07365 206098"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Device & Repair Inquiry
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Tell us about the issue (e.g. iPhone 13 cracked screen, Samsung battery draining fast, liquid spill)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Quick Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black font-display text-sm">
                D
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                DIAL<span className="text-blue-500">FIX</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eccles and Greater Manchester's trusted destination for smartphone, iPad, and laptop component repairs, micro-soldering, and certified pre-owned tech.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span>Proudly LGBTQ+ Friendly</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Repair Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Screen & Display Replacement</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Lithium Battery Replacement</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Charging Port & Dock Repair</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Water & Liquid Damage Diagnostic</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Laptop Screen, RAM & SSD</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Logic Board Micro-Soldering</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Store */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Store Location
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a
                  href={BUSINESS_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.address}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={BUSINESS_INFO.phoneTel} className="hover:text-white transition-colors font-semibold">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">{BUSINESS_INFO.hours.weekdays}</p>
                  <p className="text-slate-400 text-[11px]">{BUSINESS_INFO.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Trust & Quick Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Direct Assistance
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Emergency repair inquiries or instant quotes available via WhatsApp.
            </p>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors mb-3 w-full justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={BUSINESS_INFO.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors w-full justify-center"
            >
              <span>Google Maps Directions</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dialfix (dialfix.co.uk). All rights reserved. 530 Liverpool Rd, Eccles, Manchester M30 7JA.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-white transition-colors">Back to Top ↑</a>
            <span>•</span>
            <a href={BUSINESS_INFO.googleMapsPlaceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Maps Profile</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
