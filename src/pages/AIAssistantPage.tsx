import React, { useState } from 'react';
import { Send, Sparkles, Compass, CalendarCheck, Shield, ChevronRight } from 'lucide-react';
import { Club } from '../types';

interface AIAssistantPageProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
  onOpenReservation: (clubId?: string) => void;
  onNavigateToItinerary: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  action?: {
    type: 'open_club' | 'open_reservation' | 'open_itinerary';
    label: string;
    clubId?: string;
  };
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  clubs,
  onSelectClub,
  onOpenReservation,
  onNavigateToItinerary
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Welcome Alex. I am your CLUBS & CO private AI Concierge. I have full knowledge of our worldwide private club network, dress codes, member privileges, and reservation allocations. How may I orchestrate your luxury experience today?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    'Dress code guidelines for The Surf Club',
    'Recommend a sunset beach cabana at The Bath Club',
    'How do I arrange private ferry access to Fisher Island?',
    'Book a dinner table at Cecconi’s at Soho Beach House'
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let action: Message['action'] | undefined = undefined;
      const lower = userText.toLowerCase();

      if (lower.includes('surf club') || lower.includes('dress code')) {
        reply = "At The Surf Club, daytime attire is Sophisticated Resort Casual (collared shirts, tailored linen). After 7:00 PM in the historic courtyard and The Surf Club Restaurant by Thomas Keller, Smart Elegant attire is required; blazers are requested for gentlemen. Sportswear and beach flip-flops are strictly restricted to poolside areas.";
        action = {
          type: 'open_club',
          label: 'Explore The Surf Club',
          clubId: 'the-surf-club'
        };
      } else if (lower.includes('bath club') || lower.includes('cabana')) {
        reply = "The Bath Club features 3 acres of pristine, private Atlantic beachfront with secluded cabanas attended by dedicated butlers. Daybed and cabana reservations include iced Dom Pérignon service and Mediterranean luncheon platters. Would you like me to reserve Cabana #4 for your upcoming visit?";
        action = {
          type: 'open_reservation',
          label: 'Reserve Bath Club Cabana',
          clubId: 'the-bath-club'
        };
      } else if (lower.includes('fisher island') || lower.includes('ferry') || lower.includes('access')) {
        reply = "Fisher Island is America's most exclusive private retreat. As a Premium Member, your private auto-ferry passes and yacht tender reservations can be dispatched directly to your mobile passbook. Terminal West check-in requires only your digital member credential.";
        action = {
          type: 'open_club',
          label: 'View Fisher Island Details',
          clubId: 'fisher-island-club'
        };
      } else if (lower.includes('cecconi') || lower.includes('soho')) {
        reply = "Cecconi’s Miami Beach offers refined Venetian dining under the illuminated silver buttonwood trees. Prime tables are reserved exclusively for members and house guests between 7:30 PM and 9:30 PM. I can secure a preferred table for you.";
        action = {
          type: 'open_reservation',
          label: 'Book Cecconi’s Table',
          clubId: 'soho-beach-house'
        };
      } else {
        reply = `Certainly, Alex. I have checked availability across our network. You currently have reciprocal access in Miami Beach, St. Tropez, London, and Aspen. I can manage reservations, curate your custom daily timeline, or arrange private yacht charters.`;
        action = {
          type: 'open_itinerary',
          label: 'View Current Itinerary'
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleActionClick = (action: Message['action']) => {
    if (!action) return;
    if (action.type === 'open_club' && action.clubId) {
      const club = clubs.find((c) => c.id === action.clubId);
      if (club) onSelectClub(club);
    } else if (action.type === 'open_reservation') {
      onOpenReservation(action.clubId);
    } else if (action.type === 'open_itinerary') {
      onNavigateToItinerary();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-74px)] overflow-hidden bg-[#09111c]">
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#18283a]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4af65] shrink-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                alt="AI Concierge"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury text-xl font-bold text-slate-100">
                  AI Club Concierge
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#16273c] text-[#d4af65] text-[10px] font-bold border border-[#d4af65]/40">
                  24/7 Member Desk
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Bespoke reservations, access protocols, and private itinerary arrangements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c1624] border border-[#1b2b3f] text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active & Encrypted</span>
          </div>
        </div>

        {/* Suggestion Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="text-left p-3 rounded-xl bg-[#0c1624] hover:bg-[#132235] border border-[#1b2b3f] hover:border-[#d4af65]/60 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <span className="truncate pr-2">{p}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#d4af65] shrink-0" />
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-lg ${
                    isAi
                      ? 'bg-[#0e1928] text-slate-200 border border-[#1b2d42] rounded-bl-xs'
                      : 'bg-[#1e344e] text-slate-100 border border-[#2b4c73] rounded-br-xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.action && (
                    <div className="mt-3 pt-3 border-t border-[#1e2f44]">
                      <button
                        onClick={() => handleActionClick(m.action)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg gold-gradient-btn text-xs font-semibold cursor-pointer active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{m.action.label}</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0e1928] w-24 text-slate-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#d4af65] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#d4af65] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#d4af65] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="mt-4 pt-3 border-t border-[#18283a] flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your concierge anything about clubs, dress codes, or reservations..."
            className="flex-1 h-12 px-4 rounded-xl bg-[#0c1624] border border-[#1e3147] focus:border-[#d4af65] text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#d4af65]/30"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-12 px-6 rounded-xl gold-gradient-btn text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <footer className="h-9 border-t border-[#142233] bg-[#070e17] px-6 flex items-center justify-center gap-8 text-[10px] tracking-[0.22em] text-[#718296] font-medium uppercase">
        <span>Exclusive Access</span>
        <span className="text-[#32455b]">/</span>
        <span>Luxury Lifestyle</span>
        <span className="text-[#32455b]">/</span>
        <span>Global Destinations</span>
      </footer>
    </div>
  );
};
