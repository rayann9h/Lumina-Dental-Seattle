import React, { useState } from 'react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  appointmentsCount: number;
  onEmergencyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  appointmentsCount,
  onEmergencyClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#f8f9fa] w-full top-0 sticky z-50 border-b border-[#c3c6d4]/40 transition-shadow duration-300 shadow-xs" id="main-header">
      <div className="flex justify-between items-center w-full px-4 sm:px-8 py-4 max-w-[1200px] mx-auto">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('booking');
          }}
          className="flex items-center gap-2 text-2xl font-bold text-[#003178] focus:outline-none focus:ring-2 focus:ring-[#003178] rounded font-headline"
          id="brand-logo-link"
        >
          <span
            className="material-symbols-outlined text-[#003178] text-3xl fill-1"
            data-icon="dentistry"
            data-weight="fill"
            aria-hidden="true"
          >
            dentistry
          </span>
          <span className="tracking-tight">Lumina Dental Seattle</span>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden md:flex gap-8 items-center font-semibold text-sm">
          <button
            type="button"
            onClick={() => handleNavClick('booking')}
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] rounded px-1 py-0.5 ${
              activeTab === 'booking' ? 'text-[#003178] font-bold underline underline-offset-4' : 'text-[#526069] hover:text-[#0d47a1]'
            }`}
            id="nav-link-booking"
          >
            Book Appointment
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('services')}
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] rounded px-1 py-0.5 ${
              activeTab === 'services' ? 'text-[#003178] font-bold underline underline-offset-4' : 'text-[#526069] hover:text-[#0d47a1]'
            }`}
            id="nav-link-services"
          >
            Our Services
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('team')}
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] rounded px-1 py-0.5 ${
              activeTab === 'team' ? 'text-[#003178] font-bold underline underline-offset-4' : 'text-[#526069] hover:text-[#0d47a1]'
            }`}
            id="nav-link-team"
          >
            Meet the Team
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('gallery')}
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] rounded px-1 py-0.5 ${
              activeTab === 'gallery' ? 'text-[#003178] font-bold underline underline-offset-4' : 'text-[#526069] hover:text-[#0d47a1]'
            }`}
            id="nav-link-gallery"
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('reviews')}
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] rounded px-1 py-0.5 ${
              activeTab === 'reviews' ? 'text-[#003178] font-bold underline underline-offset-4' : 'text-[#526069] hover:text-[#0d47a1]'
            }`}
            id="nav-link-reviews"
          >
            Reviews
          </button>
        </nav>

        {/* Trailing Action (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {appointmentsCount > 0 && (
            <button
              type="button"
              onClick={() => handleNavClick('my-appointments')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d3e2ed] text-[#0f1d25] font-semibold text-xs hover:bg-[#cfe6f2] transition-all relative focus:outline-none focus:ring-2 focus:ring-[#003178]"
              id="my-appointments-btn"
            >
              <span className="material-symbols-outlined text-base">event_note</span>
              <span>My Visits</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#003178] text-white rounded-full text-[10px] font-bold">
                {appointmentsCount}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onEmergencyClick}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-semibold text-xs hover:bg-[#ffdad6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ba1a1a]"
            id="header-emergency-btn"
          >
            <span className="material-symbols-outlined text-sm">e911_emergency</span>
            <span>Emergency Care</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('booking')}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#003178] text-white font-semibold text-sm hover:bg-[#0d47a1] hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003178] focus:ring-offset-2"
            id="header-book-now-btn"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Menu"
          className="md:hidden p-2 text-[#191c1d] hover:bg-[#e1e3e4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#003178]"
          id="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined" data-icon="menu">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f8f9fa] border-b border-[#c3c6d4] absolute w-full left-0 shadow-lg z-50 animate-fadeIn" id="mobile-menu">
          <nav className="flex flex-col px-6 py-4 font-semibold text-sm gap-2">
            <button
              type="button"
              className="text-left text-[#526069] hover:text-[#003178] py-2 border-b border-[#e1e3e4]"
              onClick={() => handleNavClick('booking')}
            >
              Book Appointment
            </button>
            <button
              type="button"
              className="text-left text-[#526069] hover:text-[#003178] py-2 border-b border-[#e1e3e4]"
              onClick={() => handleNavClick('services')}
            >
              Our Services
            </button>
            <button
              type="button"
              className="text-left text-[#526069] hover:text-[#003178] py-2 border-b border-[#e1e3e4]"
              onClick={() => handleNavClick('team')}
            >
              Meet the Team
            </button>
            <button
              type="button"
              className="text-left text-[#526069] hover:text-[#003178] py-2 border-b border-[#e1e3e4]"
              onClick={() => handleNavClick('gallery')}
            >
              Smile Gallery
            </button>
            <button
              type="button"
              className="text-left text-[#526069] hover:text-[#003178] py-2 border-b border-[#e1e3e4]"
              onClick={() => handleNavClick('reviews')}
            >
              Patient Reviews
            </button>
            {appointmentsCount > 0 && (
              <button
                type="button"
                className="text-left text-[#003178] py-2 border-b border-[#e1e3e4] font-bold flex items-center justify-between"
                onClick={() => handleNavClick('my-appointments')}
              >
                <span>My Appointments</span>
                <span className="bg-[#003178] text-white text-xs px-2 py-0.5 rounded-full">{appointmentsCount}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onEmergencyClick}
              className="mt-2 text-center px-4 py-2 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-bold text-xs"
            >
              Emergency Care Triage
            </button>
            <button
              type="button"
              className="mt-2 text-center px-6 py-3 rounded-full bg-[#003178] text-white font-bold"
              onClick={() => handleNavClick('booking')}
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
