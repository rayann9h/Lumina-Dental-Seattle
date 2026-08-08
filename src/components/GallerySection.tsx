import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Whitening', 'Cosmetic Veneers', 'Invisalign'];

  const items = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12 animate-fadeIn">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-[#003178] bg-[#d9e2ff] px-3 py-1 rounded-full">
          Smile Transformations
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#003178] mt-3 mb-4 font-headline">
          Clinical Gallery & Results
        </h1>
        <p className="text-base sm:text-lg text-[#434652] max-w-2xl leading-relaxed">
          Explore actual patient treatment outcomes completed at Lumina Dental Seattle.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${
              selectedCategory === cat
                ? 'bg-[#003178] text-white'
                : 'bg-[#f3f4f5] text-[#526069] hover:bg-[#e1e3e4]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#e1e3e4] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="grid grid-cols-2 gap-1 p-2 bg-[#f3f4f5]">
              <div className="relative rounded-lg overflow-hidden h-48 bg-gray-200">
                <img
                  src={item.beforeImage}
                  alt={`${item.title} Before`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  BEFORE
                </span>
              </div>
              <div className="relative rounded-lg overflow-hidden h-48 bg-gray-200">
                <img
                  src={item.afterImage}
                  alt={`${item.title} After`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-[#003178] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  AFTER
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-[#003178] uppercase">{item.category}</span>
                <span className="text-xs text-[#526069] font-medium">{item.treatmentDuration}</span>
              </div>
              <h3 className="text-lg font-bold text-[#191c1d] mb-2 font-headline">{item.title}</h3>
              <p className="text-xs text-[#434652] italic mb-4">"{item.patientNote}"</p>
              <div className="text-[11px] text-[#526069] pt-2 border-t border-[#e1e3e4] flex items-center justify-between">
                <span>Care Provided By:</span>
                <strong className="text-[#191c1d]">{item.doctorName}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
