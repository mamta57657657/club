import React, { useState } from 'react';
import { X, Crown, Check, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpgradeTier: (newTier: string) => void;
  onNavigateToPlansPage?: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpgradeTier,
  onNavigateToPlansPage
}) => {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');

  if (!isOpen) return null;

  const MODAL_PLANS = [
    {
      id: 'essential',
      name: 'Essential Member',
      price: billing === 'annual' ? '$2,400/yr' : '$220/mo',
      desc: '1 Local Club choice • 2 Guest passes/mo • Standard AI booking',
      badge: 'Starter'
    },
    {
      id: 'premium',
      name: 'Premium Member',
      price: billing === 'annual' ? '$4,800/yr' : '$440/mo',
      desc: 'All 4 Miami Clubs • 4 Guest passes/mo • 24/7 AI Concierge priority',
      badge: 'Current'
    },
    {
      id: 'platinum',
      name: 'Platinum Global Society',
      price: billing === 'annual' ? '$8,500/yr' : '$790/mo',
      desc: '45+ Global Clubs • WhatsApp concierge desk • Complimentary Ferry',
      badge: 'Popular',
      recommended: true
    },
    {
      id: 'founder',
      name: 'Black Diamond Founder',
      price: billing === 'annual' ? '$14,500/yr' : '$1,350/mo',
      desc: '180+ Global Clubs • 24/7 Human Executive Liaison • Yacht Slips & F1 VIP',
      badge: 'Most Elite'
    },
    {
      id: 'syndicate',
      name: 'Corporate Syndicate',
      price: billing === 'annual' ? '$24,000/yr' : '$2,200/mo',
      desc: '4 Executive cards • Private boardrooms • Dedicated Director team',
      badge: 'Executive'
    }
  ];

  const handleUpgrade = (tierName: string) => {
    onUpgradeTier(tierName);
    alert(`Congratulations Alex! You have unlocked ${tierName} status with instant privileges.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0c1624] border border-[#20334a] shadow-2xl text-slate-100 p-6 sm:p-7 flex flex-col max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#08101a] hover:bg-[#142337] border border-[#23354c] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#262218] border border-[#d4af65] flex items-center justify-center text-[#e5c07b] mx-auto mb-2 shadow-lg">
            <Crown className="w-6 h-6 text-[#d4af65]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#d4af65] font-semibold">
            Clubs & Co Global Society
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Elevate Your Membership Plan
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
            Unlock seamless reciprocal privileges across Miami Beach and 180+ private member clubs worldwide.
          </p>

          {/* Billing Switcher */}
          <div className="mt-4 inline-flex items-center p-1 rounded-xl bg-[#0e1928] border border-[#1e3046]">
            <button
              onClick={() => setBilling('annual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billing === 'annual' ? 'gold-gradient-btn' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual (Save 15%)
            </button>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billing === 'monthly' ? 'gold-gradient-btn' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Plans List */}
        <div className="space-y-3 mt-2">
          {MODAL_PLANS.map((plan) => {
            const isCurrent = user.tier.toLowerCase() === plan.name.toLowerCase();

            return (
              <div
                key={plan.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  plan.recommended
                    ? 'bg-[#15253b] border-[#d4af65] shadow-lg'
                    : isCurrent
                    ? 'bg-[#0f1b2b] border-[#29425f]'
                    : 'bg-[#0c1624] border-[#1b2c40] hover:border-[#d4af65]/60'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-base font-bold text-slate-100">
                      {plan.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        isCurrent
                          ? 'bg-[#21354d] text-slate-300'
                          : plan.recommended
                          ? 'bg-[#d4af65] text-black'
                          : 'bg-[#18283a] text-[#cca55e]'
                      }`}
                    >
                      {isCurrent ? 'Current Tier' : plan.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1">{plan.desc}</div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <div className="font-serif-luxury text-sm font-bold text-[#faebd0]">
                    {plan.price}
                  </div>

                  {isCurrent ? (
                    <button
                      disabled
                      className="px-3.5 py-1.5 rounded-xl bg-[#142233] text-slate-400 text-xs font-semibold cursor-not-allowed"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan.name)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 ${
                        plan.recommended
                          ? 'gold-gradient-btn text-black'
                          : 'bg-[#1a2d42] hover:bg-[#233b56] text-slate-100 border border-[#2b4461]'
                      }`}
                    >
                      Select Plan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Link to Full Page */}
        {onNavigateToPlansPage && (
          <div className="mt-5 pt-4 border-t border-[#18283a] flex items-center justify-between text-xs">
            <span className="text-slate-400">Want to view the full privilege matrix & add-ons?</span>
            <button
              onClick={() => {
                onClose();
                onNavigateToPlansPage();
              }}
              className="text-[#d4af65] hover:text-[#f0d69b] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Open Upgrade Plans Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
