import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Club, Reservation } from '../../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubs: Club[];
  initialClubId?: string;
  onAddReservation: (res: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  clubs,
  initialClubId,
  onAddReservation
}) => {
  const [selectedClubId, setSelectedClubId] = useState<string>(initialClubId || clubs[0]?.id || '');
  const [date, setDate] = useState('2025-04-14');
  const [time, setTime] = useState('04:00 PM');
  const [partySize, setPartySize] = useState(2);
  const [seatingArea, setSeatingArea] = useState('Oceanfront Cabana');
  const [specialRequests, setSpecialRequests] = useState('Dom Pérignon on ice and fresh seasonal fruit platter upon arrival.');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const currentClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];

  const timeSlots = ['12:00 PM', '02:30 PM', '04:00 PM', '06:30 PM', '08:30 PM', '09:45 PM'];
  const seatingOptions = [
    'Oceanfront Cabana',
    'Poolside Daybed',
    'Private Dining Room',
    'Rooftop Terrace',
    'Beachside Lounge'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      clubId: currentClub.id,
      clubName: currentClub.name,
      clubImage: currentClub.image,
      date,
      time,
      partySize,
      seatingArea,
      specialRequests,
      status: 'confirmed'
    };

    onAddReservation(newRes);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0c1624] border border-[#20334a] shadow-2xl text-slate-100 p-6 flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#08101a] hover:bg-[#142337] border border-[#23354c] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Confirmation Success Screen */
          <div className="py-8 px-4 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1b3427] border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af65] font-semibold">
              Reservation Confirmed
            </span>

            <h3 className="font-serif-luxury text-2xl font-bold text-slate-100">
              {currentClub.name}
            </h3>

            <p className="text-xs text-slate-300 max-w-md">
              Your member reservation reference is <span className="font-mono font-bold text-[#e5c07b]">{confirmationCode}</span>.
              Our concierge team and club host have been notified.
            </p>

            <div className="w-full rounded-2xl bg-[#0e1928] border border-[#1b2b3f] p-4 text-xs space-y-2 text-left mt-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-semibold text-slate-100">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Party Size:</span>
                <span className="font-semibold text-slate-100">{partySize} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seating Area:</span>
                <span className="font-semibold text-[#e5c07b]">{seatingArea}</span>
              </div>
              {specialRequests && (
                <div className="pt-2 border-t border-[#18283a]">
                  <span className="text-slate-400 block mb-0.5">Concierge Notes:</span>
                  <span className="text-slate-300 italic">{specialRequests}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full mt-4 py-3 rounded-xl gold-gradient-btn text-xs font-bold shadow-lg cursor-pointer"
            >
              Done & Return to Club Portal
            </button>
          </div>
        ) : (
          /* Reservation Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af65] font-semibold">
                Member Concierge Booking
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-slate-100 mt-1">
                Reserve Experience or Cabana
              </h3>
            </div>

            {/* Club Picker */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Select Private Club
              </label>
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-200 focus:outline-none focus:border-[#d4af65] cursor-pointer"
              >
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.city}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af65]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-200 focus:outline-none focus:border-[#d4af65]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#d4af65]" />
                  <span>Guests</span>
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full h-11 px-3 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-200 focus:outline-none focus:border-[#d4af65] cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>Preferred Time</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      time === slot
                        ? 'gold-gradient-btn shadow-md border-transparent'
                        : 'bg-[#0e1928] text-slate-300 border-[#20334a] hover:bg-[#142337]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Area */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Seating & Experience Area
              </label>
              <div className="grid grid-cols-2 gap-2">
                {seatingOptions.map((area) => (
                  <button
                    type="button"
                    key={area}
                    onClick={() => setSeatingArea(area)}
                    className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                      seatingArea === area
                        ? 'bg-[#1e2f46] text-[#faebd0] border-[#d4af65]'
                        : 'bg-[#0e1928] text-slate-300 border-[#20334a] hover:bg-[#132235]'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Concierge Requests */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>Special Concierge Requests & Preferences</span>
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                placeholder="Specific wine pairings, dietary needs, private yacht tender docking..."
                className="w-full p-3 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-200 focus:outline-none focus:border-[#d4af65] placeholder-slate-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-95"
            >
              <span>Confirm Member Reservation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
