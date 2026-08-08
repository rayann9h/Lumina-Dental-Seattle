import React, { useState, useEffect } from 'react';
import { TimeSlot, Doctor, Appointment } from '../types';
import { DOCTORS, INITIAL_SLOTS } from '../data/mockData';

interface BookingSectionProps {
  onBookingSubmit: (appointment: Appointment) => void;
  preselectedReason?: string;
  preselectedDoctorId?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  onBookingSubmit,
  preselectedReason = '',
  preselectedDoctorId = 'any',
}) => {
  // Calendar state - defaulting to October 2024 to match screenshot, but fully interactive
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 9, 15)); // Oct 15, 2024
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctorId || 'any');

  // Intake Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState(preselectedReason || 'cleaning');
  const [notes, setNotes] = useState('');

  // Synchronize when preselected props change
  useEffect(() => {
    if (preselectedReason) setReason(preselectedReason);
    if (preselectedDoctorId) setSelectedDoctorId(preselectedDoctorId);
  }, [preselectedReason, preselectedDoctorId]);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // First day of current month (0 = Sun, 1 = Mon, etc.)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Days in previous month
  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  const selectedDateObject = new Date(year, month, selectedDay);
  const dateFormattedDisplay = `${shortMonthNames[month]} ${selectedDay}, ${year}`;
  const fullDateDisplay = selectedDateObject.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const timeSlotDisplay = `${dateFormattedDisplay} at ${selectedTimeSlot}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !reason) {
      alert('Please complete all required fields.');
      return;
    }

    const doctorObj = DOCTORS.find((d) => d.id === selectedDoctorId);
    const doctorName = doctorObj ? doctorObj.name : 'First Available Specialist';

    const reasonLabels: Record<string, string> = {
      cleaning: 'Routine Cleaning & Exam',
      pain: 'Tooth Pain / Emergency Care',
      consult: 'Cosmetic Consultation',
      whitening: 'Teeth Whitening',
      invisalign: 'Invisalign® Orthodontics',
      implants: 'Dental Implants',
      other: 'General Dental Concern',
    };

    const refNum = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      referenceNumber: refNum,
      firstName,
      lastName,
      email,
      phone,
      doctorId: selectedDoctorId,
      doctorName,
      reason,
      reasonLabel: reasonLabels[reason] || 'Dental Visit',
      notes,
      dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
      formattedDate: fullDateDisplay,
      timeSlot: selectedTimeSlot,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onBookingSubmit(newAppointment);
  };

  // Build calendar cells
  const prevMonthCells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevMonthCells.push(prevMonthDays - i);
  }

  const currentMonthCells = [];
  for (let d = 1; d <= daysInMonth; d++) {
    currentMonthCells.push(d);
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#003178] mb-4 font-headline">
          Request an Appointment
        </h1>
        <p className="text-base sm:text-lg text-[#434652] max-w-2xl leading-relaxed">
          Select a convenient date and time for your visit. Our scheduling team will confirm your appointment shortly after submission.
        </p>
      </div>

      {/* Booking Interface: Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Date Picker & Selected Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Date Picker Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e1e3e4] shadow-xs transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-medium text-[#191c1d] font-headline">Select Date</h2>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Previous Month"
                  onClick={handlePrevMonth}
                  className="p-2 rounded-full hover:bg-[#e1e3e4] text-[#526069] transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178]"
                >
                  <span className="material-symbols-outlined" data-icon="chevron_left">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Next Month"
                  onClick={handleNextMonth}
                  className="p-2 rounded-full hover:bg-[#e1e3e4] text-[#526069] transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178]"
                >
                  <span className="material-symbols-outlined" data-icon="chevron_right">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center mb-4 font-semibold text-sm text-[#003178] uppercase tracking-wide">
              {monthNames[month]} {year}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold text-[#526069]">
              <div className="pb-2">Su</div>
              <div className="pb-2">Mo</div>
              <div className="pb-2">Tu</div>
              <div className="pb-2">We</div>
              <div className="pb-2">Th</div>
              <div className="pb-2">Fr</div>
              <div className="pb-2">Sa</div>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-sm font-medium">
              {/* Empty / Previous Month slots */}
              {prevMonthCells.map((dayNum, idx) => (
                <div key={`prev-${idx}`} className="p-2 text-[#e1e3e4] cursor-not-allowed">
                  {dayNum}
                </div>
              ))}

              {/* Current Month Days */}
              {currentMonthCells.map((dayNum) => {
                const isSelected = dayNum === selectedDay;
                return (
                  <button
                    key={`day-${dayNum}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#003178] ${
                      isSelected
                        ? 'bg-[#003178] text-white font-bold shadow-xs scale-105'
                        : 'hover:bg-[#cfe6f2] text-[#191c1d]'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Appointment Summary */}
          <div className="bg-[#f3f4f5] p-6 rounded-xl border border-[#e1e3e4] flex items-start gap-4">
            <div className="p-3 bg-[#d9e2ff] rounded-lg text-[#003178] shrink-0">
              <span className="material-symbols-outlined text-3xl" data-icon="event_available">
                event_available
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#434652] mb-1 uppercase tracking-wider">Selected Time</h3>
              <p className="text-lg sm:text-xl font-semibold text-[#191c1d] font-headline" id="selected-time-display">
                {timeSlotDisplay}
              </p>
              {selectedDoctorId !== 'any' && (
                <p className="text-xs text-[#526069] mt-1 font-medium">
                  With {DOCTORS.find((d) => d.id === selectedDoctorId)?.name}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Dentist Selector Card */}
          <div className="bg-white p-6 rounded-xl border border-[#e1e3e4]">
            <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wider">
              Preferred Doctor (Optional)
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-2.5 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none"
            >
              <option value="any">First Available Specialist</option>
              {DOCTORS.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Time Slots & Intake Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Time Slots Grid */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e1e3e4] shadow-xs transition-shadow hover:shadow-md">
            <h2 className="text-xl sm:text-2xl font-medium text-[#191c1d] mb-6 flex items-center gap-2 font-headline">
              <span className="material-symbols-outlined text-[#526069]" data-icon="schedule">
                schedule
              </span>
              Available Times for {shortMonthNames[month]} {selectedDay}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" id="time-slot-grid">
              {/* Morning Slots */}
              {INITIAL_SLOTS.filter((s) => s.period === 'morning').map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                if (!slot.available) {
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="py-3 px-4 rounded-lg border text-center text-sm font-semibold slot-unavailable"
                    >
                      {slot.time}
                    </button>
                  );
                }
                return (
                  <button
                    key={slot.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`py-3 px-4 rounded-lg border text-center text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] ${
                      isSelected ? 'slot-selected shadow-xs' : 'slot-available'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}

              {/* Afternoon Divider */}
              <div className="col-span-full my-2">
                <hr className="border-[#e1e3e4]" />
                <span className="text-[11px] font-bold text-[#526069] uppercase tracking-wider block mt-2">
                  Afternoon Slots
                </span>
              </div>

              {/* Afternoon Slots */}
              {INITIAL_SLOTS.filter((s) => s.period === 'afternoon').map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                if (!slot.available) {
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="py-3 px-4 rounded-lg border text-center text-sm font-semibold slot-unavailable"
                    >
                      {slot.time}
                    </button>
                  );
                }
                return (
                  <button
                    key={slot.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`py-3 px-4 rounded-lg border text-center text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#003178] ${
                      isSelected ? 'slot-selected shadow-xs' : 'slot-available'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Patient Intake Form */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e1e3e4] shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#003178] rounded-l-xl"></div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#191c1d] mb-6 font-headline">Patient Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wide" htmlFor="first-name">
                    First Name *
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-3 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wide" htmlFor="last-name">
                    Last Name *
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-3 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wide" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-3 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wide" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(206) 555-0123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-3 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wide" htmlFor="reason">
                  Reason for Visit *
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-3 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none transition-colors"
                >
                  <option value="cleaning">Routine Cleaning & Exam</option>
                  <option value="pain">Tooth Pain / Emergency</option>
                  <option value="consult">Cosmetic Consultation</option>
                  <option value="whitening">Teeth Whitening</option>
                  <option value="invisalign">Invisalign® Clear Aligners</option>
                  <option value="implants">Dental Implants</option>
                  <option value="other">Other Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#434652] mb-2 uppercase tracking-wide" htmlFor="notes">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Any specific concerns, dental anxiety, or medical conditions we should know about?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-3 text-sm text-[#191c1d] focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-[#003178] text-white font-bold text-sm hover:bg-[#0d47a1] shadow-xs hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003178] focus:ring-offset-2 cursor-pointer"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
