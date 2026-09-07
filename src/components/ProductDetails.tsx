import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Zap, 
  Check, 
  ShieldCheck, 
  Store, 
  Phone, 
  Sparkles, 
  BatteryCharging, 
  Smartphone, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Share2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { ProductItem } from '../types';
import { BUSINESS_INFO, PRODUCTS_CATALOG } from '../data/mockData';

interface ProductDetailsProps {
  product: ProductItem;
  onBack: () => void;
  onAddToCart: (product: ProductItem) => void;
  onBuyNow: (product: ProductItem) => void;
  onSelectRelatedProduct: (product: ProductItem) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectRelatedProduct,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'warranty' | 'included'>('specs');

  // Scroll to top when product opens or changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAdded(false);
  }, [product.id]);

  const handleAdd = () => {
    for (let i = 0; i < selectedQuantity; i++) {
      onAddToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedProducts = PRODUCTS_CATALOG.filter((p) => p.id !== product.id);

  return (
    <div id="single-product-page" className="pt-28 md:pt-36 pb-20 bg-[#0B0F17] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Products</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 hidden sm:inline">Certified Phones</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-blue-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Imagery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#0B0F17] border border-slate-800 p-8 sm:p-12 flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-950/20">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />

              {/* Main Product Image */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain object-center z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md shadow-lg">
                  {product.condition}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/90 text-blue-300 border border-blue-800/80 backdrop-blur-md">
                  {product.storage}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>In Stock at Eccles Store</span>
                </span>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors shadow-md"
                title="Share product link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Micro Highlights strip below image */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
                <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div className="text-[11px] font-semibold text-white">12M Warranty</div>
                <div className="text-[10px] text-slate-400">Included free</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
                <BatteryCharging className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <div className="text-[11px] font-semibold text-white">96%+ Battery</div>
                <div className="text-[10px] text-slate-400">OEM tested</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
                <Lock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="text-[11px] font-semibold text-white">Factory Unlocked</div>
                <div className="text-[10px] text-slate-400">Any network SIM</div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Actions & Guarantee */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Model & Title */}
            <div className="border-b border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/60 text-blue-400 border border-blue-800/40 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certified Pre-Owned Device</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-slate-400 text-base sm:text-lg mt-1 font-medium">
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div className="mt-5 flex items-baseline gap-4">
                <span className="text-4xl sm:text-5xl font-black font-display text-red-500">
                  £{product.price.toFixed(2)}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-300">
                    VAT Included & Receipt Provided
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    12-Month Hardware Guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Specs Overview */}
            <div className="py-6 border-b border-slate-800 space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Highlights & Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Storage</span>
                  <span className="font-semibold text-white">{product.storage} High-Speed NVMe</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Color Finish</span>
                  <span className="font-semibold text-white">{product.color}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Cosmetic Grade</span>
                  <span className="font-semibold text-emerald-400">{product.condition}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Network Compatibility</span>
                  <span className="font-semibold text-white">Unlocked (EE, O2, Vodafone, 3)</span>
                </div>
              </div>

              {/* Feature bullet list */}
              <ul className="space-y-2 mt-4 text-xs sm:text-sm text-slate-300">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="py-6 border-b border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
                  <button
                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity((q) => Math.min(5, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  Subtotal: <strong className="text-white">£{(product.price * selectedQuantity).toFixed(2)}</strong>
                </span>
              </div>

              {/* Primary Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="single-product-add-cart-btn"
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25 active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>

                <button
                  id="single-product-buy-now-btn"
                  onClick={() => onBuyNow(product)}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now (Checkout)</span>
                </button>
              </div>

              {/* Direct Store Collection & Question CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
                >
                  <Store className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Click & Collect in Eccles Today</span>
                </a>

                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Call Store: {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Information Tabs */}
            <div className="pt-6">
              <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 transition-colors relative ${
                    activeTab === 'specs'
                      ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  45-Point Check
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`pb-3 transition-colors relative ${
                    activeTab === 'warranty'
                      ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  12-Month Guarantee
                </button>
                <button
                  onClick={() => setActiveTab('included')}
                  className={`pb-3 transition-colors relative ${
                    activeTab === 'included'
                      ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  What's In The Box
                </button>
              </div>

              <div className="py-4 text-xs text-slate-300 leading-relaxed">
                {activeTab === 'specs' && (
                  <p>
                    Every device sold at Dialfix undergoes an exhaustive 45-point hardware and battery test conducted by certified technicians. We verify camera stabilization, biometric sensors (Face ID/Touch ID), stereo speakers, microphones, 5G antennas, and battery charge cycles.
                  </p>
                )}
                {activeTab === 'warranty' && (
                  <p>
                    Your purchase includes our comprehensive 12-Month Dialfix Store Warranty. If your device experiences any technical faults, motherboard glitches, or display defects within 12 months, simply bring it into our Eccles store for a free on-the-spot repair or direct replacement.
                  </p>
                )}
                {activeTab === 'included' && (
                  <p>
                    Package includes the certified unlocked {product.name} handset, high-speed braided USB-C charging cable, pre-applied 9H tempered glass screen protection, and your official VAT purchase invoice & warranty certificate.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Devices Strip */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                More Available Handsets
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore our full range of certified refurbished phones ready in Eccles
              </p>
            </div>
            <button
              onClick={onBack}
              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Related products grid - 2 columns on mobile, 3 or 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {relatedProducts.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelatedProduct(rel)}
                className="cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 p-3 sm:p-4 transition-all group hover:bg-slate-900 shadow-md"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-950 p-3 flex items-center justify-center mb-3 overflow-hidden">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block">
                  {rel.condition}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase truncate">
                  {rel.name}
                </h4>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-sm sm:text-base font-black text-red-500 font-display">
                    £{rel.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400">{rel.storage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
