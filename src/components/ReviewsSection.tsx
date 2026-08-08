import React, { useState } from 'react';
import { Review } from '../types';
import { REVIEWS as INITIAL_REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [procedure, setProcedure] = useState('Routine Cleaning & Exam');
  const [comment, setComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      patientName: name,
      rating,
      date: 'Just now',
      procedure,
      comment,
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setName('');
    setComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12 animate-fadeIn">
      {/* Header */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#003178] bg-[#d9e2ff] px-3 py-1 rounded-full">
            Patient Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#003178] mt-3 mb-2 font-headline">
            Verified Patient Reviews
          </h1>
          <p className="text-base sm:text-lg text-[#434652] max-w-xl">
            Read transparent experiences from Seattle residents who trust Lumina Dental for their oral care.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-6 py-2.5 rounded-full bg-[#003178] text-white font-bold text-sm hover:bg-[#0d47a1] shadow-xs"
        >
          {showReviewForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {/* Aggregate Rating Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#e1e3e4] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-[#003178] font-headline">4.93</div>
          <div>
            <div className="flex text-amber-500 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="material-symbols-outlined text-xl fill-1">star</span>
              ))}
            </div>
            <p className="text-xs font-bold text-[#191c1d]">Based on 630+ Verified Reviews</p>
            <p className="text-[11px] text-[#526069]">Google Reviews & Internal Patient Surveys</p>
          </div>
        </div>

        <div className="flex gap-4 text-xs text-[#434652] divide-x divide-[#e1e3e4]">
          <div className="pr-4 text-center">
            <strong className="block text-lg text-[#003178] font-bold">99.4%</strong>
            <span>Pain-Free Comfort Rate</span>
          </div>
          <div className="pl-4 pr-4 text-center">
            <strong className="block text-lg text-[#003178] font-bold">100%</strong>
            <span>Sterilization Compliance</span>
          </div>
          <div className="pl-4 text-center">
            <strong className="block text-lg text-[#003178] font-bold">4.9/5</strong>
            <span>Cleanliness Score</span>
          </div>
        </div>
      </div>

      {/* Leave Review Form */}
      {showReviewForm && (
        <form onSubmit={handleAddReview} className="bg-white p-6 rounded-2xl border border-[#003178] shadow-md mb-8 animate-fadeIn">
          <h3 className="text-xl font-bold text-[#003178] mb-4 font-headline">Share Your Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-[#434652] mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex M."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434652] mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2.5 text-sm"
              >
                <option value={5}>5 Stars - Outstanding</option>
                <option value={4}>4 Stars - Great</option>
                <option value={3}>3 Stars - Average</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434652] mb-1">Procedure Received</label>
              <input
                type="text"
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2.5 text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-[#434652] mb-1">Your Feedback *</label>
            <textarea
              required
              rows={3}
              placeholder="Tell us about your appointment, staff friendliness, and clinical comfort..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-lg border border-[#c3c6d4] bg-[#f8f9fa] p-2.5 text-sm"
            />
          </div>
          <button type="submit" className="px-6 py-2 bg-[#003178] text-white font-bold rounded-full text-xs">
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white rounded-xl p-6 border border-[#e1e3e4] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-[#191c1d] text-base">{rev.patientName}</h4>
                  <span className="text-xs text-[#003178] font-semibold">{rev.procedure}</span>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm fill-1">star</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#434652] leading-relaxed mb-4">"{rev.comment}"</p>
            </div>

            <div className="pt-3 border-t border-[#e1e3e4] flex justify-between items-center text-xs text-[#526069]">
              <span className="flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs">verified</span>
                Verified Patient
              </span>
              <span>{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
