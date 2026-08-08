import React, { useState } from 'react';
import { Appointment } from '../types';

interface EmergencyModalProps {
  onClose: () => void;
  onEmergencyBooked: (app: Appointment) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onClose, onEmergencyBooked }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('Severe Toothache / Pain');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const refNum = `EMG-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newApp: Appointment = {
      id: `emg-${Date.now()}`,
      referenceNumber: refNum,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ')[1] || 'Patient',
      email: 'emergency-triage@luminadentalseattle.com',
      phone,
      doctorId: 'dr-elena-rostova',
      doctorName: 'Emergency On-Call Specialist',
      reason: 'pain',
      reasonLabel: `PRIORITY EMERGENCY: ${issue}`,
      notes: 'Submitted via 24/7 Emergency Triage Banner',
      dateStr: today.toISOString().split('T')[0],
      formattedDate: formatted,
      timeSlot: 'Immediate Same-Day Slot',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onEmergencyBooked(newApp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border-2 border-[#ba1a1a] shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#526069] hover:text-black p-1 rounded-full"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 font-bold">
            <span className="material-symbols-outlined text-2xl">e911_emergency</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider">Priority Triage</span>
            <h2 className="text-2xl font-bold text-[#191c1d] font-headline">Dental Emergency Care</h2>
          </div>
        </div>

        {/* Immediate Call Action */}
        <div className="bg-[#ffdad6] p-4 rounded-xl mb-6 flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-[#93000a]">DIRECT CLINIC HOTLINE</span>
            <strong className="text-xl text-[#ba1a1a] font-mono">(206) 555-8901</strong>
          </div>
          <a
            href="tel:2065558901"
            className="px-4 py-2 bg-[#ba1a1a] text-white font-bold rounded-full text-xs hover:bg-[#93000a]"
          >
            Call Now
          </a>
        </div>

        {/* First Aid Steps */}
        <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] text-xs space-y-2 mb-6">
          <h4 className="font-bold text-[#191c1d]">Immediate First Aid Instructions:</h4>
          <p className="text-[#434652]">1. <strong>Toothache:</strong> Rinse with warm salt water. Gently floss to remove trapped debris.</p>
          <p className="text-[#434652]">2. <strong>Knocked-Out Tooth:</strong> Handle only by the crown. Keep moist in milk or saliva and come immediately.</p>
          <p className="text-[#434652]">3. <strong>Bleeding or Swelling:</strong> Apply a clean cold compress to the outside cheek.</p>
        </div>

        {/* Priority Callback Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="text-sm font-bold text-[#191c1d]">Request Priority Callback & Same-Day Slot</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#434652] mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#434652] mb-1">Mobile Phone *</label>
              <input
                type="tel"
                required
                placeholder="(206) 555-0123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#434652] mb-1">Nature of Emergency</label>
            <select
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2 text-xs"
            >
              <option value="Severe Toothache / Pain">Severe Toothache / Pain</option>
              <option value="Chipped / Broken Tooth">Chipped or Broken Tooth</option>
              <option value="Knocked-Out Permanent Tooth">Knocked-Out Permanent Tooth</option>
              <option value="Lost Crown or Filling">Lost Crown or Filling</option>
              <option value="Swollen Gums / Abscess">Swollen Gums / Abscess</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#ba1a1a] text-white font-bold text-xs hover:bg-[#93000a] shadow-xs"
          >
            Submit Priority Triage Request
          </button>
        </form>
      </div>
    </div>
  );
};
