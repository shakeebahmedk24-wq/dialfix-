import React, { useState } from 'react';
import { ShoppingBag, Zap, Check, ShieldCheck, Sparkles, Truck, Store } from 'lucide-react';
import { ProductItem } from '../types';
import { PRODUCTS_CATALOG } from '../data/mockData';

interface ProductCatalogProps {
  onAddToCart: (product: ProductItem) => void;
  onBuyNow: (product: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCartClick = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleBuyNowClick = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    onBuyNow(product);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#0B0F17] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Pre-Owned & Brand New</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            PRODUCTS
          </h2>
          <p className="text-slate-400 text-xs sm:text-base mt-2 sm:mt-3 max-w-2xl mx-auto">
            Rigorous 45-point hardware inspection on all refurbished units. Includes 12-month Dialfix warranty, charger, and free store setup.
          </p>
        </div>

        {/* Products Grid: 2 columns on mobile, 4 columns on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {PRODUCTS_CATALOG.map((product) => {
            const isAdded = addedIds[product.id];

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="cursor-pointer rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-blue-950/30"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square w-full bg-slate-950 p-3 sm:p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Condition Badge */}
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#0B0F17]/90 text-slate-200 border border-slate-700 backdrop-blur-md">
                    {product.condition}
                  </span>
                  {/* Stock status */}
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-emerald-950/90 text-emerald-400 border border-emerald-800/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="hidden xs:inline">In Stock</span>
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xs sm:text-base text-white group-hover:text-blue-400 transition-colors uppercase line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 mb-2 font-medium line-clamp-1">
                      {product.subtitle}
                    </p>

                    {/* Features list - visible on tablet/desktop */}
                    <ul className="hidden sm:block text-xs text-slate-400 space-y-1 mb-4">
                      {product.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {/* Price in GBP */}
                    <div className="flex items-baseline justify-between pt-2 sm:pt-3 border-t border-slate-800/80 mb-2 sm:mb-4">
                      <div>
                        <span className="text-lg sm:text-2xl font-black font-display text-red-500">
                          £{product.price.toFixed(2)}
                        </span>
                        <span className="text-[9px] sm:text-[11px] text-slate-400 block -mt-0.5">
                          Inc. VAT & 12M Warranty
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Add to Cart & Buy Now */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        onClick={(e) => handleAddToCartClick(e, product)}
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/20 active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleBuyNowClick(e, product)}
                        className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[10px] sm:text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm shadow-red-600/25 transition-all active:scale-95"
                      >
                        <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Store pickup & dispatch notes */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-xs text-slate-300 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Click & Collect same-day at Eccles store</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Next-Day UK Tracked Courier delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};
