import React, { useState } from 'react';
import { Send, Phone, ShieldCheck, CheckCheck } from 'lucide-react';
import { MessageThread } from '../types';

interface MessagesPageProps {
  threads: MessageThread[];
  onSendMessage: (threadId: string, text: string) => void;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({
  threads,
  onSendMessage
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const currentThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentThread) return;
    onSendMessage(currentThread.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-74px)] overflow-hidden bg-[#09111c]">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden border-b border-[#142233]">
        {/* Left Column: Thread List */}
        <div className="md:col-span-4 border-r border-[#152335] bg-[#08101a] flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-[#152335]">
            <h2 className="font-serif-luxury text-xl font-bold text-slate-100">
              Concierge Messages
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct private communications with your club hosts
            </p>
          </div>

          <div className="divide-y divide-[#132030]">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;

              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full p-4 flex items-start gap-3.5 text-left transition-colors cursor-pointer ${
                    isActive ? 'bg-[#0f1c2d] border-l-3 border-[#d4af65]' : 'hover:bg-[#0c1624]'
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#233852]">
                    <img
                      src={thread.avatar}
                      alt={thread.contactName}
                      className="w-full h-full object-cover"
                    />
                    {thread.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#08101a]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-100 truncate">
                        {thread.contactName}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {thread.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#cca55e] truncate mt-0.5">
                      {thread.contactRole}
                    </p>

                    <p className="text-xs text-slate-400 truncate mt-1">
                      {thread.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="md:col-span-8 flex flex-col h-full bg-[#0a1320]">
          {currentThread ? (
            <>
              {/* Header */}
              <div className="h-16 px-6 border-b border-[#152335] bg-[#0c1726] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#d4af65]/60">
                    <img
                      src={currentThread.avatar}
                      alt={currentThread.contactName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      {currentThread.contactName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3 h-3 text-[#d4af65]" />
                      <span>{currentThread.contactRole}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Connecting member private priority call to ${currentThread.contactName}...`)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#132235] hover:bg-[#1a2e46] text-xs font-medium text-[#faebd0] border border-[#233a54] transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af65]" />
                  <span>Request Call</span>
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentThread.messages.map((msg) => {
                  const isUser = msg.sender === 'user';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[75%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                          isUser
                            ? 'bg-[#1b2d42] text-slate-100 rounded-br-none border border-[#2b4464]'
                            : 'bg-[#101b2a] text-slate-200 rounded-bl-none border border-[#1d2f44]'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-[#d4af65]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSend}
                className="p-4 border-t border-[#152335] bg-[#0c1726] flex items-center gap-3"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${currentThread.contactName}...`}
                  className="flex-1 h-11 px-4 rounded-xl bg-[#08101a] border border-[#1e3046] focus:border-[#d4af65] text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#d4af65]/30"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="h-11 px-5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              Select a conversation to begin.
            </div>
          )}
        </div>
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
