import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, Wrench, Smartphone, ArrowRight, MessageSquare } from 'lucide-react';
import { DeviceType, RepairService } from '../types';
import { BUSINESS_INFO, DEVICE_CATEGORIES, POPULAR_REPAIRS } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDevice?: DeviceType;
  preselectedRepair?: RepairService | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDevice = 'iPhone',
  preselectedRepair = null,
}) => {
  const [device, setDevice] = useState<DeviceType>(preselectedDevice);
  const [deviceModel, setDeviceModel] = useState('');
  const [issue, setIssue] = useState(preselectedRepair ? preselectedRepair.title : 'Screen Replacement');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:30 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `DF-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(refCode);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '06:30 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#0E131F] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Appointment Confirmed!
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto mb-6">
              Your repair slot at our Eccles store has been reserved. You will receive an SMS confirmation shortly.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs text-slate-300 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-mono font-bold text-blue-400">{submittedRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Device:</span>
                <span className="font-semibold text-white">{device} {deviceModel ? `(${deviceModel})` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="font-semibold text-white">{issue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Slot:</span>
                <span className="font-semibold text-emerald-400">{preferredDate || 'Today / Next Slot'} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">530 Liverpool Rd, Eccles, M30 7JA</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/447365206098?text=Hello%20Dialfix,%20I%20have%20booked%20appointment%20ref%20${submittedRef}%20for%20${encodeURIComponent(device)}%20${encodeURIComponent(issue)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify via WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-950 text-blue-400 text-xs font-semibold border border-blue-800/40 mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>Same-Day Repair Booking</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Book Your Repair Slot
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Lock in your priority bench time. Most repairs completed in under 45 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Device Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Device Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {DEVICE_CATEGORIES.map((c) => (
                    <button
                      type="button"
                      key={c.type}
                      onClick={() => setDevice(c.type)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                        device === c.type
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exact Model & Issue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Device Model (e.g. iPhone 14 Pro, Galaxy S23)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 13 / ThinkPad"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Repair Needed
                  </label>
                  <select
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Screen Replacement">Screen Replacement</option>
                    <option value="Battery Replacement">Battery Replacement</option>
                    <option value="Charging Port Repair">Charging Port Repair</option>
                    <option value="Water Damage Recovery">Water Damage Recovery</option>
                    <option value="Back Glass Laser Repair">Back Glass Laser Repair</option>
                    <option value="Laptop Screen / Hinge">Laptop Screen / Hinge</option>
                    <option value="Logic Board Micro-Soldering">Logic Board Micro-Soldering</option>
                    <option value="Other / Free Diagnosis">Other / Free Diagnosis</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    UK Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07xxx xxx xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email (for booking receipt)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Additional Fault Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Screen flickering after dropped in water, touch unresponsive on left corner..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Guarantees bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>12-Month Warranty</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>No Fix, No Fee</span>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 transition-all active:scale-98"
              >
                Confirm Repair Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
