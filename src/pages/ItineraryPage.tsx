import React, { useState } from 'react';
import {
  Palmtree,
  Calendar,
  MapPin,
  MoreVertical,
  Plus,
  Plane,
  Clock,
  Compass,
  Download,
  Share2
} from 'lucide-react';
import { Itinerary, Club } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';

interface ItineraryPageProps {
  itinerary: Itinerary;
  clubs: Club[];
  onSelectClub: (club: Club) => void;
  onCreateNewItinerary: () => void;
}

export const ItineraryPage: React.FC<ItineraryPageProps> = ({
  itinerary,
  clubs,
  onSelectClub,
  onCreateNewItinerary
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'saved'>('upcoming');
  const [showMenu, setShowMenu] = useState(false);

  const getClubForDay = (clubId?: string) => {
    return clubs.find((c) => c.id === clubId);
  };

  const handleExport = () => {
    const text = `CLUBS & CO ITINERARY\n${itinerary.title}\n${itinerary.dateRange} (${itinerary.durationText})\nLocation: ${itinerary.location}\n\n` +
      itinerary.days.map(d => `Day ${d.dayNumber}: ${d.title} - ${d.clubName || d.timeRange}\n${d.notes || ''}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itinerary.id}.txt`;
    a.click();
    setShowMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-74px)] overflow-y-auto bg-[#09111c]">
      <div className="p-6 space-y-6">
        {/* Top Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1b2b3f] shadow-2xl h-56 flex items-center">
          <img
            src="https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1600&q=80"
            alt="My Itinerary Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a121c] via-[#0c1624]/90 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09111c] via-transparent to-transparent" />

          {/* Banner Typography */}
          <div className="relative z-10 p-8 max-w-xl">
            <span className="text-xs uppercase tracking-[0.22em] text-[#d4af65] font-semibold">
              Your Travel Plans
            </span>
            <h1 className="font-serif-luxury text-3xl md:text-4xl font-bold text-slate-100 mt-2 leading-tight">
              My Itinerary
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed">
              Your personalized journey through the world&apos;s most exclusive clubs and destinations.
            </p>
          </div>
        </div>

        {/* Itinerary Filter Tabs & Create Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Upcoming Trips</span>
            </button>

            <button
              onClick={() => setActiveTab('past')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'past'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Past Trips</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Saved Itineraries</span>
            </button>
          </div>

          <button
            onClick={onCreateNewItinerary}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f1b2b] hover:bg-[#16273c] text-[#e5c07b] border border-[#d4af65]/60 hover:border-[#d4af65] text-xs font-semibold transition-all cursor-pointer shadow-md active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-[#d4af65]" />
            <span>Create New Itinerary</span>
          </button>
        </div>

        {/* Main Itinerary Content Card */}
        {activeTab !== 'upcoming' ? (
          <div className="rounded-2xl border border-[#1b2b3f] bg-[#0c1624] p-12 text-center text-slate-400">
            <p className="text-base font-semibold text-slate-200">No {activeTab} trips found.</p>
            <p className="text-xs text-slate-500 mt-1">Your &apos;Miami Beach Getaway&apos; is currently under Upcoming Trips.</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#0c1624] border border-[#1b2b3f] shadow-2xl overflow-hidden p-6 space-y-6">
            {/* Itinerary Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#18283a]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#242118] border border-[#d4af65]/60 flex items-center justify-center text-[#e5c07b]">
                  <Palmtree className="w-5 h-5 text-[#d4af65]" />
                </div>
                <div>
                  <h2 className="font-serif-luxury text-xl font-bold text-slate-100">
                    {itinerary.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {itinerary.dateRange} &nbsp;•&nbsp; {itinerary.durationText}
                  </p>
                </div>
              </div>

              {/* Badges & Menu */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111e2f] border border-[#1c2e44] text-xs font-medium text-slate-300">
                  <span className="text-slate-400">(-)</span>
                  <span>{itinerary.clubsCount} Clubs</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111e2f] border border-[#1c2e44] text-xs font-medium text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af65]" />
                  <span>{itinerary.activitiesCount} Activities</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111e2f] border border-[#1c2e44] text-xs font-medium text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af65]" />
                  <span>{itinerary.location}</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-8 h-8 rounded-lg bg-[#111e2f] hover:bg-[#1a2e46] border border-[#1c2e44] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-10 w-44 rounded-xl bg-[#0c1624] border border-[#233852] shadow-2xl p-1.5 z-30 text-xs">
                      <button
                        onClick={handleExport}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#152538] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#d4af65]" />
                        <span>Export Itinerary</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          alert('Itinerary link copied to clipboard!');
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#152538] transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#d4af65]" />
                        <span>Share Journey</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Split Content: Timeline (Left) & Map (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Timeline */}
              <div className="lg:col-span-6 space-y-4">
                {itinerary.days.map((day) => {
                  const club = getClubForDay(day.clubId);

                  if (day.isDeparture) {
                    return (
                      <div
                        key={day.dayNumber}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#0e1928] border border-[#192b40]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#1b2b3f] flex items-center justify-center text-[#d4af65] shrink-0 mt-0.5">
                          <Plane className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 font-medium">
                            Day {day.dayNumber} &nbsp;•&nbsp; {day.dateStr}
                          </div>
                          <h4 className="font-serif-luxury text-base font-bold text-slate-100 mt-0.5">
                            {day.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                            <Plane className="w-3.5 h-3.5 text-[#d4af65]" />
                            <span>{day.timeRange}</span>
                          </div>
                          {day.notes && (
                            <p className="text-xs text-slate-400 mt-1">{day.notes}</p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={day.dayNumber}
                      onClick={() => club && onSelectClub(club)}
                      className="group flex flex-col p-4 rounded-xl bg-[#0e1928] hover:bg-[#122135] border border-[#1a2c41] hover:border-[#d4af65]/60 transition-all cursor-pointer"
                    >
                      {/* Day Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#1c2c3f] border border-[#d4af65]/60 text-xs font-bold text-[#e5c07b] flex items-center justify-center shrink-0">
                            {day.dayNumber}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            Day {day.dayNumber} &nbsp;•&nbsp; {day.dateStr}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-200">
                          {day.title}
                        </span>
                      </div>

                      {/* Content with thumbnail */}
                      <div className="flex items-center gap-3.5 mt-1">
                        {day.clubImage && (
                          <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-[#21354d]">
                            <img
                              src={day.clubImage}
                              alt={day.clubName || ''}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif-luxury text-sm font-bold text-slate-100 truncate group-hover:text-[#faebd0] transition-colors">
                              {day.clubName}
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1a293c] text-[#cca55e] border border-[#2e435e]">
                              Club
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {day.clubAddress}
                          </p>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-1">
                            <Clock className="w-3 h-3 text-[#d4af65]" />
                            <span>{day.timeRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Map with Route line */}
              <div className="lg:col-span-6 h-[540px]">
                <InteractiveMap
                  clubs={clubs}
                  onSelectClub={onSelectClub}
                  showRoute={true}
                  heightClass="h-full"
                  showSearchPill={true}
                  searchLocationText="Miami Beach, FL"
                  bottomActionText="View Full Map"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <footer className="mt-auto h-9 border-t border-[#142233] bg-[#070e17] px-6 flex items-center justify-center gap-8 text-[10px] tracking-[0.22em] text-[#718296] font-medium uppercase">
        <span>Exclusive Access</span>
        <span className="text-[#32455b]">/</span>
        <span>Luxury Lifestyle</span>
        <span className="text-[#32455b]">/</span>
        <span>Global Destinations</span>
      </footer>
    </div>
  );
};
