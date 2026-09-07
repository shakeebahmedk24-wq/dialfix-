import React from 'react';
import { Star, CheckCircle2, MessageSquareQuote, ShieldCheck, ExternalLink } from 'lucide-react';
import { VERBATIM_REVIEWS, BUSINESS_INFO } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#090D15] border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Google 5.0 badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Google Verified Reviews</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              What customers say
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Real feedback from local Manchester & Eccles device owners who trust Dialfix for urgent repairs.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0">
            <div className="text-center">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">5.0</span>
              <div className="flex items-center justify-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="text-xs">
              <p className="font-bold text-slate-200">170 Verified Reviews</p>
              <p className="text-slate-400">100% 5-Star Rating</p>
              <a
                href={BUSINESS_INFO.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 mt-0.5"
              >
                <span>Read on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop View: Grid of reviews */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {VERBATIM_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Rating stars & time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{review.timeAgo}</span>
                </div>

                {/* Highlight banner if present */}
                {review.highlight && (
                  <div className="mb-3 px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/30 text-blue-300 text-xs font-semibold inline-block">
                    "{review.highlight}"
                  </div>
                )}

                {/* Review Body */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{review.content}"
                </p>

                {/* Owner response if available */}
                {review.ownerResponse && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 text-xs text-slate-400">
                    <span className="font-semibold text-blue-400 block mb-0.5">Response from Dialfix owner:</span>
                    {review.ownerResponse}
                  </div>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-800/80">
                <div className={`w-9 h-9 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-md`}>
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{review.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <span className="text-[11px] text-slate-400">Google Reviewer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Scrolling Marquee (as requested) */}
        <div className="md:hidden relative -mx-4 overflow-hidden py-2">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#090D15] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#090D15] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-4 px-4">
            {/* Render reviews twice for seamless infinite marquee */}
            {[...VERBATIM_REVIEWS, ...VERBATIM_REVIEWS].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-[280px] p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shrink-0 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{review.timeAgo}</span>
                  </div>

                  {review.highlight && (
                    <div className="mb-2 px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 text-[11px] font-semibold">
                      "{review.highlight}"
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                    "{review.content}"
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-slate-800">
                  <div className={`w-8 h-8 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-xs`}>
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{review.author}</span>
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    </h4>
                    <span className="text-[10px] text-slate-400">Google Reviewer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">
            Swipe or tap to inspect verified customer testimonials
          </p>
        </div>
      </div>
    </section>
  );
};
