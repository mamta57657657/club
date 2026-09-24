import React, { useState } from 'react';
import {
  Heart,
  ArrowRight,
  ChevronDown,
  Waves,
  Utensils,
  Sparkles,
  Activity,
  Trophy,
  Check
} from 'lucide-react';
import { Club } from '../types';

interface FavoritesPageProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
  onToggleFavorite: (clubId: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  clubs,
  onSelectClub,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'clubs' | 'itineraries' | 'places'>('all');
  const [sortBy, setSortBy] = useState<'recently' | 'name' | 'rating'>('recently');

  // Filter favorite clubs
  const favoriteClubs = clubs.filter((c) => c.isFavorite);

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
    <div className="flex-1 flex flex-col h-[calc(100vh-74px)] overflow-y-auto bg-[#09111c]">
      <div className="p-6 space-y-6">
        {/* Top Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1b2b3f] shadow-2xl h-56 flex items-center">
          <img
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80"
            alt="My Favorites Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a121c] via-[#0c1624]/90 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09111c] via-transparent to-transparent" />

          {/* Banner Typography */}
          <div className="relative z-10 p-8 max-w-xl">
            <span className="text-xs uppercase tracking-[0.22em] text-[#d4af65] font-semibold">
              Your Personal Collection
            </span>
            <h1 className="font-serif-luxury text-3xl md:text-4xl font-bold text-slate-100 mt-2 leading-tight">
              My Favorites
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed">
              Your saved clubs, experiences and dream destinations all in one place.
            </p>
          </div>
        </div>

        {/* Filter Tabs & Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              All Favorites ({favoriteClubs.length})
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'clubs'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              Clubs ({favoriteClubs.length})
            </button>
            <button
              onClick={() => setActiveTab('itineraries')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'itineraries'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              Itineraries (0)
            </button>
            <button
              onClick={() => setActiveTab('places')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'places'
                  ? 'gold-gradient-btn shadow-md'
                  : 'bg-[#0f1b2b] text-slate-300 hover:text-white border border-[#1f3148]'
              }`}
            >
              Places (0)
            </button>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-[#0e1928] border border-[#21354d] text-xs text-slate-200 font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-[#d4af65] cursor-pointer"
            >
              <option value="recently">Sort by: Recently Saved</option>
              <option value="rating">Sort by: Top Rated</option>
              <option value="name">Sort by: Name (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2x2 Grid of Club Cards */}
        {activeTab === 'itineraries' || activeTab === 'places' ? (
          <div className="rounded-2xl border border-[#1b2b3f] bg-[#0c1624] p-12 text-center text-slate-400">
            <p className="text-sm font-medium">No saved {activeTab} yet.</p>
            <p className="text-xs text-slate-500 mt-1">Explore our destinations and itineraries to save your favorites.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteClubs.map((club) => (
              <div
                key={club.id}
                className="group rounded-2xl bg-[#0c1624] border border-[#1b2b3f] hover:border-[#d4af65]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1624] via-transparent to-transparent opacity-85" />

                  {/* Top Left: "CLUB" Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0c1624]/90 border border-[#d4af65]/80 text-[10px] font-bold tracking-wider text-[#faebd0] uppercase backdrop-blur-sm">
                    Club
                  </div>

                  {/* Top Right: Gold Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(club.id);
                    }}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0c1624]/90 border border-[#d4af65]/80 flex items-center justify-center text-[#d4af65] hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer backdrop-blur-sm"
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-[#d4af65]" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-slate-100 group-hover:text-[#faebd0] transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {club.address}
                    </p>

                    {/* Amenities Row */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[#18283a]">
                      {club.tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-1.5 text-xs text-slate-300">
                          {getTagIcon(tag)}
                          <span className="font-medium text-[11px]">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-5 pt-4 border-t border-[#18283a] flex items-center justify-between">
                    <button
                      onClick={() => onSelectClub(club)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 group-hover:text-[#faebd0] hover:underline cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-[#d4af65] font-medium">
                      <Heart className="w-3.5 h-3.5 fill-[#d4af65]" />
                      <span>Added to favorites</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
