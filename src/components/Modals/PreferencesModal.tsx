import React, { useState } from 'react';
import { X, Sliders, Bell, Check, Save } from 'lucide-react';
import { UserProfile } from '../../types';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser
}) => {
  const [ambience, setAmbience] = useState(user.preferences.preferredAmbience);
  const [dietary, setDietary] = useState(user.preferences.dietary);
  const [sport, setSport] = useState(user.preferences.favoriteSport);
  const [alerts, setAlerts] = useState(user.preferences.conciergeAlerts);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      preferences: {
        preferredAmbience: ambience,
        dietary,
        favoriteSport: sport,
        conciergeAlerts: alerts
      }
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0c1624] border border-[#20334a] shadow-2xl text-slate-100 p-6 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#08101a] hover:bg-[#142337] border border-[#23354c] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="pb-2 border-b border-[#18283a]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af65] font-semibold">
              Member Curation
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-100 mt-0.5">
              Personal Hospitality Preferences
            </h3>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Preferred Club Ambience
            </label>
            <input
              type="text"
              value={ambience}
              onChange={(e) => setAmbience(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Dietary & Beverage Protocol
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Recreational & Sport Interests
            </label>
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e1928] border border-[#20334a]">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                Direct Concierge SMS & WhatsApp Alerts
              </span>
              <span className="text-[10px] text-slate-400">
                Receive proactive cabana confirmations and private event guest lists
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAlerts(!alerts)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                alerts ? 'bg-[#d4af65]' : 'bg-[#1b2b3f]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  alerts ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Preferences Updated</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
