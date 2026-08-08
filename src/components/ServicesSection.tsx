import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (reasonKey: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Services' },
    { key: 'general', label: 'General & Hygiene' },
    { key: 'cosmetic', label: 'Cosmetic & Whitening' },
    { key: 'restorative', label: 'Implants & Crowns' },
    { key: 'ortho', label: 'Invisalign & Ortho' },
    { key: 'emergency', label: 'Emergency Care' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12 animate-fadeIn">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-[#003178] bg-[#d9e2ff] px-3 py-1 rounded-full">
          Clinical Offerings
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#003178] mt-3 mb-4 font-headline">
          Comprehensive Dental Services
        </h1>
        <p className="text-base sm:text-lg text-[#434652] max-w-2xl leading-relaxed">
          From gentle routine hygiene cleanings to state-of-the-art porcelain veneers and digital implantology, we blend clinical precision with tranquil patient care.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? 'bg-[#003178] text-white shadow-xs'
                : 'bg-[#f3f4f5] text-[#526069] hover:bg-[#e1e3e4] hover:text-[#191c1d]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl p-6 border border-[#e1e3e4] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#d9e2ff] text-[#003178] rounded-xl group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl" data-icon={service.icon}>
                    {service.icon}
                  </span>
                </div>
                {service.insuranceCovered ? (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Insurance Eligible
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-[#526069] bg-[#f3f4f5] px-2.5 py-1 rounded-full">
                    Elective / Cosmetic
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#191c1d] mb-2 font-headline">{service.title}</h3>
              <p className="text-sm text-[#434652] leading-relaxed mb-4">{service.description}</p>

              {/* Highlights List */}
              <ul className="space-y-1.5 mb-6 text-xs text-[#526069]">
                {service.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003178] text-sm">check_circle</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#e1e3e4] flex items-center justify-between mt-auto">
              <div>
                <span className="block text-[11px] text-[#526069] uppercase font-bold">Estimated Cost</span>
                <span className="text-sm font-bold text-[#003178]">{service.priceRange}</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForBooking(service.id)}
                className="px-4 py-2 rounded-full bg-[#003178] text-white font-bold text-xs hover:bg-[#0d47a1] transition-colors shadow-xs"
              >
                Book This Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
