import React, { useState, useEffect } from 'react';
import { ActiveTab, Appointment } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingSection } from './components/BookingSection';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { MyAppointmentsDrawer } from './components/MyAppointmentsDrawer';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { AiConcierge } from './components/AiConcierge';
import { EmergencyModal } from './components/EmergencyModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('booking');

  // Appointments local state
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [latestAppointment, setLatestAppointment] = useState<Appointment | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Pre-selection for booking
  const [preselectedReason, setPreselectedReason] = useState<string>('');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string>('any');

  // Save appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumina_appointments', JSON.stringify(appointments));
    } catch {
      // Ignore quota errors
    }
  }, [appointments]);

  const handleBookingSubmit = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setLatestAppointment(newAppointment);
    setShowConfirmationModal(true);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Cancelled' as const } : app))
    );
  };

  const handleSelectServiceForBooking = (serviceKey: string) => {
    setPreselectedReason(serviceKey);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctorForBooking = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d] selection:bg-[#d9e2ff] selection:text-[#003178]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appointmentsCount={appointments.filter((a) => a.status === 'Confirmed').length}
        onEmergencyClick={() => setShowEmergencyModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'booking' && (
          <BookingSection
            onBookingSubmit={handleBookingSubmit}
            preselectedReason={preselectedReason}
            preselectedDoctorId={preselectedDoctorId}
          />
        )}

        {activeTab === 'services' && (
          <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />
        )}

        {activeTab === 'team' && (
          <TeamSection onSelectDoctorForBooking={handleSelectDoctorForBooking} />
        )}

        {activeTab === 'gallery' && <GallerySection />}

        {activeTab === 'reviews' && <ReviewsSection />}

        {activeTab === 'my-appointments' && (
          <MyAppointmentsDrawer
            appointments={appointments}
            onClose={() => setActiveTab('booking')}
            onCancelAppointment={handleCancelAppointment}
            onBookNew={() => {
              setActiveTab('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onEmergencyClick={() => setShowEmergencyModal(true)}
      />

      {/* Floating AI Dental Concierge */}
      <AiConcierge onPreselectServiceAndBook={handleSelectServiceForBooking} />

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <BookingConfirmationModal
          appointment={latestAppointment}
          onClose={() => setShowConfirmationModal(false)}
          onViewAppointments={() => {
            setShowConfirmationModal(false);
            setActiveTab('my-appointments');
          }}
        />
      )}

      {/* Emergency Care Modal */}
      {showEmergencyModal && (
        <EmergencyModal
          onClose={() => setShowEmergencyModal(false)}
          onEmergencyBooked={(app) => {
            handleBookingSubmit(app);
            setShowEmergencyModal(false);
          }}
        />
      )}
    </div>
  );
}
