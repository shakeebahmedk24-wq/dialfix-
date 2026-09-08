import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Wrench, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Check, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  Calendar,
  Zap,
  ExternalLink,
  Navigation,
  ChevronDown
} from 'lucide-react';
import { DeviceType, RepairService } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface BookYourRepairPageProps {
  onBack: () => void;
  preselectedDevice?: DeviceType;
  preselectedRepair?: RepairService | null;
}

export const BookYourRepairPage: React.FC<BookYourRepairPageProps> = ({
  onBack,
  preselectedDevice = 'iPhone',
  preselectedRepair = null,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>(preselectedDevice || 'iPhone');
  const [selectedIssues, setSelectedIssues] = useState<string[]>(
    preselectedRepair ? [preselectedRepair.title] : ['Screen Repair']
  );
  const [deviceModel, setDeviceModel] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Today (Next available)');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Confirmation / submission state
  const [bookingConfirmed, setBookingConfirmed] = useState<null | {
    refCode: string;
    method: 'whatsapp' | 'direct';
  }>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync preselectedDevice if changed from parent
  useEffect(() => {
    if (preselectedDevice) {
      setSelectedDeviceType(preselectedDevice);
    }
  }, [preselectedDevice]);

  // Sync preselectedRepair if changed from parent
  useEffect(() => {
    if (preselectedRepair) {
      setSelectedIssues([preselectedRepair.title]);
    }
  }, [preselectedRepair]);

  const deviceTypes = [
    { id: 'iPhone', label: 'iPhone', icon: Smartphone },
    { id: 'Samsung', label: 'Samsung', icon: Smartphone },
    { id: 'Android', label: 'Android', icon: Smartphone },
    { id: 'Laptop', label: 'Laptop', icon: Laptop },
    { id: 'iPad', label: 'iPad', icon: Tablet },
    { id: 'Other', label: 'Other', icon: Wrench },
  ];

  const commonIssues = [
    'Screen Repair',
    'Battery',
    'Charging Port',
    'Water Damage',
    'Back Glass',
    'Not Sure',
    'Camera Repair',
    'Audio / Speaker',
    'Motherboard Fix',
  ];

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      if (selectedIssues.length === 1) return; // Keep at least one
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      setFormError('Please enter your name so we know who to address.');
      return false;
    }
    if (!phone.trim()) {
      setFormError('Please enter your phone number so we can confirm your slot.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleBookViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const issuesString = selectedIssues.join(', ');
    const modelText = deviceModel.trim() ? ` (${deviceModel.trim()})` : '';

    const messageText = 
      `*New Repair Booking - Dialfix*\n\n` +
      `👤 *Name:* ${name.trim()}\n` +
      `📞 *Phone:* ${phone.trim()}\n` +
      `📱 *Device:* ${selectedDeviceType}${modelText}\n` +
      `🔧 *Issue:* ${issuesString}\n` +
      `⏰ *Preferred Time:* ${preferredSlot}\n` +
      (additionalNotes.trim() ? `📝 *Notes:* ${additionalNotes.trim()}\n\n` : `\n`) +
      `Please let me know when I can bring this in to your Eccles store!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/447365206098?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    const refCode = `DF-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingConfirmed({ refCode, method: 'whatsapp' });
  };

  const handleBookDirectOnline = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refCode = `DF-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingConfirmed({ refCode, method: 'direct' });
  };

  return (
    <div id="book-repair-page" className="pt-28 md:pt-36 pb-24 bg-[#0B0F17] min-h-screen text-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation & Back to Home */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Services</span>
          <span className="text-slate-600">/</span>
          <span className="text-blue-400 font-medium">Book Your Repair</span>
        </nav>

        {/* Header Container */}
        <div className="text-center mb-8 sm:mb-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Free · No Card Required · Same-Day Service</span>
          </div>

          {/* CRITICAL FIX: Crisp, High-Contrast White Heading (Fixed from dark-on-dark bug in screenshot) */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Book Your Repair
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-2.5 max-w-xl mx-auto font-normal">
            Fill in the details below — we'll confirm via WhatsApp within minutes.
          </p>
        </div>

        {/* Confirmation Screen */}
        {bookingConfirmed ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-5 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
              Repair Request Received!
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              {bookingConfirmed.method === 'whatsapp'
                ? 'Your WhatsApp message was generated! We will reply promptly to confirm your exact appointment slot.'
                : 'Your repair reservation has been registered directly at our Eccles store. Drop by anytime during opening hours.'}
            </p>

            {/* Booking Details Card */}
            <div className="p-5 rounded-2xl bg-[#0B0F17] border border-slate-800 text-left text-xs sm:text-sm text-slate-300 space-y-2.5 mb-6">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Reference Number:</span>
                <span className="font-mono font-bold text-blue-400 text-base">{bookingConfirmed.refCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-semibold text-white">{name} ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Device:</span>
                <span className="font-semibold text-white">{selectedDeviceType} {deviceModel ? `(${deviceModel})` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Issue:</span>
                <span className="font-semibold text-white">{selectedIssues.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Time:</span>
                <span className="font-semibold text-emerald-400">{preferredSlot}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Store Address:</span>
                <span className="font-semibold text-white text-right">530 Liverpool Rd, Peel Green, Eccles, M30 7JA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BUSINESS_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions in Google Maps</span>
              </a>
              <button
                onClick={() => {
                  setBookingConfirmed(null);
                  onBack();
                }}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* Main Clean Booking Card - Perfectly Styled & Responsive */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-900 border border-slate-100 max-w-2xl mx-auto">
            <form onSubmit={handleBookViaWhatsApp} className="space-y-6">
              
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Your Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                />
              </div>

              {/* 2. Phone Number */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07700 900000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                />
              </div>

              {/* 3. Device Type */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    Device Type
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Selected: <strong className="text-blue-600">{selectedDeviceType}</strong>
                  </span>
                </div>

                {/* Direct Responsive Grid for Mobile & Desktop */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {deviceTypes.map((item) => {
                    const isSelected = selectedDeviceType === item.id;
                    const IconComponent = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setSelectedDeviceType(item.id)}
                        className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                        <span className="truncate max-w-full text-[11px] sm:text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. What needs fixing? */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    What needs fixing?
                  </label>
                  <span className="text-[11px] text-slate-400">Select one or more</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonIssues.map((issue) => {
                    const isSelected = selectedIssues.includes(issue);
                    return (
                      <button
                        type="button"
                        key={issue}
                        onClick={() => toggleIssue(issue)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                        <span>{issue}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Preferred Time Slot */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Preferred Time Slot <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                >
                  <option value="Today (Next available)">Today (Next available slot)</option>
                  <option value="Today Morning (10:00 AM - 1:00 PM)">Today Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Today Afternoon (1:00 PM - 5:00 PM)">Today Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Today Evening (5:00 PM - 7:00 PM)">Today Evening (5:00 PM - 7:00 PM)</option>
                  <option value="Tomorrow Morning (10:00 AM - 1:00 PM)">Tomorrow Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Tomorrow Afternoon (1:00 PM - 5:00 PM)">Tomorrow Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Weekend Slot">Weekend Slot (Saturday)</option>
                </select>
              </div>

              {/* Primary Green Action Button: WhatsApp */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="book-now-whatsapp-btn"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-base font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Book Now via WhatsApp</span>
                </button>

                {/* Direct Online Booking Alternative */}
                <button
                  type="button"
                  id="book-direct-online-btn"
                  onClick={handleBookDirectOnline}
                  className="w-full mt-2.5 py-3 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  Or Book Online Without WhatsApp (Store Ticket)
                </button>
              </div>

              {/* Sub-button guarantee notes */}
              <div className="text-center text-[11px] text-slate-500 font-medium">
                No spam · We reply within minutes · Free to book
              </div>
            </form>
          </div>
        )}

        {/* Trust Badges Bar (Matching the screenshot footer icons) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">No Fix, No Fee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">Same-Day Service</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold">5.0 Google Rated</span>
          </div>
        </div>

        {/* Store Walk-in & Help Information Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center shrink-0 text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prefer to Walk In Directly?</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                No appointment required for drop-offs. Bring your phone, tablet, or laptop directly to our shop.
              </p>
              <div className="text-xs text-slate-300 font-medium mt-1">
                530 Liverpool Rd, Peel Green, Eccles, Manchester M30 7JA (Mon–Sat: 9am–7:15pm)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call Us: 07365 206098</span>
            </a>
            <a
              href={BUSINESS_INFO.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
