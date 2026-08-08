import React from 'react';
import { DOCTORS } from '../data/mockData';

interface TeamSectionProps {
  onSelectDoctorForBooking: (doctorId: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectDoctorForBooking }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12 animate-fadeIn">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-[#003178] bg-[#d9e2ff] px-3 py-1 rounded-full">
          Expert Clinical Leadership
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#003178] mt-3 mb-4 font-headline">
          Meet Our Dental Specialists
        </h1>
        <p className="text-base sm:text-lg text-[#434652] max-w-2xl leading-relaxed">
          Our team of board-certified clinicians in Seattle brings together decades of academic rigor, advanced technology mastery, and a compassionate, patient-first philosophy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DOCTORS.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row"
          >
            {/* Doctor Image */}
            <div className="sm:w-2/5 relative h-64 sm:h-auto bg-[#e1e3e4] overflow-hidden shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-mono font-bold">
                {doctor.credentials}
              </div>
            </div>

            {/* Content */}
            <div className="sm:w-3/5 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                  <span className="material-symbols-outlined text-sm fill-1">star</span>
                  <span className="text-xs font-bold text-[#191c1d]">{doctor.rating}</span>
                  <span className="text-xs text-[#526069]">({doctor.reviewsCount} patient reviews)</span>
                </div>

                <h3 className="text-2xl font-bold text-[#191c1d] font-headline">{doctor.name}</h3>
                <p className="text-xs font-bold text-[#003178] uppercase tracking-wide mb-3">{doctor.title}</p>
                <p className="text-xs text-[#434652] leading-relaxed mb-4">{doctor.bio}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold text-[#071e27] bg-[#cfe6f2] px-2.5 py-0.5 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#e1e3e4]">
                <button
                  type="button"
                  onClick={() => onSelectDoctorForBooking(doctor.id)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#003178] text-white font-bold text-xs hover:bg-[#0d47a1] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Book Visit with {doctor.name.split(' ')[1]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
