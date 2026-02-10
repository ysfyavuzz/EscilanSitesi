/**
 * Customer Messages Page
 *
 * Real-time messaging interface for customers within the dashboard.
 * Uses WebSocket-based live chat for communication with escorts.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 *
 * @module pages/customer/CustomerMessages
 * @category Pages - Customer Dashboard
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessagesPanel } from '@/components/MessagesPanel';
import { ChatWindow } from '@/components/ChatWindow';
import { useChat } from '@/hooks/useChat';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import {
  MessageCircle,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  Info,
  MoreVertical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function CustomerMessages() {
  const { isAdmin } = useAuth();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [showConnectionStatus, setShowConnectionStatus] = useState(true);

  const {
    conversations,
    activeConversationId,
    messages,
    isConnected,
    isConnecting,
    // error,
    // presences,
    // typingUsers,

    // Actions
    setActiveConversation,
    sendMessage,
    editMessage,
    deleteMessage,
    reactToMessage,
    markAsRead,
    // loadMoreMessages,
    pinConversation,
    unpinConversation,
    archiveConversation,
    // muteConversation,
    // unmuteConversation,
    // blockUser,
    // unblockUser,
    // startTyping,
    // stopTyping,
    // connect,
    // disconnect,
  } = useChat({
    autoReconnect: true,
    enablePresence: true,
  });

  // Auto-hide connection status after 3 seconds
  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => setShowConnectionStatus(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  // Get active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;
  const activeMessages = activeConversationId ? (messages[activeConversationId] || []) : [];

  // Connection status indicator
  const ConnectionStatus = () => (
    <AnimatePresence>
      {showConnectionStatus && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex justify-center"
        >
          <Badge
            variant={isConnected ? 'default' : 'destructive'}
            className="flex items-center gap-2 shadow-lg backdrop-blur-md bg-opacity-80"
          >
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3" />
                Çevrimiçi
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                {isConnecting ? 'Bağlanıyor...' : 'Çevrimdışı'}
              </>
            )}
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Mesajlarım | Müşteri Paneli"
          description="Escortlar ile olan mesajlaşmalarınızı yönetin."
        />
        
        <div className="relative h-[calc(100vh-12rem)] min-h-[500px] flex flex-col">
          <ConnectionStatus />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Sidebar - Conversations List */}
            <Card className="lg:col-span-1 overflow-hidden glass border-white/10">
              <MessagesPanel
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={(id) => {
                  setActiveConversation(id);
                  // Mark as read when switching conversation
                  const conv = conversations.find(c => c.id === id);
                  if (conv && conv.unreadCount > 0) {
                    const lastMessage = messages[id]?.[0];
                    if (lastMessage) {
                      markAsRead(id, lastMessage.id);
                    }
                  }
                }}
                onPinConversation={pinConversation}
                onUnpinConversation={unpinConversation}
                onArchiveConversation={archiveConversation}
                onStartNewChat={() => setIsNewChatModalOpen(true)}
                className="bg-transparent"
              />
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 overflow-hidden glass border-white/10 flex flex-col">
              <ChatWindow
                conversation={activeConversation}
                messages={activeMessages}
                onSendMessage={(content, type, attachments) => activeConversationId ? sendMessage(activeConversationId, content, type, attachments) : Promise.resolve()}
                onEditMessage={editMessage}
                onDeleteMessage={deleteMessage}
                onReactToMessage={reactToMessage}
                onCall={() => {}}
                onVideoCall={() => {}}
                onShowInfo={() => {}}
                isMobile={false}
                className="bg-transparent"
              />
            </Card>
          </div>
        </div>

        {/* New Chat Modal */}
        <AnimatePresence>
          {isNewChatModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
              onClick={() => setIsNewChatModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0a0a0f] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-bold font-orbitron mb-2">Yeni Sohbet Başlat</h2>
                  <p className="text-muted-foreground">
                    Sohbet başlatmak için bir escort profili ziyaret edin
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full justify-start glass border-white/10 hover:bg-white/5" variant="outline" asChild>
                    <a href="/escorts">🔍 İlanlarda ara</a>
                  </Button>
                  <Button className="w-full justify-start glass border-white/10 hover:bg-white/5" variant="outline" asChild>
                    <a href="/favorites">⭐ Favorilerime git</a>
                  </Button>
                  <Button className="w-full justify-start glass border-white/10 hover:bg-white/5" variant="outline" asChild>
                    <a href="/catalog">📍 Yakındaki escortlar</a>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-4 text-gray-400 hover:text-white hover:bg-white/5"
                  onClick={() => setIsNewChatModalOpen(false)}
                >
                  İptal
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}