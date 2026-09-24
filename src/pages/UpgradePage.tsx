import React, { useState } from 'react';
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  Globe,
  CreditCard,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Info,
  X,
  FileText,
  ChevronRight,
  Download
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

export interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  recommended?: boolean;
  highlightColor?: string;
  features: string[];
  clubsCovered: string;
  guestPasses: string;
  conciergeType: string;
  bookingWindow: string;
}

const PLANS: PlanTier[] = [
  {
    id: 'essential',
    name: 'Essential Member',
    badge: 'Starter',
    monthlyPrice: 220,
    annualPrice: 2400,
    description: 'Curated entry for local residents seeking access to select private beach retreats.',
    features: [
      'Access to choice of 1 primary Miami Beach club',
      '7-day advance booking window for dining',
      'Standard AI booking concierge assistance',
      '2 guest passes included per month',
      'Access to beach wellness classes & court bookings'
    ],
    clubsCovered: '1 Local Club',
    guestPasses: '2 / month',
    conciergeType: 'AI Standard',
    bookingWindow: '7 Days'
  },
  {
    id: 'premium',
    name: 'Premium Member',
    badge: 'Current Tier',
    monthlyPrice: 440,
    annualPrice: 4800,
    description: 'Complete regional access to all 4 premier Miami Beach private club sanctuaries.',
    features: [
      'Access to all 4 Miami clubs: The Bath Club, The Surf Club, Fisher Island, Soho Beach House',
      '24/7 AI Club Concierge priority assistant',
      '48-hour priority dining table & daybed reservations',
      '4 guest passes included per month',
      'Access to Miami Art Basel & Boat Show preview galas',
      'Complimentary valet parking at all locations'
    ],
    clubsCovered: 'All 4 Miami Clubs',
    guestPasses: '4 / month',
    conciergeType: '24/7 AI Priority',
    bookingWindow: '48 Hours'
  },
  {
    id: 'platinum',
    name: 'Platinum Global Society',
    badge: 'Most Popular',
    recommended: true,
    monthlyPrice: 790,
    annualPrice: 8500,
    description: 'Seamless reciprocal access across 45+ premier clubs in NYC, London, Aspen, and Paris.',
    features: [
      'Reciprocal privileges at 45+ premier private clubs globally',
      'Dedicated WhatsApp Concierge Desk with human liaisons',
      'Guaranteed poolside daybed reservations (24-hr notice)',
      '8 guest passes included per month',
      'Complimentary Fisher Island private ferry priority boarding',
      '15% credit on private dining rooms & cabana rentals',
      'Invitation to exclusive member golf & tennis invitationals'
    ],
    clubsCovered: '45+ Global Clubs',
    guestPasses: '8 / month',
    conciergeType: 'Dedicated WhatsApp Liaison',
    bookingWindow: '24 Hours'
  },
  {
    id: 'founder',
    name: 'Black Diamond Founder',
    badge: 'Most Elite',
    monthlyPrice: 1350,
    annualPrice: 14500,
    description: 'The pinnacle of private society privileges, sovereign access, and bespoke luxury.',
    features: [
      'Unlimited global reciprocal access to 180+ private member clubs worldwide',
      'Dedicated human Private Executive Concierge (direct cell line)',
      'Unlimited Fisher Island private ferry passes & private yacht slip allocations',
      'Guaranteed oceanfront cabana allocation daily',
      'Formula 1 Miami Grand Prix VIP Paddock Club & Art Basel Founder Galas',
      'Unlimited guest passes with personal escort privileges',
      '$2,000 annual private helicopter & seaplane charter credit',
      'Handcrafted engraved Black Titanium member card'
    ],
    clubsCovered: '180+ Global Clubs',
    guestPasses: 'Unlimited',
    conciergeType: '24/7 Human Executive Liaison',
    bookingWindow: 'Instant / Guaranteed'
  },
  {
    id: 'syndicate',
    name: 'Corporate Syndicate',
    badge: 'Executive',
    monthlyPrice: 2200,
    annualPrice: 24000,
    description: 'Ultra-exclusive multi-card access tailored for executive partnerships and family offices.',
    features: [
      'Up to 4 Executive or Family member cards with primary privileges',
      'Private oceanfront boardroom & private salon bookings',
      'Dedicated corporate concierge director & group dining reservations',
      'Bespoke private sommelier tastings & yacht charter bookings',
      'Unrestricted global access to all 180+ network clubs',
      'Corporate tax invoicing & quarterly executive reporting'
    ],
    clubsCovered: '180+ Global (4 Cards)',
    guestPasses: 'Unlimited (x4)',
    conciergeType: 'Corporate Director Team',
    bookingWindow: 'Instant / Guaranteed'
  }
];

