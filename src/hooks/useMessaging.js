"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import messagesApi from "../utils/messagesApi";

export default function useMessaging() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [conversationsPagination, setConversationsPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [activeUserId, setActiveUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesPagination, setMessagesPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalMessages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [unreadCount, setUnreadCount] = useState(0);

  const loadingRef = useRef({});

  const getConversations = useCallback(async (page = 1, limit = 20) => {
    setError(null);
    const key = `conversations_${page}_${limit}`;
    if (loadingRef.current[key]) return;
    loadingRef.current[key] = true;
    setLoading(true);
    try {
      const { data } = await messagesApi.get(`/conversations`, {
        params: { page, limit },
      });
      setConversations(data.conversations || []);
      if (data.pagination) setConversationsPagination(data.pagination);
      return data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      loadingRef.current[key] = false;
      setLoading(false);
    }
  }, []);

  const getMessages = useCallback(async (userId, page = 1, limit = 50) => {
    if (!userId) return null;
    setError(null);
    const key = `messages_${userId}_${page}_${limit}`;
    if (loadingRef.current[key]) return;
    loadingRef.current[key] = true;
    setLoading(true);
    try {
      const { data } = await messagesApi.get(`/conversation/${userId}`, {
        params: { page, limit },
      });
      setActiveUserId(userId);
      setMessages(data.messages || []);
      if (data.pagination) setMessagesPagination(data.pagination);
      return data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      loadingRef.current[key] = false;
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async ({ recipientId, content, messageType = "text", replyTo = null, attachments = [] }) => {
      setError(null);
      setLoading(true);
      try {
        const payload = { recipientId, content, messageType, replyTo, attachments };
        const { data } = await messagesApi.post(`/send`, payload);
        if (activeUserId && recipientId === activeUserId) {
          setMessages((prev) => [
            ...prev,
            data.data,
          ]);
        }
        // Optimistically update conversations
        setConversations((prev) => {
          const conversationId = data?.data?.conversationId;
          const existing = prev.find((c) => c.conversationId === conversationId);
          if (!existing) return prev;
          const updated = { ...existing, lastMessage: data.data };
          return [updated, ...prev.filter((c) => c.conversationId !== conversationId)];
        });
        return data;
      } catch (e) {
        const detailed = e?.response?.data?.message || e?.response?.data?.error || e.message;
        setError(detailed);
        throw new Error(detailed);
      } finally {
        setLoading(false);
      }
    },
    [activeUserId]
  );

  const markAsRead = useCallback(async (messageId) => {
    if (!messageId) return;
    setError(null);
    try {
      await messagesApi.put(`/${messageId}/read`);
      setMessages((prev) => prev.map((m) => (m._id === messageId ? { ...m, isRead: true, readAt: new Date().toISOString() } : m)));
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const deleteMessage = useCallback(async (messageId) => {
    if (!messageId) return;
    setError(null);
    try {
      await messagesApi.delete(`/${messageId}`);
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const getUnreadCount = useCallback(async () => {
    setError(null);
    try {
      const { data } = await messagesApi.get(`/unread-count`);
      setUnreadCount(data.unreadCount || 0);
      return data.unreadCount || 0;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const getCustomers = useCallback(async ({ page = 1, limit = 20, search } = {}) => {
    setError(null);
    try {
      const { data } = await messagesApi.get(`/customers`, { params: { page, limit, search } });
      return data;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  useEffect(() => {
    // initial unread count
    getUnreadCount().catch(() => {});
  }, [getUnreadCount]);

  const state = useMemo(
    () => ({
      loading,
      error,
      conversations,
      conversationsPagination,
      activeUserId,
      messages,
      messagesPagination,
      unreadCount,
    }),
    [loading, error, conversations, conversationsPagination, activeUserId, messages, messagesPagination, unreadCount]
  );

  const api = useMemo(
    () => ({
      getConversations,
      getMessages,
      sendMessage,
      markAsRead,
      deleteMessage,
      getUnreadCount,
      getCustomers,
      setActiveUserId,
    }),
    [getConversations, getMessages, sendMessage, markAsRead, deleteMessage, getUnreadCount, getCustomers]
  );

  return { ...state, ...api };
}


