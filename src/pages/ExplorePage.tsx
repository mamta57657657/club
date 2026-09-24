import React, { useState } from 'react';
import { ChevronRight, Waves, Utensils, Sparkles, Activity, Trophy, MapPin, Star, Compass, Navigation } from 'lucide-react';
import { Club } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';

interface ExplorePageProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
  onNavigateToFeatured: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  clubs,
  onSelectClub,
  onNavigateToFeatured,
  searchQuery = '',
  onClearSearch
}) => {
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'beach club':
        return <Waves className="w-3.5 h-3.5 text-[#d4af65]" />;
      case 'dining':
        return <Utensils className="w-3.5 h-3.5 text-[#d4af65]" />;
      case 'pool':
        return <Waves className="w-3.5 h-3.5 text-[#63b3ed]" />;
      case 'wellness':
      case 'spa':
        return <Sparkles className="w-3.5 h-3.5 text-[#68d391]" />;
      case 'golf':
      case 'tennis':
        return <Trophy className="w-3.5 h-3.5 text-[#ecc94b]" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-[#d4af65]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-74px)] overflow-hidden bg-[#09111c]">
      {/* Airbnb / Zillow Split View: Map on Left, Featured Clubs on Right */}
      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
        
        {/* LEFT PANEL: Interactive Draggable Google Map (Airbnb / Zillow style) */}
        <div className="w-full lg:w-[58%] h-[45vh] lg:h-full relative flex flex-col border-b lg:border-b-0 lg:border-r border-[#192738] bg-[#070e17]">
          <InteractiveMap
            clubs={clubs}
            hoveredClubId={hoveredClubId}
            onHoverClub={setHoveredClubId}
            onSelectClub={onSelectClub}
            showRoute={false}
            heightClass="h-full w-full"
            showSearchPill={true}
            searchLocationText="Miami Beach, FL"
            bottomActionText="View Details & Amenities"
            onBottomAction={onNavigateToFeatured}
          />

          {/* Floating Airbnb-style Map Guidance Badge */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08111c]/90 border border-[#23384f] backdrop-blur-md text-[11px] text-slate-300 shadow-xl">
            <Compass className="w-3.5 h-3.5 text-[#d4af65] animate-spin-slow" />
            <span>Drag, pan, or zoom to explore the Miami Beach coastline</span>
          </div>
        </div>

        {/* RIGHT PANEL: Featured Clubs List */}
        <div className="w-full lg:w-[42%] h-[55vh] lg:h-full flex flex-col bg-[#09121d] overflow-hidden">
          {/* Header Bar */}
          <div className="p-4 sm:p-5 pb-3 border-b border-[#172638] bg-[#0b1624]/70 backdrop-blur-sm shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af65] font-semibold flex items-center gap-1.5">
                  <Navigation className="w-3 h-3 text-[#d4af65]" />
                  Miami Beach Coastline
                </span>
                <h1 className="font-serif-luxury text-2xl font-bold text-slate-100">
                  Featured Clubs
                </h1>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#122236] border border-[#223952] text-xs font-semibold text-[#faebd0]">
                {clubs.length} Exclusive Spots
              </div>
            </div>
            
            {/* Interactive Instruction Banner or Active Search Indicator */}
            {searchQuery ? (
              <div className="mt-2.5 p-2.5 rounded-xl bg-[#142337] border border-[#d4af65]/40 flex items-center justify-between text-xs text-slate-200">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[#d4af65] font-semibold">Active Search:</span>
                  <span className="font-mono bg-[#0c1624] px-2 py-0.5 rounded border border-[#23384f] text-[#faebd0] truncate">
                    "{searchQuery}"
                  </span>
                </div>
                {onClearSearch && (
                  <button
                    onClick={onClearSearch}
                    className="text-xs text-[#d4af65] hover:text-[#f8e5be] font-bold underline ml-2 shrink-0 cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-2.5 p-2.5 rounded-xl bg-[#0e1c2e] border border-[#1d324b] flex items-center gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-[#d4af65] shrink-0" />
                <p className="leading-snug">
                  <span className="font-semibold text-slate-100">Interactive Map Sync:</span> Hover over any club below to glide the map on the left to that exact spot.
                </p>
              </div>
            )}
          </div>

          {/* Scrollable Clubs List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {clubs.length > 0 ? (
              clubs.map((club) => {
                const isHovered = hoveredClubId === club.id;

                return (
                  <div
                    key={club.id}
                    onClick={() => onSelectClub(club)}
                    onMouseEnter={() => setHoveredClubId(club.id)}
                    onMouseLeave={() => setHoveredClubId(null)}
                    className={`group relative rounded-2xl bg-[#0c1624] border transition-all duration-300 overflow-hidden cursor-pointer ${
                      isHovered
                        ? 'border-[#d4af65] bg-[#132439] shadow-[0_0_30px_rgba(212,175,101,0.32)] ring-1 ring-[#d4af65]/80 -translate-y-0.5'
                        : 'border-[#1b2d42] hover:border-[#d4af65]/60 hover:shadow-xl'
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg backdrop-blur-sm transition-all border ${
                        isHovered
                          ? 'bg-[#d4af65] text-[#110e06] border-white scale-110 shadow-[0_0_15px_#d4af65]'
                          : 'bg-[#0c1624]/90 border-[#d4af65]/80 text-[#faebd0]'
                      }`}
                    >
                      {club.number}
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[#0c1624]/90 border border-[#273d57] flex items-center gap-1 text-[11px] font-semibold text-slate-200 backdrop-blur-sm shadow-md">
                      <Star className="w-3 h-3 text-[#d4af65] fill-[#d4af65]" />
                      <span>{club.rating}</span>
                    </div>

                    {/* Club Photo Banner */}
                    <div className="relative h-36 w-full overflow-hidden">
                      <img
                        src={club.image}
                        alt={club.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isHovered ? 'scale-108' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1624] via-transparent to-black/35 opacity-90" />
                      
                      {/* Hover Status Ribbon */}
                      {isHovered && (
                        <div className="absolute bottom-2 left-3 px-2.5 py-0.5 rounded-md bg-[#d4af65] text-[#100c06] text-[10px] font-bold uppercase tracking-wider shadow-md">
                          Map Focused
                        </div>
                      )}
                    </div>

                    {/* Club Details */}
                    <div className="p-4 pt-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`font-serif-luxury text-lg font-bold transition-colors ${
                                isHovered ? 'text-[#faebd0]' : 'text-slate-100 group-hover:text-[#faebd0]'
                              }`}
                            >
                              {club.name}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 flex items-start gap-1.5 font-sans">
                            <MapPin className="w-3.5 h-3.5 text-[#d4af65] shrink-0 mt-0.5" />
                            <span className="leading-tight font-medium text-slate-200">{club.address}</span>
                          </p>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isHovered
                              ? 'bg-[#d4af65] text-[#120e06] scale-110 shadow-md'
                              : 'bg-[#132235] text-slate-300 group-hover:text-[#d4af65] group-hover:bg-[#182b42]'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Amenities / Tags */}
                      <div className="flex flex-wrap items-center gap-2.5 mt-3 pt-3 border-t border-[#192b40]">
                        {club.tags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0f1c2d] border border-[#1f344d] text-xs text-slate-300"
                          >
                            {getTagIcon(tag)}
                            <span className="font-medium text-[11px]">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-14 px-6 text-center rounded-2xl bg-[#0c1624] border border-[#1b2d42]">
                <div className="w-12 h-12 rounded-full bg-[#18293d] text-[#d4af65] flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-[#d4af65]" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-slate-100">
                  No clubs found matching "{searchQuery}"
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1.5 leading-relaxed">
                  Try searching for "Collins Ave", "Surfside", "Fisher Island", or "Beach Club".
                </p>
                {onClearSearch && (
                  <button
                    onClick={onClearSearch}
                    className="mt-4 px-4 py-2 rounded-xl gold-gradient-btn text-xs font-bold text-[#110e08] shadow-md cursor-pointer active:scale-95"
                  >
                    Reset Search to All Clubs
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer Sub-bar */}
          <div className="p-3 border-t border-[#162538] bg-[#09111c] text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Clubs & Co. • Curated Private Memberships
          </div>
        </div>
      </div>
    </div>
  );
};
