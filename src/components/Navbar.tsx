import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ShoppingBag, Menu, X, MapPin, Clock, MessageSquare, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { TopBar } from './TopBar';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenBooking, onGoHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero', action: onGoHome },
    { label: 'Repairs', href: '#services', action: onGoHome },
    { label: 'Shop Mobiles', href: '#products', action: onGoHome },
    { label: 'How It Works', href: '#how-it-works', action: onGoHome },
    { label: 'FAQ', href: '#faq', action: onGoHome },
  ];

  const handleLinkClick = (action?: () => void) => {
    setMobileMenuOpen(false);
    if (action) {
      action();
    }
  };

  return (
    <>
      <header
        id="main-navigation-bar"
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      >
        {/* Top Bar - Desktop Only */}
        <TopBar />

        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
              : 'bg-gradient-to-b from-[#0B0F17]/95 via-[#0B0F17]/70 to-transparent py-3 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={() => onGoHome && onGoHome()}
              id="brand-logo-link"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* Circuit trace background */}
                <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:6px_6px] opacity-30" />
                <div className="relative flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 text-xl font-display">
                  D
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block ml-0.5 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  DIAL<span className="text-blue-500">FIX</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-blue-950 text-blue-300 border border-blue-800/60 rounded">
                  Eccles
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-wider -mt-1 hidden sm:block">
                Phone & Laptop Specialists
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => link.action && link.action()}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* DialFix Chat Bot Quick Launcher */}
            <button
              id="header-chatbot-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('open-dialfix-chatbot'))}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-blue-500/40 hover:border-blue-400 rounded-full transition-all shadow-sm"
              title="Chat with DialFix Chat Bot"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="hidden xl:inline">Chat Bot</span>
            </button>

            {/* Cart Icon */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 rounded-full transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-blue-600 rounded-full border-2 border-[#0B0F17] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Your Appointment CTA with distinct border styling */}
            <button
              id="header-book-appointment-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-red-600/15 hover:bg-red-600 border border-red-500 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all active:scale-95 group"
            >
              <Calendar className="w-3.5 h-3.5 text-red-400 group-hover:text-white transition-colors" />
              <span>Book Your Appointment</span>
            </button>
          </div>

          {/* Mobile Right Controls: Book, Cart & Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-header-book-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold text-white bg-red-600/20 hover:bg-red-600 border border-red-500 rounded-full transition-all active:scale-95"
            >
              <Calendar className="w-3 h-3 text-red-400" />
              <span>Book</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-full"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 bg-slate-900 border border-slate-700/80 rounded-xl hover:text-white focus:outline-none"
              aria-label="Open navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Slide-Out Drawer */}
      <div
        id="mobile-offcanvas-drawer"
        className={`fixed inset-0 z-50 transition-visibility duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-out Drawer Menu */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-[#0E131F] border-l border-slate-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black font-display text-sm">
                D
              </div>
              <span className="font-display font-bold text-lg text-white">
                DIAL<span className="text-blue-500">FIX</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="px-5 py-6 overflow-y-auto flex-1 space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-2 mb-3">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.action)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}

            <div className="pt-5 mt-5 border-t border-slate-800/80 space-y-3">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-2">
                Quick Actions
              </p>
              
              {/* Book a Repair Appointment */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-md shadow-blue-600/30 active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Repair Appointment</span>
              </button>

              {/* DialFix Chat Bot button in mobile drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-dialfix-chatbot'));
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-blue-500/40 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>DialFix Chat Bot (Instant Answers)</span>
              </button>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer Information */}
          <div className="p-5 border-t border-slate-800 bg-[#0B0F17]/80 text-xs text-slate-400 space-y-2.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <a
                href={BUSINESS_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                530 Liverpool Rd, Peel Green, Eccles, Manchester M30 7JA
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 7:15 PM</span>
            </div>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>5.0★ Google Rated (170 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
