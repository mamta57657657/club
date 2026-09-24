import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Heart,
  ChevronDown,
  X,
  MapPin,
  Star,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { UserProfile, Club } from '../types';

interface NavbarProps {
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  clubs?: Club[];
  onSelectClub?: (club: Club) => void;
  onNavigateToExplore?: () => void;
  onOpenNotifications: () => void;
  onNavigateToFavorites: () => void;
  onOpenProfileMenu: () => void;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  searchQuery,
  onSearchChange,
  clubs = [],
  onSelectClub,
  onNavigateToExplore,
  onOpenNotifications,
  onNavigateToFavorites,
  onOpenProfileMenu,
  unreadNotificationsCount
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Cmd+K / Ctrl+K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
      if (e.key === 'Escape') {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching clubs for live search suggestions
  const matchingClubs = clubs.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const QUICK_FILTERS = [
    { label: 'Miami Beach', query: 'Miami Beach' },
    { label: 'Collins Ave', query: 'Collins Ave' },
    { label: 'Surfside', query: 'Surfside' },
    { label: 'Fisher Island', query: 'Fisher Island' },
    { label: 'Beach Club', query: 'Beach Club' },
    { label: 'Dining', query: 'Dining' },
    { label: 'Wellness', query: 'Wellness' }
  ];

  const handleSelectClub = (club: Club) => {
    setIsFocused(false);
    if (onSelectClub) {
      onSelectClub(club);
    }
    if (onNavigateToExplore) {
      onNavigateToExplore();
    }
  };

  const handleApplyFilter = (filterQuery: string) => {
    onSearchChange(filterQuery);
    if (onNavigateToExplore) {
      onNavigateToExplore();
    }
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsFocused(false);
      if (matchingClubs.length > 0 && onNavigateToExplore) {
        onNavigateToExplore();
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[74px] border-b border-[#182537] bg-[#09111b]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Brand Logo & Subtitle */}
      <div
        onClick={onNavigateToExplore}
        className="flex items-center gap-3.5 min-w-[240px] cursor-pointer group"
      >
        {/* Gold Luxury Emblem SVG */}
        <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
          <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 text-[#d4af65]">
            <path
              d="M22 3L6 14V30L22 41L38 30V14L22 3Z"
              stroke="url(#emblemGold)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M22 9L12 16.5V27.5L22 35L32 27.5V16.5L22 9Z"
              stroke="url(#emblemGold)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M22 15L17 19V25L22 29L27 25V19L22 15Z"
              fill="url(#emblemGold)"
              fillOpacity="0.85"
            />
            <defs>
              <linearGradient id="emblemGold" x1="6" y1="3" x2="38" y2="41" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbeec1" />
                <stop offset="0.5" stopColor="#d4af65" />
                <stop offset="1" stopColor="#b38734" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="font-display-luxury text-lg sm:text-xl font-bold tracking-[0.16em] text-[#faebd0] leading-none group-hover:text-amber-200 transition-colors">
            CLUBS & CO
          </span>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#ab9368] font-medium mt-1">
            Exclusive Places. Extraordinary People.
          </span>
        </div>
      </div>

      {/* Global Interactive Search Bar with Dropdown */}
      <div ref={searchContainerRef} className="flex-1 max-w-xl mx-4 sm:mx-8 relative">
        <div
          className={`relative flex items-center w-full rounded-full transition-all duration-300 ${
            isFocused
              ? 'ring-2 ring-[#d4af65]/70 bg-[#0e1928] shadow-[0_0_25px_rgba(212,175,101,0.22)]'
              : 'bg-[#0d1724] hover:bg-[#101b2a] border border-[#1e2f44]'
          }`}
        >
          <Search
            className={`absolute left-4 w-4 h-4 transition-colors ${
              isFocused ? 'text-[#d4af65]' : 'text-[#8a9ba8]'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDownInput}
            placeholder="Search clubs, Miami Beach, Collins Ave, amenities..."
            className="w-full h-11 pl-11 pr-24 bg-transparent text-sm text-slate-100 placeholder-[#6d7e90] focus:outline-none"
          />

          {/* Right Action Icons in Input */}
          <div className="absolute right-3 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  inputRef.current?.focus();
                }}
                className="w-6 h-6 rounded-full bg-[#18273a] hover:bg-[#22364e] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-[#27394f] bg-[#0c1624] text-[10px] text-slate-400 font-mono">
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Live Search Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-13 left-0 right-0 z-50 rounded-2xl bg-[#0b1625] border border-[#243950] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Quick Filter Chips */}
            <div className="p-3 bg-[#08101a] border-b border-[#18273a]">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <SlidersHorizontal className="w-3 h-3 text-[#d4af65]" />
                <span>Quick Location & Amenity Filters</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_FILTERS.map((f) => (
                  <button
                    key={f.label}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleApplyFilter(f.query);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      searchQuery.toLowerCase() === f.query.toLowerCase()
                        ? 'bg-[#d4af65] text-[#110e08] font-bold shadow-md'
                        : 'bg-[#101e30] text-slate-300 hover:bg-[#182c44] hover:text-white border border-[#1e334d]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Header / Counter */}
            <div className="px-4 py-2 bg-[#0d1929] border-b border-[#162537] flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">
                {searchQuery ? `Clubs matching "${searchQuery}"` : 'Miami Beach Featured Clubs'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#16273c] text-[11px] font-bold text-[#d4af65]">
                {matchingClubs.length} {matchingClubs.length === 1 ? 'Club' : 'Clubs'}
              </span>
            </div>

            {/* Clubs List */}
            <div className="max-h-[340px] overflow-y-auto divide-y divide-[#142336]">
              {matchingClubs.length > 0 ? (
                matchingClubs.map((club) => (
                  <div
                    key={club.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectClub(club);
                    }}
                    className="p-3 hover:bg-[#132338] transition-colors cursor-pointer flex items-center gap-3.5 group"
                  >
                    {/* Club Thumbnail */}
                    <div className="relative w-14 h-12 rounded-xl overflow-hidden shrink-0 border border-[#21354c] group-hover:border-[#d4af65]">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black/80 text-[9px] font-bold text-[#d4af65] flex items-center justify-center">
                        {club.number}
                      </div>
                    </div>

                    {/* Club Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif-luxury text-sm font-bold text-slate-100 group-hover:text-[#faebd0] truncate">
                          {club.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-amber-300 shrink-0">
                          <Star className="w-3 h-3 fill-amber-300" />
                          <span>{club.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#d4af65] shrink-0" />
                        <span className="truncate">{club.address}</span>
                      </p>

                      {/* Tag preview */}
                      <div className="flex items-center gap-1.5 mt-1">
                        {club.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.2 rounded bg-[#0d1a29] border border-[#1b2d42] text-[10px] text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="w-7 h-7 rounded-full bg-[#16273b] group-hover:bg-[#d4af65] group-hover:text-[#110e08] flex items-center justify-center text-slate-300 transition-colors shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  <p className="font-semibold text-slate-200 mb-1">
                    No clubs found for "{searchQuery}"
                  </p>
                  <p className="text-slate-400 mb-3">
                    Try searching for "Collins Ave", "Surfside", "Fisher Island", or "Beach Club".
                  </p>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onSearchChange('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#18293d] hover:bg-[#20354f] text-[#d4af65] font-semibold transition-colors cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown Footer Tip */}
            <div className="p-2.5 bg-[#08101a] border-t border-[#18273a] flex items-center justify-between text-[11px] text-slate-400 px-4">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#d4af65]" />
                Clicking any club navigates & focuses map
              </span>
              <span>Press <strong className="text-slate-200">ESC</strong> to close</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#142233] transition-all cursor-pointer border border-transparent hover:border-[#1d2f44]"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#e14b4b] text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-[#09111b]">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Favorites Heart */}
        <button
          onClick={onNavigateToFavorites}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-[#d4af65] hover:bg-[#142233] transition-all cursor-pointer border border-transparent hover:border-[#1d2f44]"
          title="My Favorites"
        >
          <Heart className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-[#1a2839] mx-1 hidden sm:block" />

        {/* User Profile Pill */}
        <button
          onClick={onOpenProfileMenu}
          className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-[#121f2f] border border-transparent hover:border-[#22364c] transition-all cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#d4af65]/60 shadow-md">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left leading-tight hidden sm:flex">
            <span className="text-xs font-semibold text-slate-200 group-hover:text-white flex items-center gap-1.5">
              {user.name}
            </span>
            <span className="text-[10px] text-[#cca55e] font-medium">
              {user.tier}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
        </button>
      </div>
    </header>
  );
};
