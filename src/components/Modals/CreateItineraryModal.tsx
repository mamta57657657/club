import React, { useState } from 'react';
import { X, Calendar, MapPin, Palmtree, Plus, Check } from 'lucide-react';
import { Club, Itinerary } from '../../types';

interface CreateItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubs: Club[];
  onSaveItinerary: (itinerary: Itinerary) => void;
}

export const CreateItineraryModal: React.FC<CreateItineraryModalProps> = ({
  isOpen,
  onClose,
  clubs,
  onSaveItinerary
}) => {
  const [title, setTitle] = useState('South Beach Art & Yacht Weekend');
  const [location, setLocation] = useState('Miami Beach, FL');
  const [startDate, setStartDate] = useState('2025-05-16');
  const [endDate, setEndDate] = useState('2025-05-19');
  const [selectedClubIds, setSelectedClubIds] = useState<string[]>([clubs[0]?.id || '', clubs[1]?.id || '']);

  if (!isOpen) return null;

  const toggleClub = (clubId: string) => {
    setSelectedClubIds((prev) =>
      prev.includes(clubId) ? prev.filter((id) => id !== clubId) : [...prev, clubId]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const daysCount = 4;
    const chosenClubs = clubs.filter((c) => selectedClubIds.includes(c.id));

    const newItinerary: Itinerary = {
      id: `itinerary-${Date.now()}`,
      title,
      dateRange: `May 16 – May 19, 2025`,
      durationText: `${daysCount} Days • 3 Nights`,
      clubsCount: chosenClubs.length,
      activitiesCount: 2,
      location,
      status: 'upcoming',
      days: [
        {
          dayNumber: 1,
          dateStr: 'May 16, 2025',
          title: 'Arrival & Welcome Reception',
          clubId: chosenClubs[0]?.id,
          clubName: chosenClubs[0]?.name || 'Private Club',
          clubAddress: chosenClubs[0]?.address,
          clubImage: chosenClubs[0]?.image,
          timeRange: '3:00 PM – 8:00 PM',
          notes: 'Private beach cabana check-in and sunset aperitifs.'
        },
        {
          dayNumber: 2,
          dateStr: 'May 17, 2025',
          title: 'Oceanfront Cabana Day',
          clubId: chosenClubs[1]?.id || chosenClubs[0]?.id,
          clubName: chosenClubs[1]?.name || chosenClubs[0]?.name,
          clubAddress: chosenClubs[1]?.address || chosenClubs[0]?.address,
          clubImage: chosenClubs[1]?.image || chosenClubs[0]?.image,
          timeRange: '11:00 AM – 5:00 PM',
          notes: 'Reserved daybeds, champagne pairing luncheon.'
        },
        {
          dayNumber: 3,
          dateStr: 'May 18, 2025',
          title: 'Evening Dinner & Cultural Salon',
          clubId: chosenClubs[2]?.id || chosenClubs[0]?.id,
          clubName: chosenClubs[2]?.name || chosenClubs[0]?.name,
          clubAddress: chosenClubs[2]?.address || chosenClubs[0]?.address,
          clubImage: chosenClubs[2]?.image || chosenClubs[0]?.image,
          timeRange: '6:00 PM – 11:30 PM',
          notes: 'Private dining room tasting menu.'
        },
        {
          dayNumber: 4,
          dateStr: 'May 19, 2025',
          title: 'Departure',
          timeRange: 'Private transfer to airport',
          isDeparture: true,
          notes: 'Chauffeured vehicle transfer to airport.'
        }
      ]
    };

    onSaveItinerary(newItinerary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0c1624] border border-[#20334a] shadow-2xl text-slate-100 p-6 flex flex-col max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#08101a] hover:bg-[#142337] border border-[#23354c] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af65] font-semibold">
              Trip Architect
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-100 mt-1">
              Create New Itinerary
            </h3>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Itinerary Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af65]" />
              <span>Destination City</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>Start Date</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>End Date</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Select Clubs to Include ({selectedClubIds.length})
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {clubs.map((club) => {
                const isSelected = selectedClubIds.includes(club.id);

                return (
                  <div
                    key={club.id}
                    onClick={() => toggleClub(club.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#152538] border-[#d4af65] text-slate-100'
                        : 'bg-[#0e1928] border-[#1d2f44] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-7 rounded overflow-hidden shrink-0">
                        <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-semibold">{club.name}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        isSelected ? 'bg-[#d4af65] text-[#110e08]' : 'border border-[#2d435e]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gold-gradient-btn text-xs font-bold mt-2 shadow-lg cursor-pointer"
          >
            Save & Build Itinerary
          </button>
        </form>
      </div>
    </div>
  );
};
