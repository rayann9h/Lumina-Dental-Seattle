import React from 'react';
import { Appointment } from '../types';

interface MyAppointmentsDrawerProps {
  appointments: Appointment[];
  onClose: () => void;
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsDrawer: React.FC<MyAppointmentsDrawerProps> = ({
  appointments,
  onClose,
  onCancelAppointment,
  onBookNew,
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-[#e1e3e4]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#003178] font-headline">My Scheduled Visits</h1>
          <p className="text-sm text-[#434652] mt-1">Manage your upcoming dental appointments at Lumina Dental Seattle.</p>
        </div>
        <button
          type="button"
          onClick={onBookNew}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#003178] text-white font-bold text-sm hover:bg-[#0d47a1] shadow-xs"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Book Another Visit
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[#e1e3e4] text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 bg-[#f3f4f5] text-[#526069] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">event_busy</span>
          </div>
          <h3 className="text-xl font-semibold text-[#191c1d] mb-2 font-headline">No Active Appointments</h3>
          <p className="text-sm text-[#526069] mb-6">You haven't scheduled any upcoming dental appointments yet.</p>
          <button
            type="button"
            onClick={onBookNew}
            className="px-6 py-2.5 rounded-full bg-[#003178] text-white font-bold text-sm hover:bg-[#0d47a1]"
          >
            Schedule a Visit Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-xl border border-[#e1e3e4] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                  app.status === 'Cancelled' ? 'bg-[#ba1a1a]' : 'bg-[#003178]'
                }`}
              />

              <div className="flex justify-between items-start mb-4 pl-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#003178] bg-[#d9e2ff] px-2.5 py-0.5 rounded-full">
                    {app.referenceNumber}
                  </span>
                  <h3 className="text-lg font-bold text-[#191c1d] mt-2">{app.reasonLabel}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : app.status === 'Cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="bg-[#f8f9fa] rounded-lg p-4 space-y-2 text-sm text-[#434652] mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003178] text-base">calendar_today</span>
                  <span className="font-semibold text-[#191c1d]">{app.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003178] text-base">schedule</span>
                  <span>{app.timeSlot}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003178] text-base">person</span>
                  <span>{app.doctorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003178] text-base">location_on</span>
                  <span>1420 5th Ave, Seattle, WA 98101</span>
                </div>
              </div>

              {app.notes && (
                <div className="text-xs text-[#526069] mb-4 bg-[#f3f4f5] p-3 rounded-md">
                  <strong>Notes:</strong> {app.notes}
                </div>
              )}

              {app.status !== 'Cancelled' && (
                <div className="flex justify-end gap-3 pt-2 border-t border-[#e1e3e4]">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you wish to cancel this appointment?')) {
                        onCancelAppointment(app.id);
                      }
                    }}
                    className="px-4 py-1.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-semibold text-xs hover:bg-[#ffdad6] transition-colors"
                  >
                    Cancel Visit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
