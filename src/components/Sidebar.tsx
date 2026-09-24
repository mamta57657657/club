import React from 'react';
import {
  Compass,
  Star,
  Heart,
  Calendar,
  MessageSquare,
  Sparkles,
  Crown
} from 'lucide-react';

export type NavTab = 'explore' | 'featured' | 'favorites' | 'itinerary' | 'messages' | 'assistant' | 'upgrade';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenUpgradeModal: () => void;
  unreadMessagesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenUpgradeModal,
  unreadMessagesCount
}) => {
  const navItems = [
    {
      id: 'explore' as NavTab,
      label: 'Explore',
      icon: Compass
    },
    {
      id: 'featured' as NavTab,
      label: 'Featured Clubs',
      icon: Star
    },
    {
      id: 'favorites' as NavTab,
      label: 'My Favorites',
      icon: Heart
    },
    {
      id: 'itinerary' as NavTab,
      label: 'Itinerary',
      icon: Calendar
    },
    {
      id: 'messages' as NavTab,
      label: 'Messages',
      icon: MessageSquare,
      badge: unreadMessagesCount
    },
    {
      id: 'assistant' as NavTab,
      label: 'AI Assistant',
      icon: Sparkles
    },
    {
      id: 'upgrade' as NavTab,
      label: 'Upgrade Plans',
      icon: Crown
    }
  ];

  return (
    <aside className="w-60 shrink-0 min-h-[calc(100vh-74px)] bg-[#08101a] border-r border-[#152232] flex flex-col justify-between p-4 select-none">
      {/* Navigation Links */}
      <nav className="space-y-1.5 pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer group ${
                isActive
                  ? 'bg-[#182638] text-[#faebd0] border-l-3 border-[#d4af65] shadow-sm'
                  : 'text-[#8797ab] hover:text-slate-100 hover:bg-[#0f1b2b]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#d4af65]' : 'text-[#708194] group-hover:text-slate-200'
                  }`}
                />
                <span className={isActive ? 'font-semibold tracking-wide' : ''}>
                  {item.label}
                </span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#c99b42] text-[11px] font-bold text-[#110e08] flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Premium Access Banner at bottom */}
      <div className="pt-4 border-t border-[#152335]">
        <div className="rounded-2xl p-4 bg-gradient-to-b from-[#111c2b] to-[#0c1521] border border-[#21354d]/70 flex flex-col items-start gap-2 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-[#27251e] border border-[#a88849]/50 flex items-center justify-center text-[#e6c47e] shadow-sm">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Premium Access</h4>
            <p className="text-xs text-slate-400 mt-0.5">Unlock exclusive benefits</p>
          </div>
          <button
            onClick={onOpenUpgradeModal}
            className="w-full mt-2 py-2 px-3 rounded-xl gold-gradient-btn text-xs font-bold tracking-wide shadow-md active:scale-95 cursor-pointer text-center"
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};
