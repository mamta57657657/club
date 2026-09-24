import React, { useState } from 'react';
import {
  X,
  Heart,
  Star,
  Clock,
  Phone,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Club } from '../../types';

interface ClubDetailModalProps {
  club: Club | null;
  onClose: () => void;
  onBookReservation: (clubId: string) => void;
  onToggleFavorite: (clubId: string) => void;
}

export const ClubDetailModal: React.FC<ClubDetailModalProps> = ({
  club,
  onClose,
  onBookReservation,
  onToggleFavorite
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!club) return null;

  const images = club.gallery && club.gallery.length > 0 ? club.gallery : [club.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c1624] border border-[#20334a] shadow-2xl text-slate-100 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#08101a]/80 hover:bg-[#142337] border border-[#23354c] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Gallery */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden shrink-0">
          <img
            src={images[activeImageIndex] || club.image}
            alt={club.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1624] via-transparent to-black/40" />

          {/* Badges on Hero */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0c1624]/90 border border-[#d4af65] text-xs font-bold text-[#faebd0] backdrop-blur-md">
              Club #{club.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#111e30]/80 border border-[#253d5c] text-xs font-semibold text-slate-200 backdrop-blur-md">
              Est. {club.founded}
            </span>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#d4af65] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Header Title & Rating */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#18283a]">
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-100">
                {club.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>{club.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111e2f] border border-[#233852]">
                <Star className="w-4 h-4 fill-[#d4af65] text-[#d4af65]" />
                <span className="text-sm font-bold text-slate-100">{club.rating}</span>
                <span className="text-xs text-slate-400">({club.reviewsCount} reviews)</span>
              </div>

              <button
                onClick={() => onToggleFavorite(club.id)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  club.isFavorite
                    ? 'bg-[#2a2215] border-[#d4af65] text-[#d4af65]'
                    : 'bg-[#111e2f] border-[#233852] text-slate-400 hover:text-white'
                }`}
                title="Toggle favorite"
              >
                <Heart className={`w-5 h-5 ${club.isFavorite ? 'fill-[#d4af65]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#d4af65] font-semibold mb-1.5">
              Overview & Heritage
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {club.fullBio || club.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#d4af65] font-semibold mb-2.5">
              Exclusive Member Amenities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {club.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0e1928] border border-[#1b2b3f] text-xs text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af65] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dress Code & Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0e1928] border border-[#1b2b3f]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4af65] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Dress Code Policy</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                {club.dressCode}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1928] border border-[#1b2b3f]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4af65] mb-1">
                <Clock className="w-4 h-4" />
                <span>Hours & Concierge Contact</span>
              </div>
              <p className="text-xs text-slate-300">
                {club.openingHours}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#cca55e] mt-2">
                <Phone className="w-3.5 h-3.5" />
                <span>{club.phone}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#18283a]">
            <div>
              <span className="text-[11px] text-slate-400">Membership Access:</span>
              <span className="text-xs font-semibold text-[#cca55e] block">
                {club.membershipType}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookReservation(club.id);
              }}
              className="px-6 py-3 rounded-xl gold-gradient-btn text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl cursor-pointer active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Reservation / Request Cabana</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
