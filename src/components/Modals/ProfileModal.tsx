import React, { useState } from 'react';
import { X, Crown, Mail, Phone, MapPin, Calendar, Check, Save } from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [homeCity, setHomeCity] = useState(user.homeCity);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
      homeCity
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-[#18283a]">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af65] shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif-luxury text-lg font-bold text-slate-100">{user.name}</h3>
                <Crown className="w-4 h-4 text-[#e5c07b]" />
              </div>
              <span className="text-xs text-[#cca55e] font-semibold">{user.tier}</span>
              <span className="text-[11px] text-slate-400 block">Member since {user.memberSince}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#d4af65]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>Phone</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af65]" />
                <span>Primary Residences</span>
              </label>
              <input
                type="text"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#0e1928] border border-[#20334a] text-xs text-slate-100 focus:outline-none focus:border-[#d4af65]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Profile Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
