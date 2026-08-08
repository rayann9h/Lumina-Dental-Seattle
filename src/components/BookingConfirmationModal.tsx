import React from 'react';
import { Appointment } from '../types';

interface BookingConfirmationModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onViewAppointments: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  appointment,
  onClose,
  onViewAppointments,
}) => {
  if (!appointment) return null;

  // Generate .ics calendar invite content
  const handleDownloadIcs = () => {
    const startTime = '100000'; // Default approximate format
    const endTime = '110000';
    const cleanDate = appointment.dateStr.replace(/-/g, '');

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lumina Dental Seattle//NONSGML v1.0//EN',
      'BEGIN:VEVENT',
      `UID:${appointment.referenceNumber}@luminadentalseattle.com`,
      `DTSTAMP:${cleanDate}T${startTime}Z`,
      `DTSTART:${cleanDate}T${startTime}Z`,
      `DTEND:${cleanDate}T${endTime}Z`,
      `SUMMARY:Dental Appointment - Lumina Dental Seattle (${appointment.reasonLabel})`,
      `DESCRIPTION:Appointment Ref: ${appointment.referenceNumber}\\nDoctor: ${appointment.doctorName}\\nReason: ${appointment.reasonLabel}\\nLocation: 1420 5th Ave, Seattle, WA 98101`,
      'LOCATION:1420 5th Ave, Seattle, WA 98101',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lumina-Dental-${appointment.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#e1e3e4] shadow-2xl relative overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#003178]" />

        <div className="text-center mt-2 mb-6">
          <div className="w-16 h-16 bg-[#d9e2ff] text-[#003178] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
            <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
          </div>
          <span className="inline-block px-3 py-1 bg-[#cfe6f2] text-[#071e27] text-xs font-bold rounded-full mb-2">
            Appointment Requested
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#191c1d] font-headline">
            You're All Set, {appointment.firstName}!
          </h2>
          <p className="text-xs text-[#526069] mt-1">
            Reference Number: <strong className="text-[#003178] font-mono">{appointment.referenceNumber}</strong>
          </p>
        </div>

        {/* Appointment Details Box */}
        <div className="bg-[#f8f9fa] rounded-xl p-5 border border-[#e1e3e4] space-y-3 text-sm text-[#191c1d] mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-[#e1e3e4]">
            <span className="text-[#526069] font-medium">Date & Time</span>
            <span className="font-bold text-[#003178]">{appointment.formattedDate} at {appointment.timeSlot}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-[#e1e3e4]">
            <span className="text-[#526069] font-medium">Provider</span>
            <span className="font-semibold">{appointment.doctorName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-[#e1e3e4]">
            <span className="text-[#526069] font-medium">Reason for Visit</span>
            <span className="font-semibold">{appointment.reasonLabel}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#526069] font-medium">Location</span>
            <span className="font-semibold text-right">1420 5th Ave, Seattle</span>
          </div>
        </div>

        <p className="text-xs text-[#434652] text-center mb-6 leading-relaxed">
          A confirmation email and SMS reminder have been dispatched to <strong>{appointment.email}</strong>. Our receptionist will reach out if any insurance details require pre-verification.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="w-full py-3 px-4 rounded-full bg-[#003178] text-white font-bold text-sm hover:bg-[#0d47a1] flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-lg">calendar_add_on</span>
            Download Calendar Invite (.ics)
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewAppointments();
              }}
              className="py-2.5 px-4 rounded-full border border-[#003178] text-[#003178] font-semibold text-xs hover:bg-[#d9e2ff] transition-colors"
            >
              View My Visits
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-full bg-[#e1e3e4] text-[#191c1d] font-semibold text-xs hover:bg-[#d9dadb] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
