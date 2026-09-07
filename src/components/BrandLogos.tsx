import React from 'react';

export const BrandLogos: React.FC = () => {
  const brands = [
    { name: 'Apple', sub: 'iPhone & Mac' },
    { name: 'Samsung', sub: 'Galaxy S & Fold' },
    { name: 'Google', sub: 'Pixel Series' },
    { name: 'Sony', sub: 'Xperia' },
    { name: 'Lenovo', sub: 'ThinkPad' },
    { name: 'Nokia', sub: 'HMD Global' },
    { name: 'Xiaomi', sub: 'Mi & Redmi' },
    { name: 'Dell / HP', sub: 'Laptops' },
  ];

  return (
    <section className="py-12 bg-[#080C14] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
          CERTIFIED REPAIRS & OEM COMPONENTS FOR ALL MAJOR BRANDS
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {brands.map((b) => (
            <div
              key={b.name}
              className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col items-center justify-center"
            >
              <span className="font-display font-black text-sm sm:text-base text-slate-200 tracking-wide">
                {b.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
