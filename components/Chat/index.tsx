"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ApiKeyModal } from "../ApiKeyModal";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyButton } from "../CopyButton";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "Hello! I'm here to help you with your development questions. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      setShowApiKeyModal(true);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleApiKeySubmit = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
    setShowApiKeyModal(false);
    setConnectionError(null);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setConnectionError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error occurred" }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from response body.");
      }

      let receivedText = "";
      const decoder = new TextDecoder();
      const modelMessageId = (Date.now() + 1).toString();

      // Add placeholder for streaming response
      setMessages(prev => [
        ...prev,
        {
          id: modelMessageId,
          role: "model",
          content: "",
          timestamp: new Date(),
        },
      ]);

      // Process streaming response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        receivedText += chunk;

        // Update the streaming message
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId
              ? { ...msg, content: receivedText }
              : msg
          )
        );
      }

      // Ensure we have some content
      if (!receivedText.trim()) {
        throw new Error("Empty response received from API");
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

      setConnectionError(errorMessage);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: `**Error**: ${errorMessage}\n\nPlease check your API key and try again.`,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, apiKey]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleQuickMessage = useCallback((message: string) => {
    setInput(message);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "1",
        role: "model",
        content: "Hello! I'm here to help you with your development questions. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
    setConnectionError(null);
  }, []);

  const quickMessages = [
    "How can I customize a Next.js template from your marketplace?",
    "What kind of SaaS templates do you offer?",
    "Can I get support for a template I purchased?",
    "How do I deploy a template from your platform?",
  ];

  return (
    <section className="min-h-screen py-20 lg:py-25 relative overflow-hidden">
      {/* Background with glassmorphic elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
            AI Development Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your intelligent coding companion
          </p>

          {/* Connection status */}
          {connectionError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300 max-w-md mx-auto"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{connectionError}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl p-8"
        >
          {/* Chat Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {apiKey ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKeyModal(true)}
                className="text-xs backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70"
              >
                API Key
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-xs backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70"
              >
                Clear Chat
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea
            ref={scrollAreaRef}
            className="h-[500px] mb-6 pr-4"
          >
            <div className="flex flex-col space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {message.role === "model" && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Avatar className="border-2 border-blue-200 dark:border-blue-800">
                          <AvatarFallback className={`bg-gradient-to-br ${message.isError
                              ? 'from-red-500 to-red-600'
                              : 'from-blue-500 to-blue-600'
                            } text-white`}>
                            {message.isError ? (
                              <AlertCircle className="w-4 h-4" />
                            ) : (
                              <Sparkles className="w-4 h-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="max-w-[85%]"
                    >
                      <Card
                        className={`${message.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-300 shadow-lg shadow-blue-500/25"
                            : message.isError
                              ? "backdrop-blur-sm bg-red-50/70 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800 shadow-lg"
                              : "backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-100 border-white/30 dark:border-gray-700/30 shadow-lg"
                          } transition-all duration-200 hover:shadow-xl`}
                      >
                        <CardContent className="p-4">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ node, ...props }) => (
                                  <p className="text-sm leading-relaxed break-words mb-2 last:mb-0" {...props} />
                                ),
                                code: ({ node, inline, ...props }: { node: any, inline?: boolean } & React.HTMLProps<HTMLElement>) => (
                                  inline ? (
                                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded break-words" {...props} />
                                  ) : (
                                    <code className="text-xs break-words whitespace-pre-wrap block bg-gray-100 dark:bg-gray-800 p-2 rounded" {...props} />
                                  )
                                ),
                                pre: ({ node, ...props }) => (
                                  <pre className="text-xs break-words whitespace-pre-wrap overflow-x-auto bg-gray-100 dark:bg-gray-800 p-2 rounded my-2" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                  <ul className="text-sm space-y-1 ml-4" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                  <ol className="text-sm space-y-1 ml-4" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                  <li className="text-sm" {...props} />
                                ),
                                h1: ({ node, ...props }) => (
                                  <h1 className="text-lg font-bold mb-2" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                  <h2 className="text-base font-semibold mb-2" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                  <h3 className="text-sm font-semibold mb-1" {...props} />
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20 dark:border-gray-700/30">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <CopyButton textToCopy={message.content} />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {message.role === "user" && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Avatar className="border-2 border-gray-200 dark:border-gray-700">
                          <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">
                            U
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-start gap-3"
                  >
                    <Avatar className="border-2 border-blue-200 dark:border-blue-800">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-white/30 dark:border-gray-700/30">
                      <CardContent className="p-4">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex items-center gap-3 p-2 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg"
          >
            <Input
              type="text"
              placeholder="Ask me anything about the site or web development..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 border-none bg-transparent px-4 py-3 focus:ring-0 focus:outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {quickMessages.map((message, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={() => handleQuickMessage(message)}
                disabled={isTyping}
                className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 rounded-full shadow-md hover:shadow-lg text-sm disabled:opacity-50"
              >
                {message.length > 50 ? `${message.substring(0, 47)}...` : message}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={showApiKeyModal}
          onClose={() => setShowApiKeyModal(false)}
          onSubmit={handleApiKeySubmit}
        />
      </div>
    </section>
  );
};

export default Chat;