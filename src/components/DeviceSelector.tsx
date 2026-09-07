import React from 'react';
import { Smartphone, Laptop, Tablet, Cpu, ArrowRight, BatteryCharging, Zap, Droplets, Shield, ChevronRight, ChevronDown, Wrench } from 'lucide-react';
import { DeviceType, RepairService } from '../types';
import { DEVICE_CATEGORIES, POPULAR_REPAIRS } from '../data/mockData';

interface DeviceSelectorProps {
  selectedDevice: DeviceType;
  onSelectDevice: (device: DeviceType) => void;
  onSelectRepair: (repair: RepairService) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  selectedDevice,
  onSelectDevice,
  onSelectRepair,
}) => {
  const getDeviceIcon = (icon: string) => {
    switch (icon) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Tablet':
        return <Tablet className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const getRepairIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-5 h-5 text-purple-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-indigo-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="device-selector-section" className="relative py-12 sm:py-16 bg-[#0E131F]/80 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Device Picker Header */}
        <div className="text-left mb-6 sm:mb-8">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
            What needs fixing?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tap your device to get started with instant quote & same-day booking
          </p>
        </div>

        {/* Mobile Device Category Dropdown (for quick selection on phones) */}
        <div className="block sm:hidden mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span>Select Device Type:</span>
            </span>
            <span className="text-[11px] text-blue-400 font-normal">Tap to choose</span>
          </label>
          <div className="relative">
            <select
              value={selectedDevice}
              onChange={(e) => onSelectDevice(e.target.value as DeviceType)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-blue-500 appearance-none pr-10 cursor-pointer shadow-md"
            >
              {DEVICE_CATEGORIES.map((cat) => (
                <option key={cat.type} value={cat.type}>
                  {cat.label} (Book Repair)
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Device Category Pills / Buttons Grid (Responsive for all screen sizes) */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-10 sm:mb-14">
          {DEVICE_CATEGORIES.map((cat) => {
            const isSelected = selectedDevice === cat.type;
            return (
              <button
                key={cat.type}
                onClick={() => onSelectDevice(cat.type)}
                className={`flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20 text-white translate-y-[-2px]'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2 rounded-xl mb-1.5 sm:mb-2 transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {getDeviceIcon(cat.icon)}
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Popular Repairs Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-2 border-b border-slate-800/80">
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Popular repairs
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Walk in or book — most done same day in our Eccles workshop
            </p>
          </div>
          <span className="text-xs text-blue-400 font-semibold mt-2 sm:mt-0 flex items-center gap-1">
            <span>Tap any repair or select from dropdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Dropdown Menu for This Section (Popular Repairs Dropdown) */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-blue-950/50 border border-blue-500/40 shadow-xl shadow-blue-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Dropdown Menu: Choose a Repair Service</span>
            </label>
            <span className="text-[11px] text-blue-300 font-medium">
              Directly opens Book Your Repair page
            </span>
          </div>

          <div className="relative">
            <select
              onChange={(e) => {
                const found = POPULAR_REPAIRS.find((r) => r.id === e.target.value);
                if (found) {
                  onSelectRepair(found);
                }
              }}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-blue-500 text-white font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10 cursor-pointer transition-colors shadow-inner"
            >
              <option value="" disabled>
                -- Select a repair service from dropdown (Screen, Battery, Port...) --
              </option>
              {POPULAR_REPAIRS.map((repair) => (
                <option key={repair.id} value={repair.id}>
                  {repair.title} ({repair.subtitle}) — {repair.timeEstimate}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-blue-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Popular Repairs Cards Grid (Touch & Click Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {POPULAR_REPAIRS.map((repair) => (
            <div
              key={repair.id}
              onClick={() => onSelectRepair(repair)}
              className="flex items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800/80 hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm hover:shadow-lg hover:shadow-blue-950/40"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getRepairIcon(repair.iconName)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {repair.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                    <span className="text-[11px] sm:text-xs text-slate-400 truncate">{repair.subtitle}</span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 shrink-0">{repair.timeEstimate}</span>
                  </div>
                </div>
              </div>

              <div className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all pl-2 shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
