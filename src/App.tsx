/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_CLUBS,
  INITIAL_ITINERARY,
  INITIAL_USER,
  INITIAL_THREADS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RESERVATIONS
} from './data/mockData';
import { Club, Itinerary, UserProfile, MessageThread, NotificationItem, Reservation } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { ExplorePage } from './pages/ExplorePage';
import { FeaturedClubsPage } from './pages/FeaturedClubsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { MessagesPage } from './pages/MessagesPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { UpgradePage } from './pages/UpgradePage';

// Modals
import { ClubDetailModal } from './components/Modals/ClubDetailModal';
import { ReservationModal } from './components/Modals/ReservationModal';
import { CreateItineraryModal } from './components/Modals/CreateItineraryModal';
import { ProfileModal } from './components/Modals/ProfileModal';
import { PreferencesModal } from './components/Modals/PreferencesModal';
import { UpgradeModal } from './components/Modals/UpgradeModal';
import { NotificationsDrawer } from './components/Modals/NotificationsDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [itinerary, setItinerary] = useState<Itinerary>(INITIAL_ITINERARY);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [detailClub, setDetailClub] = useState<Club | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationClubId, setReservationClubId] = useState<string | undefined>(undefined);
  const [isCreateItineraryOpen, setIsCreateItineraryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Toggle favorite on any club
  const handleToggleFavorite = (clubId: string) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const updated = { ...c, isFavorite: !c.isFavorite };
          return updated;
        }
        return c;
      })
    );

    // Update user saved clubs count
    setUser((prev) => {
      const willBeFavorite = !clubs.find((c) => c.id === clubId)?.isFavorite;
      const newCount = willBeFavorite ? prev.savedClubsCount + 1 : Math.max(0, prev.savedClubsCount - 1);
      return { ...prev, savedClubsCount: newCount };
    });
  };

  // Open reservation modal for specific club or general
  const handleOpenReservation = (clubId?: string) => {
    setReservationClubId(clubId || clubs[0]?.id);
    setIsReservationOpen(true);
  };

  // Add new reservation
  const handleAddReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);

    // Also notify
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Reservation Confirmed at ${newRes.clubName}`,
      description: `${newRes.seatingArea} booked for ${newRes.partySize} guests on ${newRes.date} at ${newRes.time}.`,
      time: 'Just now',
      read: false,
      type: 'reservation'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Increment user visits / upcoming
    setUser((prev) => ({
      ...prev,
      upcomingCount: prev.upcomingCount + 1
    }));
  };

  // Send message in Messages tab
  const handleSendMessage = (threadId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            timestamp: timeStr,
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                sender: 'user',
                text,
                timestamp: timeStr
              }
            ]
          };
        }
        return t;
      })
    );

    // Simulated host reply after 1.5s
    setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === threadId) {
            const hostReply = `Thank you Alex. Our member liaison has noted this and your request is expedited.`;
            return {
              ...t,
              lastMessage: hostReply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              messages: [
                ...t.messages,
                {
                  id: `reply-${Date.now()}`,
                  sender: 'contact',
                  text: hostReply,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]
            };
          }
          return t;
        })
      );
    }, 1500);
  };

  // Filter clubs if search query is entered
  const filteredClubs = clubs.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#080e16] text-slate-100 selection:bg-[#d4af65]/30">
      {/* Top Navbar */}
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        clubs={clubs}
        onSelectClub={(c) => setDetailClub(c)}
        onNavigateToExplore={() => setActiveTab('explore')}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onNavigateToFavorites={() => setActiveTab('favorites')}
        onOpenProfileMenu={() => setIsProfileOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main App Layout: Left Sidebar + Center Page Content + Right Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenUpgradeModal={() => setActiveTab('upgrade')}
          unreadMessagesCount={unreadMessagesCount}
        />

        {/* Center Content View */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {activeTab === 'explore' && (
            <ExplorePage
              clubs={filteredClubs}
              onSelectClub={(c) => setDetailClub(c)}
              onNavigateToFeatured={() => setActiveTab('featured')}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}

          {activeTab === 'featured' && (
            <FeaturedClubsPage
              clubs={filteredClubs}
              onSelectClub={(c) => setDetailClub(c)}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesPage
              clubs={filteredClubs}
              onSelectClub={(c) => setDetailClub(c)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'itinerary' && (
            <ItineraryPage
              itinerary={itinerary}
              clubs={clubs}
              onSelectClub={(c) => setDetailClub(c)}
              onCreateNewItinerary={() => setIsCreateItineraryOpen(true)}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesPage
              threads={threads}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeTab === 'assistant' && (
            <AIAssistantPage
              clubs={clubs}
              onSelectClub={(c) => setDetailClub(c)}
              onOpenReservation={handleOpenReservation}
              onNavigateToItinerary={() => setActiveTab('itinerary')}
            />
          )}

          {activeTab === 'upgrade' && (
            <UpgradePage
              user={user}
              onUpdateUser={setUser}
              onAddNotification={(notif) => setNotifications((prev) => [notif, ...prev])}
            />
          )}
        </main>

        {/* Right Sidebar - hidden on Explore, Featured, and Upgrade tabs to maximize layout width */}
        {activeTab !== 'explore' && activeTab !== 'featured' && activeTab !== 'upgrade' && (
          <RightSidebar
            user={user}
            clubs={clubs}
            onOpenProfileModal={() => setIsProfileOpen(true)}
            onOpenPreferencesModal={() => setIsPreferencesOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenPrivacyModal={() => alert('Privacy & Security: 2-Factor Biometric Authentication is enabled. Your member data is protected with end-to-end encryption.')}
            onOpenHelpModal={() => alert('Help & Support: For immediate assistance, your Private Club Concierge is available 24/7 via the AI Assistant or direct line +1 (800) 555-CLUB.')}
            onOpenBookReservation={handleOpenReservation}
            onNavigateToTab={setActiveTab}
            unreadNotificationsCount={unreadNotificationsCount}
          />
        )}
      </div>

      {/* Interactive Modals */}
      {detailClub && (
        <ClubDetailModal
          club={detailClub}
          onClose={() => setDetailClub(null)}
          onBookReservation={(id) => handleOpenReservation(id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        clubs={clubs}
        initialClubId={reservationClubId}
        onAddReservation={handleAddReservation}
      />

      <CreateItineraryModal
        isOpen={isCreateItineraryOpen}
        onClose={() => setIsCreateItineraryOpen(false)}
        clubs={clubs}
        onSaveItinerary={(newItin) => {
          setItinerary(newItin);
          setActiveTab('itinerary');
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={setUser}
      />

      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        user={user}
        onUpdateUser={setUser}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        user={user}
        onUpgradeTier={(tier) => setUser((u) => ({ ...u, tier }))}
        onNavigateToPlansPage={() => setActiveTab('upgrade')}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onSelectNotification={(item) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
          );
        }}
      />
    </div>
  );
}
