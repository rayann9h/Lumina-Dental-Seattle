import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onEmergencyClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onEmergencyClick }) => {
  return (
    <footer className="bg-[#e7e8e9] w-full mt-16 border-t border-[#c3c6d4]/40">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-10 py-12 max-w-[1200px] mx-auto">
        {/* Brand & Contact */}
        <div className="md:col-span-2 space-y-4">
          <div className="text-2xl text-[#003178] font-bold flex items-center gap-2 mb-4 font-headline">
            <span className="material-symbols-outlined text-2xl fill-1" data-icon="dentistry" data-weight="fill">
              dentistry
            </span>
            Lumina Dental Seattle
          </div>
          <p className="text-sm text-[#434652] max-w-sm leading-relaxed">
            Professional Precision, Patient Peace. Delivering exceptional clinical dental care in a calming, anxiety-free environment.
          </p>
          <div className="pt-2 space-y-2 text-sm text-[#434652]">
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#526069] text-lg" data-icon="location_on">
                location_on
              </span>
              1420 5th Ave, Seattle, WA 98101
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#526069] text-lg" data-icon="call">
                call
              </span>
              (206) 555-8901
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#526069] text-lg" data-icon="schedule">
                schedule
              </span>
              Mon–Fri: 8am–5pm | Sat: 9am–2pm
            </p>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#191c1d] uppercase tracking-wider mb-2">Legal & Practice</h4>
          <nav aria-label="Legal Links" className="flex flex-col gap-2.5 text-sm text-[#434652]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline hover:text-[#003178] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline hover:text-[#003178] transition-colors">
              Terms of Service
            </a>
            <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:underline hover:text-[#003178] transition-colors">
              HIPAA Notice & Accessibility
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className="text-left hover:underline hover:text-[#003178] transition-colors"
            >
              Meet Our Dentists
            </button>
          </nav>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#191c1d] uppercase tracking-wider mb-2">Patient Care</h4>
          <nav aria-label="Patient Links" className="flex flex-col gap-2.5 text-sm text-[#434652]">
            <button
              type="button"
              onClick={onEmergencyClick}
              className="text-left font-bold text-[#ba1a1a] hover:underline transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">e911_emergency</span>
              Emergency Care
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('my-appointments')}
              className="text-left hover:underline hover:text-[#003178] transition-colors"
            >
              Patient Portal & Visits
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className="text-left hover:underline hover:text-[#003178] transition-colors"
            >
              Insurance & Payment Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className="text-left hover:underline hover:text-[#003178] transition-colors"
            >
              Patient Reviews
            </button>
          </nav>
        </div>

        <div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-[#c3c6d4]/40 text-center md:text-left text-xs text-[#526069] flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Lumina Dental Seattle. Professional Precision, Patient Peace.</div>
          <div className="flex items-center gap-4 text-[#526069]">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Accepting New Patients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
