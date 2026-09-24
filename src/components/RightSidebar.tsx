import React, { useState, useRef, useEffect } from 'react';
import {
  Crown,
  ChevronRight,
  User,
  Sliders,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Send,
  MapPin,
  CalendarCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { UserProfile, ChatMessage, Club } from '../types';

interface RightSidebarProps {
  user: UserProfile;
  clubs: Club[];
  onOpenProfileModal: () => void;
  onOpenPreferencesModal: () => void;
  onOpenNotifications: () => void;
  onOpenPrivacyModal: () => void;
  onOpenHelpModal: () => void;
  onOpenBookReservation: (clubId?: string) => void;
  onNavigateToTab: (tab: 'explore' | 'featured' | 'favorites' | 'itinerary' | 'messages' | 'assistant' | 'upgrade') => void;
  unreadNotificationsCount: number;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  user,
  clubs,
  onOpenProfileModal,
  onOpenPreferencesModal,
  onOpenNotifications,
  onOpenPrivacyModal,
  onOpenHelpModal,
  onOpenBookReservation,
  onNavigateToTab,
  unreadNotificationsCount
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hi Alex! 👋 I can help you find clubs, make reservations, or manage your account. What would you like to do?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('near me') || lower.includes('find a club') || lower.includes('location')) {
        reply = `You have 4 world-class clubs in Miami Beach right now: The Bath Club (5937 Collins Ave), The Surf Club in Surfside, Soho Beach House on Mid-Beach, and Fisher Island Club. Would you like me to reserve a cabana or private dining table?`;
      } else if (lower.includes('reservation') || lower.includes('book') || lower.includes('table')) {
        reply = `I can book your preferred table or cabana instantly. The Bath Club and Soho Beach House both have prime sunset availability for your dates. Would you like me to open the reservation manager?`;
        onOpenBookReservation();
      } else if (lower.includes('itinerary') || lower.includes('trip') || lower.includes('schedule')) {
        reply = `Your "Miami Beach Getaway" (Apr 12–16) includes 4 exclusive club visits: Day 1 at The Bath Club, Day 2 at The Surf Club, Day 3 at Fisher Island Club, and Day 4 at Soho Beach House!`;
        onNavigateToTab('itinerary');
      } else if (lower.includes('profile') || lower.includes('account') || lower.includes('tier')) {
        reply = `Alex, your account is verified as a Premium Member with 12 completed club visits and reciprocal privileges worldwide. Opening your profile settings.`;
        onOpenProfileModal();
      } else {
        reply = `At your service, Alex. I have coordinated your requests with our club concierges. Let me know if you would like custom dining pairings, private boat transfers to Fisher Island, or priority daybed bookings.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <aside className="w-80 shrink-0 min-h-[calc(100vh-74px)] bg-[#08101a] border-l border-[#152232] p-4 flex flex-col gap-4 select-none">
      {/* Top Profile Card */}
      <div className="rounded-2xl bg-[#0c1624] border border-[#1b2b3f] p-4 shadow-xl">
        {/* User Header */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af65] shadow-lg shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-semibold text-slate-100">{user.name}</h3>
              <Crown className="w-3.5 h-3.5 text-[#e5c07b]" />
            </div>
            <span className="text-xs text-[#cfa85e] font-medium">{user.tier}</span>
            <span className="text-[11px] text-slate-400 truncate max-w-[160px]">{user.email}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#182639] text-center">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-100 leading-tight">{user.savedClubsCount}</span>
            <span className="text-[10px] text-slate-400 font-medium">Saved Clubs</span>
          </div>
          <div className="flex flex-col border-x border-[#1a273a]">
            <span className="text-lg font-bold text-slate-100 leading-tight">{user.visitsCount}</span>
            <span className="text-[10px] text-slate-400 font-medium">Visits</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-100 leading-tight">{user.upcomingCount}</span>
            <span className="text-[10px] text-slate-400 font-medium">Upcoming</span>
          </div>
        </div>

        {/* Profile Menu List */}
        <div className="mt-3.5 pt-2 border-t border-[#182639] space-y-1">
          <button
            onClick={() => onNavigateToTab('upgrade')}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold text-[#faebd0] bg-[#1a293d]/70 hover:bg-[#20344d] border border-[#d4af65]/40 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Crown className="w-3.5 h-3.5 text-[#d4af65]" />
              <span>Membership Plans & Upgrade</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#d4af65]" />
          </button>

          <button
            onClick={onOpenProfileModal}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121f2f] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d4af65]" />
              <span>Profile Information</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </button>

          <button
            onClick={onOpenPreferencesModal}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121f2f] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d4af65]" />
              <span>Preferences</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121f2f] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d4af65]" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              {unreadNotificationsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#df4b4b] text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
            </div>
          </button>

          <button
            onClick={onOpenPrivacyModal}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121f2f] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d4af65]" />
              <span>Privacy & Security</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </button>

          <button
            onClick={onOpenHelpModal}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121f2f] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d4af65]" />
              <span>Help & Support</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </button>

          <button
            onClick={() => alert('Log out session secured. In production, this ends the authenticated member session.')}
            className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-[#f87171] hover:bg-[#171f2a] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#f87171]" />
              <span>Log Out</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#f87171]" />
          </button>
        </div>
      </div>

      {/* Bottom Card: AI Club Assistant */}
      <div className="rounded-2xl bg-[#0c1624] border border-[#1b2b3f] flex-1 flex flex-col justify-between p-4 shadow-xl overflow-hidden min-h-[380px]">
        {/* Assistant Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#182639]">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#d4af65]/70 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
              alt="AI Club Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
              AI Club Assistant
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Chat / Messages Area */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1 max-h-[220px]"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1e344e] text-slate-100 rounded-br-xs border border-[#2b4b72]'
                    : 'bg-[#111e2f] text-slate-200 rounded-bl-xs border border-[#1b2e46]'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#111e2f] w-16 text-slate-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af65] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af65] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af65] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="space-y-1.5 pt-2 pb-2">
          <button
            onClick={() => handleSendMessage('Find a club near me')}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111d2b] hover:bg-[#18283a] text-slate-300 hover:text-white border border-[#1e2f42] text-[11px] font-medium transition-all text-left cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#d4af65] shrink-0" />
            <span className="truncate">Find a club near me</span>
          </button>

          <button
            onClick={() => {
              onOpenBookReservation();
              handleSendMessage('Make a reservation');
            }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111d2b] hover:bg-[#18283a] text-slate-300 hover:text-white border border-[#1e2f42] text-[11px] font-medium transition-all text-left cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#d4af65] shrink-0" />
            <span className="truncate">Make a reservation</span>
          </button>

          <button
            onClick={() => {
              onNavigateToTab('itinerary');
              handleSendMessage('Show my itinerary');
            }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111d2b] hover:bg-[#18283a] text-slate-300 hover:text-white border border-[#1e2f42] text-[11px] font-medium transition-all text-left cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#d4af65] shrink-0" />
            <span className="truncate">Show my itinerary</span>
          </button>

          <button
            onClick={() => {
              onOpenProfileModal();
              handleSendMessage('Update my profile');
            }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111d2b] hover:bg-[#18283a] text-slate-300 hover:text-white border border-[#1e2f42] text-[11px] font-medium transition-all text-left cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-[#d4af65] shrink-0" />
            <span className="truncate">Update my profile</span>
          </button>
        </div>

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center pt-2 border-t border-[#182639]"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your request..."
            className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#08101a] border border-[#1f3147] focus:border-[#d4af65] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#d4af65]/30 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 w-7 h-7 rounded-lg bg-[#d4af65] hover:bg-[#e2bd74] disabled:opacity-30 disabled:hover:bg-[#d4af65] text-[#110e08] flex items-center justify-center transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
};
