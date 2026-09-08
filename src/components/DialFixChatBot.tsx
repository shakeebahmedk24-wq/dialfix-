import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Wrench,
  Sparkles,
  Phone,
  Calendar,
  Clock,
  MapPin,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  showActions?: boolean;
}

interface DialFixChatBotProps {
  onOpenBooking: () => void;
}

const QUICK_PROMPTS = [
  'How much to fix my screen?',
  'What are your opening hours?',
  'Where in Eccles are you located?',
  'Do you repair laptops & Macs?',
  'My phone has liquid / water damage',
  'How does No Fix, No Fee work?',
];

export function DialFixChatBot({ onOpenBooking }: DialFixChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        "Hi! I'm the DialFix Chat Bot, your official Eccles repair assistant. Most repairs here are completed same-day in under an hour with our 12-month warranty and No Fix, No Fee promise. What device can we help you get sorted today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showActions: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [viewportTop, setViewportTop] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Monitor mobile screen size and visual viewport for virtual keyboard
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle visual viewport changes on mobile (e.g. iOS virtual keyboard popup)
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    const updateVisualViewport = () => {
      if (window.visualViewport && window.innerWidth < 640) {
        setViewportHeight(window.visualViewport.height);
        setViewportTop(window.visualViewport.offsetTop || 0);
      } else {
        setViewportHeight(null);
        setViewportTop(0);
      }
    };

    updateVisualViewport();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateVisualViewport);
      window.visualViewport.addEventListener('scroll', updateVisualViewport);
    }
    window.addEventListener('resize', updateVisualViewport);

    return () => {
      document.body.style.overflow = '';
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateVisualViewport);
        window.visualViewport.removeEventListener('scroll', updateVisualViewport);
      }
      window.removeEventListener('resize', updateVisualViewport);
    };
  }, [isOpen, isMobile]);

  // Listen for global open-dialfix-chatbot event
  useEffect(() => {
    const handleOpenEvent = (e?: Event) => {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      if (customEvent?.detail?.prompt) {
        handleSend(customEvent.detail.prompt);
      }
    };

    window.addEventListener('open-dialfix-chatbot', handleOpenEvent);
    return () => window.removeEventListener('open-dialfix-chatbot', handleOpenEvent);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading, viewportHeight]);

  // Only auto-focus input on desktop, prevent jarring keyboard popup on mobile
  useEffect(() => {
    if (isOpen && !isMinimized && !isMobile) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen, isMinimized, isMobile]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Map to role: user | model for API
      const apiMessages = updatedHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || getLocalFallbackReply(text);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showActions: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('Chat API error, using local technician fallback:', err);
      const fallbackReply = getLocalFallbackReply(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showActions: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Immediate local technician fallback ensuring 100% uptime with exact business facts
  const getLocalFallbackReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('screen') || q.includes('cracked') || q.includes('display') || q.includes('glass')) {
      return 'Our screen replacements use genuine OEM-grade panels and take about 45 minutes while you wait. Screen repairs generally range between £60 and £485 depending on your specific phone make and model (with an average around £215), fully backed by our No Fix, No Fee promise and 12-month warranty. Would you like to book an appointment online or drop us a WhatsApp message for a free firm quote?';
    }

    if (q.includes('battery') || q.includes('charge') || q.includes('drain')) {
      return 'We install high-capacity replacement batteries for iPhone, Samsung, and Android devices in roughly 30 minutes. All batteries include our 12-month warranty and No Fix, No Fee guarantee. You can book an appointment online or message us on WhatsApp to check parts for your exact model.';
    }

    if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('sunday') || q.includes('time')) {
      return 'DialFix is open Monday through Saturday from 9:00 AM to 7:00 PM, and closed on Sundays. No appointment is needed for walk-ins at 530 Liverpool Rd, Eccles (M30 7JA).';
    }

    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('eccles') || q.includes('find')) {
      return 'You can find us at 530 Liverpool Rd, Peel Green, Eccles, Manchester M30 7JA. We are local technicians with street parking directly outside!';
    }

    if (q.includes('laptop') || q.includes('mac') || q.includes('macbook') || q.includes('pc') || q.includes('computer')) {
      return 'Yes, we repair Windows laptops and MacBooks! We handle screen & hinge repairs, SSD/RAM upgrades, overheating/thermal fan service, and OS reinstalls, most completed same-day with our 12-month warranty.';
    }

    if (q.includes('water') || q.includes('liquid') || q.includes('wet') || q.includes('drowned')) {
      return 'We provide free diagnostics and ultrasonic chemical treatment for liquid damage with same-day attention. With our No Fix, No Fee policy, you pay nothing if the device cannot be saved. Pop in to 530 Liverpool Rd as soon as possible!';
    }

    if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('quote')) {
      return 'Exact repair costs depend on the model and parts required, but you are always protected by our No Fix, No Fee promise and 12-month warranty. Tap Book Online or WhatsApp us on +44 7365 206098 for a free, instant quote.';
    }

    return "I'm DialFix's official repair assistant in Eccles. We provide same-day repairs with OEM parts, a 12-month warranty, and a strict No Fix, No Fee policy. Feel free to ask about screen fixes, batteries, laptop repairs, or our opening hours!";
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content:
          "Conversation reset! I'm the DialFix Chat Bot. How can we help with your phone, tablet, or laptop today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showActions: true,
      },
    ]);
  };

  const handleOpenBookingAndClose = () => {
    onOpenBooking();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Launcher Pill / Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
          {/* Subtle Attention Bubble */}
          {hasUnread && (
            <div className="mb-2.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-xl shadow-blue-900/40 border border-blue-400/40 flex items-center gap-2 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Ask DialFix Chat Bot · Online</span>
            </div>
          )}

          <button
            id="dialfix-chatbot-launcher"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              setHasUnread(false);
            }}
            className="flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-blue-500/50 hover:border-blue-400 shadow-2xl shadow-blue-950/80 transition-all transform active:scale-95 group"
            aria-label="Open DialFix Chat Bot"
          >
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-inner">
              <Wrench className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>DialFix Chat Bot</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                  AI
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Quick quotes & booking</span>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="dialfix-chatbot-window"
          style={
            isMobile && !isMinimized
              ? {
                  height: viewportHeight ? `${viewportHeight}px` : '100dvh',
                  maxHeight: viewportHeight ? `${viewportHeight}px` : '100dvh',
                  top: `${viewportTop}px`,
                  bottom: 'auto',
                }
              : undefined
          }
          className={`fixed z-50 transition-all duration-150 ease-out ${
            isMinimized
              ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-72 rounded-2xl shadow-xl'
              : 'inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-[100dvh] sm:h-[620px] sm:max-h-[85vh] sm:w-[420px] rounded-none sm:rounded-3xl shadow-2xl'
          } bg-slate-950 backdrop-blur-2xl border-0 sm:border sm:border-slate-800/90 flex flex-col overflow-hidden text-slate-100`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/80 border-b border-slate-800 flex items-center justify-between shrink-0 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">DialFix Chat Bot</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Official Eccles Repair Assistant · 5.0★</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart chat"
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-2 text-slate-300 hover:text-white bg-slate-800/80 sm:bg-transparent sm:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Trust Sub-Header Banner */}
              <div className="px-3.5 py-1.5 bg-blue-950/40 border-b border-blue-900/30 flex items-center justify-between text-[11px] text-blue-300 font-medium shrink-0">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>12m Warranty & No Fix, No Fee</span>
                </span>
                <span className="text-slate-400">Eccles, M30 7JA</span>
              </div>

              {/* Message List */}
              <div className="flex-1 min-h-0 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-sm custom-scrollbar bg-slate-950/60">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[90%] sm:max-w-[85%] ${
                        isUser ? 'ml-auto' : 'mr-auto'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400 font-medium px-1">
                        <span>{isUser ? 'You' : 'DialFix Chat Bot'}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-br-xs shadow-md shadow-blue-900/30 font-medium'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-xs shadow-sm font-normal'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>

                        {/* Interactive Direct CTAs inside Assistant responses */}
                        {!isUser && msg.showActions && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                            <button
                              onClick={handleOpenBookingAndClose}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>Book Online</span>
                            </button>

                            <a
                              href={BUSINESS_INFO.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-[11px] font-bold transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={BUSINESS_INFO.phoneTel}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call Shop</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex flex-col items-start max-w-[85%] mr-auto">
                    <span className="text-[11px] text-slate-400 mb-1 px-1 font-medium">DialFix Chat Bot</span>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 rounded-bl-xs text-xs text-slate-400 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                      <span className="text-[11px] text-slate-400">Technician is replying...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider shrink-0 pl-1">
                  Suggestions:
                </span>
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-blue-600/30 hover:border-blue-500/50 border border-slate-700 text-[11px] text-slate-300 hover:text-white font-medium transition-colors shrink-0 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask DialFix Chat Bot anything..."
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white transition-all transform active:scale-95 shrink-0 min-w-[42px] min-h-[42px] flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Footer Notice (Shown on desktop only to maximize screen space on mobile) */}
              <div className="hidden sm:block px-3 py-1.5 bg-slate-950 border-t border-slate-900 text-center shrink-0">
                <span className="text-[10px] text-slate-500 font-medium">
                  530 Liverpool Rd, Eccles • Mon-Sat 9am-7pm • +44 7365 206098
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
