import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, Clock, CheckCircle2, Star, Calendar, MessageSquare, ArrowRight, Sparkles, Wrench } from 'lucide-react';
import { BUSINESS_INFO, ASSET_IMAGES } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Parallax depths using motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Background slow layer (0.15 depth)
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '25%']);
  // Circuit mid-layer (0.35 depth)
  const circuitY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '40%']);
  // Foreground content subtle elevation
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  // Bespoke high-tech micro-soldering and glowing circuit board simulation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing digital electricity & micro-soldering spark pulses
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
      life: number;
    }

    interface CircuitLine {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      progress: number;
      speed: number;
      color: string;
    }

    const sparks: Spark[] = [];
    const lines: CircuitLine[] = [];

    // Pre-seed circuit grid lines
    const colors = ['#38BDF8', '#10B981', '#60A5FA', '#34D399'];
    for (let i = 0; i < 16; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const isHorizontal = Math.random() > 0.5;
      lines.push({
        x1: startX,
        y1: startY,
        x2: isHorizontal ? startX + (Math.random() * 200 - 100) : startX,
        y2: !isHorizontal ? startY + (Math.random() * 200 - 100) : startY,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.006,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw faint circuit traces
      ctx.lineWidth = 1;
      lines.forEach((line) => {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();

        // Traveling pulse along line
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;
        const curX = line.x1 + (line.x2 - line.x1) * line.progress;
        const curY = line.y1 + (line.y2 - line.y1) * line.progress;

        ctx.fillStyle = line.color;
        ctx.shadowColor = line.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curX, curY, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Micro-soldering precision focal point sparks around center-right
      if (frame % 8 === 0 && sparks.length < 35) {
        const focalX = width * 0.65 + (Math.random() * 60 - 30);
        const focalY = height * 0.45 + (Math.random() * 60 - 30);
        sparks.push({
          x: focalX,
          y: focalY,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2 - 0.6,
          alpha: 1,
          size: Math.random() * 2.5 + 0.8,
          color: Math.random() > 0.4 ? '#38BDF8' : '#34D399',
          life: 0.015 + Math.random() * 0.02,
        });
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.life;
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 sm:py-28 md:pt-36"
    >
      {/* LAYER 1: Parallax Deep Background with High-Res Cinematic Looping Video / Poster */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none select-none z-0"
      >
        {/* High quality poster with fallback video */}
        <img
          src={ASSET_IMAGES.heroPoster}
          alt="Precision micro-soldering and high-tech circuitry"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] scale-105 opacity-95 transition-opacity duration-500"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Cinematic dark gradients tuned so the hero image stands out clearly while preserving text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-[#0B0F17]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/45 via-transparent to-[#0B0F17]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </motion.div>

      {/* LAYER 2: Parallax Mid-layer Circuitry Simulation & Canvas Particles */}
      <motion.div
        style={{ y: circuitY }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <canvas ref={canvasRef} className="w-full h-full opacity-70" />
      </motion.div>

      {/* LAYER 3: Foreground Content Cards & Typographic Hierarchy */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge: 5-Star Rated · Same-Day Repairs */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-300 text-[11px] sm:text-xs md:text-sm font-semibold mb-6 sm:mb-8 shadow-xl shadow-blue-950/50 backdrop-blur-md animate-pulse-glow">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span>5-Star Rated · Same-Day Repairs</span>
          <span className="hidden xs:inline w-1 h-1 rounded-full bg-blue-400" />
          <span className="text-slate-300 font-normal">Eccles, Manchester</span>
        </div>

        {/* Main Striking Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.15] sm:leading-[1.1] mb-5 sm:mb-6">
          Phone Cracked? <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 drop-shadow-sm">
            We Fix It Today.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal mb-7 sm:mb-10 px-2">
          Expert iPhone, Samsung, Android & laptop repairs in Eccles, Manchester.{' '}
          <span className="text-white font-medium">Most fixes completed in under 45 minutes</span> with genuine OEM-grade components.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-14 w-full max-w-md sm:max-w-none mx-auto">
          {/* Book a Repair */}
          <button
            id="hero-book-repair-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all transform active:scale-95 group"
          >
            <Calendar className="w-5 h-5 text-blue-100" />
            <span>Book a Repair</span>
            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* WhatsApp Us Now */}
          <a
            id="hero-whatsapp-btn"
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all transform active:scale-95 group"
          >
            <MessageSquare className="w-5 h-5 text-emerald-100" />
            <span>WhatsApp Us Now</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200">12-Month Warranty</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200">Same-Day Service</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200">No Fix, No Fee</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200">5.0 Google (170)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
