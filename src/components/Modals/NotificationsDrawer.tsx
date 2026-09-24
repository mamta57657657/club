import React from 'react';
import { X, Check, Bell, CalendarCheck, Sparkles, Shield } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'reservation':
        return <CalendarCheck className="w-4 h-4 text-[#d4af65]" />;
      case 'invitation':
        return <Sparkles className="w-4 h-4 text-[#ecc94b]" />;
      default:
        return <Bell className="w-4 h-4 text-[#63b3ed]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm h-full bg-[#0c1624] border-l border-[#20334a] shadow-2xl flex flex-col p-5 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-[#18283a]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#d4af65]" />
            <h3 className="font-serif-luxury text-lg font-bold">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#111e2f] hover:bg-[#182a40] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-xs text-slate-400">
            {notifications.filter((n) => !n.read).length} unread updates
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-xs font-semibold text-[#d4af65] hover:underline cursor-pointer"
          >
            Mark all read
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                item.read
                  ? 'bg-[#0e1928] border-[#18283a] opacity-75'
                  : 'bg-[#122033] border-[#223955] hover:border-[#d4af65]/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#0c1624] border border-[#20334a] shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    {item.description}
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-1.5 font-medium">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