interface UpgradePageProps {
  user: UserProfile;
  onUpdateUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onAddNotification: (notif: NotificationItem) => void;
}

export const UpgradePage: React.FC<UpgradePageProps> = ({
  user,
  onUpdateUser,
  onAddNotification
}) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanTier | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'individual' | 'global' | 'executive'>('all');
  
  // Add-ons for checkout modal
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'amex' | 'apple' | 'wire'>('amex');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const ADDONS = [
    {
      id: 'yacht_slip',
      name: 'Private Yacht Slip Berth',
      desc: 'Guaranteed docking at Fisher Island & Surfside Marina',
      price: billingCycle === 'annual' ? 2500 : 250
    },
    {
      id: 'wine_vault',
      name: 'Sommelier Wine Vault Locker',
      desc: 'Climate-controlled private cellar storage (24 bottles)',
      price: billingCycle === 'annual' ? 1200 : 120
    },
    {
      id: 'heli_transfer',
      name: 'Miami Heli & Seaplane Pass',
      desc: '3 roundtrip South Beach to Bahamas/Key West transfers',
      price: billingCycle === 'annual' ? 3800 : 380
    }
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenCheckout = (plan: PlanTier) => {
    setSelectedPlanForCheckout(plan);
    setCheckoutSuccess(false);
    setSelectedAddons([]);
  };

  const calculateTotal = () => {
    if (!selectedPlanForCheckout) return 0;
    const base = billingCycle === 'annual'
      ? selectedPlanForCheckout.annualPrice
      : selectedPlanForCheckout.monthlyPrice;
    
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const match = ADDONS.find((a) => a.id === addonId);
      return sum + (match ? match.price : 0);
    }, 0);

    return base + addonsTotal;
  };

  const handleConfirmUpgrade = () => {
    if (!selectedPlanForCheckout) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);

      // Update user tier
      onUpdateUser((prev) => ({
        ...prev,
        tier: selectedPlanForCheckout.name
      }));

      // Send confirmation notification
      onAddNotification({
        id: `upgrade-${Date.now()}`,
        title: `Membership Upgraded to ${selectedPlanForCheckout.name}!`,
        description: `Welcome to ${selectedPlanForCheckout.name} status. Your global credentials, reciprocal privileges, and concierge privileges are now active.`,
        time: 'Just now',
        read: false,
        type: 'system'
      });
    }, 1200);
  };

  const filteredPlans = PLANS.filter((plan) => {
    if (activeCategory === 'individual') return plan.id === 'essential' || plan.id === 'premium';
    if (activeCategory === 'global') return plan.id === 'platinum' || plan.id === 'founder';
    if (activeCategory === 'executive') return plan.id === 'founder' || plan.id === 'syndicate';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-74px)] overflow-y-auto bg-[#070e17] text-slate-100 p-5 sm:p-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto w-full text-center pt-2 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182638] border border-[#d4af65]/40 text-[#faebd0] text-xs font-semibold mb-4 shadow-lg">
          <Crown className="w-3.5 h-3.5 text-[#d4af65]" />
          <span>Clubs & Co Global Society • Private Membership Tiers</span>
        </div>

        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
          Select Your Membership Plan
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light leading-relaxed">
          From local Miami Beach sanctuary access to sovereign reciprocal privileges across 180+ premier clubs worldwide.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-[#0c1624] border border-[#1d2f44] shadow-xl">
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              billingCycle === 'annual'
                ? 'gold-gradient-btn shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/40 text-amber-200 font-extrabold uppercase">
              Save 15%
            </span>
          </button>
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'gold-gradient-btn shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly Billing
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All Membership Plans' },
            { id: 'individual', label: 'Miami Beach Local' },
            { id: 'global', label: 'Global Reciprocal' },
            { id: 'executive', label: 'Founder & Syndicate' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1a2c42] text-[#faebd0] border border-[#d4af65]/60'
                  : 'bg-[#0d1726] text-slate-400 border border-[#192b40] hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 pb-10">
        {filteredPlans.map((plan) => {
          const isCurrentTier = user.tier.toLowerCase() === plan.name.toLowerCase();
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.recommended
                  ? 'bg-gradient-to-b from-[#15253b] via-[#0e1a2b] to-[#09111d] border-2 border-[#d4af65] shadow-[0_0_35px_rgba(212,175,101,0.25)] scale-[1.02] z-10'
                  : isCurrentTier
                  ? 'bg-[#0e1a2b] border-2 border-[#375270] shadow-xl'
                  : 'bg-[#0c1624] border border-[#1c2e42] hover:border-[#d4af65]/60 hover:shadow-2xl'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${
                    plan.recommended
                      ? 'bg-[#d4af65] text-[#120e06]'
                      : isCurrentTier
                      ? 'bg-[#29425f] text-[#c9e0ff] border border-[#48698e]'
                      : 'bg-[#15253a] text-[#cca55e] border border-[#d4af65]/30'
                  }`}
                >
                  {isCurrentTier ? 'Active Plan' : plan.badge}
                </div>
              )}

              <div>
                {/* Title & Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      plan.recommended
                        ? 'bg-[#292419] border border-[#d4af65] text-[#d4af65]'
                        : 'bg-[#132235] border border-[#22364c] text-slate-300'
                    }`}
                  >
                    <Crown className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif-luxury text-base font-bold text-slate-100">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-5 pb-5 border-b border-[#18283a]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif-luxury text-3xl font-bold text-slate-100">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {billingCycle === 'annual' ? 'yr' : 'mo'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="text-[11px] text-[#cca55e] font-medium mt-1">
                      Equivalent to ${Math.round(plan.annualPrice / 12).toLocaleString()}/month
                    </div>
                  )}
                </div>

                {/* Key Metrics Quick List */}
                <div className="py-4 space-y-2 text-xs border-b border-[#18283a]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Clubs:</span>
                    <span className="font-semibold text-slate-200">{plan.clubsCovered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Guest Passes:</span>
                    <span className="font-semibold text-slate-200">{plan.guestPasses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booking:</span>
                    <span className="font-semibold text-slate-200">{plan.bookingWindow}</span>
                  </div>
                </div>

                {/* Detailed Features */}
                <div className="mt-4 space-y-2.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Included Privileges
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#d4af65] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4">
                {isCurrentTier ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-[#142233] border border-[#23384e] text-slate-300 text-xs font-bold cursor-not-allowed text-center flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af65]" />
                    <span>Your Current Tier</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenCheckout(plan)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                      plan.recommended
                        ? 'gold-gradient-btn text-[#110e08]'
                        : 'bg-[#152538] hover:bg-[#1d324c] border border-[#273d57] text-slate-100'
                    }`}
                  >
                    <span>{plan.annualPrice > 4800 ? 'Upgrade to Plan' : 'Select Plan'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="max-w-7xl mx-auto w-full mt-8 bg-[#0a1421] border border-[#18293d] rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#18293d]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af65] font-semibold">
              Privilege Comparison
            </span>
            <h2 className="font-serif-luxury text-2xl font-bold text-slate-100 mt-0.5">
              Comprehensive Feature Breakdown
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            All memberships include encrypted member ID and 24/7 account liaison.
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-[#1b2d42] text-slate-400">
                <th className="pb-4 font-semibold">Society Privilege</th>
                <th className="pb-4 font-semibold">Essential</th>
                <th className="pb-4 font-semibold text-[#d4af65]">Premium (Current)</th>
                <th className="pb-4 font-semibold">Platinum Global</th>
                <th className="pb-4 font-semibold text-amber-300">Black Diamond</th>
                <th className="pb-4 font-semibold">Syndicate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152438]">
              <tr>
                <td className="py-3.5 font-medium text-slate-200">Miami Beach 4-Club Access</td>
                <td className="py-3.5 text-slate-400">1 Club Only</td>
                <td className="py-3.5 text-[#d4af65] font-semibold">Full Circuit (4)</td>
                <td className="py-3.5">Full Circuit (4)</td>
                <td className="py-3.5 text-amber-300 font-semibold">Full Circuit (4)</td>
                <td className="py-3.5">Full Circuit (4 Cards)</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-slate-200">Global Reciprocal Network</td>
                <td className="py-3.5 text-slate-500">—</td>
                <td className="py-3.5 text-slate-500">—</td>
                <td className="py-3.5 text-slate-100">45+ Premier Clubs</td>
                <td className="py-3.5 text-amber-300 font-semibold">180+ Worldwide</td>
                <td className="py-3.5">180+ Worldwide</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-slate-200">Concierge Protocol</td>
                <td className="py-3.5">AI Standard</td>
                <td className="py-3.5 text-[#d4af65]">24/7 AI Priority</td>
                <td className="py-3.5">Dedicated WhatsApp</td>
                <td className="py-3.5 text-amber-300 font-semibold">Private Executive Liaison</td>
                <td className="py-3.5">Director Team</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-slate-200">Dining & Cabana Window</td>
                <td className="py-3.5">7 Days</td>
                <td className="py-3.5 text-[#d4af65]">48 Hours</td>
                <td className="py-3.5">24 Hours</td>
                <td className="py-3.5 text-amber-300 font-semibold">Guaranteed Same-Day</td>
                <td className="py-3.5">Guaranteed / Salon</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-slate-200">Fisher Island Ferry & Slips</td>
                <td className="py-3.5 text-slate-500">—</td>
                <td className="py-3.5">Discounted Ferry</td>
                <td className="py-3.5">Complimentary Ferry</td>
                <td className="py-3.5 text-amber-300 font-semibold">Ferry + Yacht Berths</td>
                <td className="py-3.5">Ferry + Yacht Berths</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-slate-200">VIP Galas (Art Basel & F1)</td>
                <td className="py-3.5 text-slate-500">—</td>
                <td className="py-3.5">Preview Access</td>
                <td className="py-3.5">VIP Invitation</td>
                <td className="py-3.5 text-amber-300 font-semibold">Paddock Club VIP</td>
                <td className="py-3.5">Paddock Club VIP (x4)</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-slate-200">Charter Flight / Heli Credit</td>
                <td className="py-3.5 text-slate-500">—</td>
                <td className="py-3.5 text-slate-500">—</td>
                <td className="py-3.5">10% Off Charters</td>
                <td className="py-3.5 text-amber-300 font-semibold">$2,000 Annual Credit</td>
                <td className="py-3.5">$5,000 Annual Credit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0c1624] border border-[#21354e] shadow-2xl text-slate-100 p-6 sm:p-7 flex flex-col max-h-[92vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setSelectedPlanForCheckout(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#08101a] hover:bg-[#142337] border border-[#23354c] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            {!checkoutSuccess ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-[#262117] border border-[#d4af65] flex items-center justify-center text-[#d4af65]">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#d4af65] font-semibold">
                      Membership Upgrade
                    </span>
                    <h2 className="font-serif-luxury text-xl font-bold text-slate-100">
                      {selectedPlanForCheckout.name}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2">
                  Review your membership configuration, select optional society privileges, and confirm activation.
                </p>

                {/* Plan Summary Box */}
                <div className="mt-4 p-4 rounded-2xl bg-[#0f1b2b] border border-[#1e324a] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400">
                      Billing Cycle: <span className="capitalize text-slate-200">{billingCycle}</span>
                    </span>
                    <div className="text-xl font-bold font-serif-luxury text-[#faebd0] mt-0.5">
                      ${(billingCycle === 'annual'
                        ? selectedPlanForCheckout.annualPrice
                        : selectedPlanForCheckout.monthlyPrice
                      ).toLocaleString()}
                      <span className="text-xs font-normal text-slate-400">
                        {' '}/ {billingCycle === 'annual' ? 'yr' : 'mo'}
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#18283a] border border-[#28415d] text-[11px] font-semibold text-[#d4af65]">
                    Instant Activation
                  </div>
                </div>

                {/* Optional Curated Add-ons */}
                <div className="mt-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    Optional Society Add-ons
                  </label>
                  <div className="space-y-2.5">
                    {ADDONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);

                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleToggleAddon(addon.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-[#15253b] border-[#d4af65] shadow-md'
                              : 'bg-[#0b1420] border-[#1a2c40] hover:border-[#27405c]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isChecked
                                  ? 'bg-[#d4af65] border-[#d4af65] text-black'
                                  : 'border-slate-500 bg-transparent'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">{addon.name}</div>
                              <div className="text-[11px] text-slate-400">{addon.desc}</div>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-[#faebd0] text-right">
                            +${addon.price.toLocaleString()}
                            <span className="text-[10px] text-slate-400 font-normal">
                              /{billingCycle === 'annual' ? 'yr' : 'mo'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mt-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('amex')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        paymentMethod === 'amex'
                          ? 'bg-[#152438] border-[#d4af65] text-slate-100'
                          : 'bg-[#0a121e] border-[#1a2c40] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#d4af65]" />
                      <div className="mt-2 text-xs font-bold">Amex Centurion</div>
                      <div className="text-[10px] text-slate-400">•••• 8842</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        paymentMethod === 'apple'
                          ? 'bg-[#152438] border-[#d4af65] text-slate-100'
                          : 'bg-[#0a121e] border-[#1a2c40] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-[#d4af65]" />
                      <div className="mt-2 text-xs font-bold">Apple Pay</div>
                      <div className="text-[10px] text-slate-400">One-touch biometric</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wire')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        paymentMethod === 'wire'
                          ? 'bg-[#152438] border-[#d4af65] text-slate-100'
                          : 'bg-[#0a121e] border-[#1a2c40] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#d4af65]" />
                      <div className="mt-2 text-xs font-bold">Bank Wire</div>
                      <div className="text-[10px] text-slate-400">Concierge invoice</div>
                    </button>
                  </div>
                </div>

                {/* Total Calculation */}
                <div className="mt-6 p-4 rounded-2xl bg-[#08101a] border border-[#18283a] space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Base Tier:</span>
                    <span className="text-slate-200">
                      ${(billingCycle === 'annual'
                        ? selectedPlanForCheckout.annualPrice
                        : selectedPlanForCheckout.monthlyPrice
                      ).toLocaleString()}
                    </span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Add-ons ({selectedAddons.length}):</span>
                      <span className="text-slate-200">
                        +$
                        {selectedAddons
                          .reduce((sum, id) => {
                            const a = ADDONS.find((x) => x.id === id);
                            return sum + (a ? a.price : 0);
                          }, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#1b2b3d] flex justify-between items-center text-sm font-bold text-slate-100 font-serif-luxury">
                    <span>Total Due Today:</span>
                    <span className="text-lg text-[#faebd0]">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPlanForCheckout(null)}
                    className="flex-1 py-3 rounded-xl bg-[#111c2a] hover:bg-[#18283a] text-xs font-semibold text-slate-300 transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={handleConfirmUpgrade}
                    className="flex-2 py-3 rounded-xl gold-gradient-btn text-xs font-bold text-[#110e08] shadow-lg active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Activating Membership...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm & Activate Upgrade</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Celebratory Success View */
              <div className="text-center py-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af65] to-[#fceac4] text-[#120e06] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_#d4af65]">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af65] font-bold">
                  Status Confirmed
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                  Welcome to {selectedPlanForCheckout.name}
                </h2>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                  Congratulations, Alex Vance. Your status upgrade has been processed and encrypted into your Clubs & Co Digital Passport.
                </p>

                {/* Digital Membership Pass Card Preview */}
                <div className="mt-6 max-w-sm mx-auto p-5 rounded-2xl bg-gradient-to-br from-[#16273c] to-[#0a121e] border border-[#d4af65]/80 shadow-2xl text-left relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-[#d4af65]">Member Card</div>
                      <div className="font-serif-luxury text-base font-bold text-slate-100">{user.name}</div>
                    </div>
                    <Crown className="w-5 h-5 text-[#d4af65]" />
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Tier Level</div>
                      <div className="font-bold text-[#faebd0]">{selectedPlanForCheckout.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-slate-400 uppercase">Passport ID</div>
                      <div className="font-mono text-[11px] text-slate-300">CC-8842-MIA</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      alert('Membership receipt downloaded to your files (PDF). Transaction ID: #TX-9938210');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#132235] hover:bg-[#1a2d44] border border-[#22364c] text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af65]" />
                    <span>Download Receipt</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlanForCheckout(null)}
                    className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold text-[#110e08] shadow-md cursor-pointer active:scale-95"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
