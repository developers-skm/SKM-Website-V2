import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brandLogo from '../../assets/LOGO/logo3.png';
import { sendChatMessage } from '../../api/chatApi';

// Turn a URL like .../products/egg-albumen-powder into "Egg Albumen Powder"
const labelFromUrl = (url) => {
  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Home';
    if (segments.length === 1 && segments[0] === 'products') return 'All Products';
    return segments[segments.length - 1]
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  } catch {
    return url;
  }
};

// Knowledge-base URLs (skmegg.vercel.app/<section>/<slug>) -> real app routes
// (e.g. /products/egg-albumen-powder -> egg_albumen_powder).
const ROUTE_OVERRIDES = {
  'quality/food-safety-policy': 'policy',
  'branches': 'global_reach',
  'get-quote': 'get-quote',
  'contact-us': 'contact-us',
};

const pageFromUrl = (url) => {
  try {
    const path = new URL(url).pathname.replace(/^\/|\/$/g, '');
    if (!path) return 'home';
    if (ROUTE_OVERRIDES[path]) return ROUTE_OVERRIDES[path];
    return path.split('/').pop().replace(/-/g, '_');
  } catch {
    return null;
  }
};

const HR_SHORTCUT_PHRASE = 'vijayaganapathi access';

export default function Chatbot({ onPageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am EGGXA, your SKM Egg Products assistant. How can I help you today? Feel free to ask about our egg powders, liquids, quality standards, or global exports!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);


  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text || isTyping) return;

    if (!textToSend) {
      setInputValue('');
    }

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);

    // Hidden shortcut to the HR portal. It only navigates - the portal still
    // requires the server-side login - and the phrase never reaches the chat API.
    if (text.toLowerCase().replace(/\s+/g, ' ').trim() === HR_SHORTCUT_PHRASE) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Access granted. Welcome back, HR sir. Opening the HR portal…',
          timestamp: new Date()
        }
      ]);
      // End any earlier HR session first so the login screen always appears.
      const endSession = fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/hr/logout`, {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {});
      setTimeout(async () => {
        await endSession;
        setIsOpen(false);
        onPageChange?.('newhr');
      }, 1500);
      return;
    }

    setIsTyping(true);

    try {
      const data = await sendChatMessage(text);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.answer,
        sources: data.sources || [],
        actions: data.actions,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Chat history reset. How can I help you now?',
        timestamp: new Date()
      }
    ]);
    setInputValue('');
    setIsTyping(false);
  };

  // Helper to format text with bold and bullet points into HTML/React elements
  const renderMessageText = (text) => {
    // Hide internal product codes such as (Y1001) or [Y1001]
    const cleaned = text
      .replace(/\s*[([]\s*[A-Z]{1,3}\d{3,5}\s*[)\]]/g, '') // "(Y1001)"
      .replace(/\b[A-Z]{1,3}\d{3,5}\s*\(([^)]*)\)/g, '$1') // "Y1101 (Standard)" -> "Standard"
      .replace(/\b[A-Z]{1,3}\d{3,5}\b\s*/g, ''); // bare "Y1101"

    // Drop lines left empty by code removal ("-", "•", "1.") and headings
    // ("For Egg Yolk Powder:") that now have no list items under them.
    const rawLines = cleaned.split('\n');
    const isEmptyBullet = (l) => /^\s*(?:[•\-*]|\d+\.)?\s*$/.test(l);
    const isHeading = (l) => /:\s*$/.test(l.trim());
    const lines = rawLines.filter((l, i) => {
      if (/^\s*$/.test(l)) return true;
      if (isEmptyBullet(l)) return false;
      if (isHeading(l)) {
        const next = rawLines.slice(i + 1).find((n) => !/^\s*$/.test(n));
        return next !== undefined && !isEmptyBullet(next) && !isHeading(next);
      }
      return true;
    });

    // Reply was only codes: show a helpful message instead
    const stripped = lines.filter((l) => l.trim());
    if (stripped.length <= 1 && rawLines.filter((l) => l.trim()).length > 3) {
      return (
        <p className="m-0">
          We offer Whole Egg, Egg Albumen and Egg Yolk Powders in several grades. Tell us the product and your application, or share your requirements via the Contact page, and our team will recommend the right grade.
        </p>
      );
    }
    return lines.map((line, index) => {
      let content = line;
      
      // Handle Bullet Points
      const isBullet = content.trim().startsWith('•') || content.trim().startsWith('-') || /^\d+\./.test(content.trim());
      if (isBullet) {
        // Strip out bullet symbol for styling
        content = content.replace(/^[•\-\d+\.]\s*/, '');
      }

      // Parse bold tags **text**
      const parts = content.split(/\*\*(.*?)\*\*/g);
      const parsedElements = parts.map((part, partIdx) => {
        // Odd indexes are the matched groups inside **
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-semibold text-heading">{part}</strong>;
        }
        // Handle links within text [label](url)
        const linkParts = part.split(/\[(.*?)\]\((.*?)\)/g);
        if (linkParts.length > 1) {
          return linkParts.map((subPart, subIdx) => {
            if (subIdx % 3 === 1) {
              const url = linkParts[subIdx + 1];
              return (
                <a 
                  key={subIdx} 
                  href={url} 
                  className="text-brand-600 underline hover:text-brand-700 font-medium transition-colors"
                >
                  {subPart}
                </a>
              );
            } else if (subIdx % 3 === 2) {
              return null; // Skip url part
            }
            return subPart;
          });
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={index} className="flex items-start gap-2 my-1.5 pl-1">
            <span className="text-brand-600 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-600" />
            <span className="flex-grow">{parsedElements}</span>
          </div>
        );
      }

      return (
        <p key={index} className={index > 0 ? 'mt-2' : 'm-0'}>
          {parsedElements}
        </p>
      );
    });
  };

  return (
    <>
      {/* ── Floating Action Button (FAB) ────────────────────────────────── */}
      <div className="fab-chatbot fixed right-3 sm:right-[30px] z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-10 h-10 sm:w-[45px] sm:h-[45px] rounded-full bg-white hover:bg-brand-600 text-brand-600 hover:text-white cursor-pointer focus:outline-none transition-all duration-300 group"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18), inset 0 0 0 2px var(--color-brand-600)' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Toggle chatbot"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-5.5 h-5.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="bot"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Centered antenna */}
                <circle cx="12" cy="2" r="1.2" />
                <line x1="12" y1="3.2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                {/* Speech bubble with robot eye cutouts */}
                <path
                  fillRule="evenodd"
                  d="M4 5h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H14l-2 3-2-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M7 9.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z M14 9.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z"
                />
              </motion.svg>
            )}
          </AnimatePresence>

        </motion.button>
      </div>

      {/* ── Chat Window ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fab-scroll-top fixed left-[5%] right-[5%] sm:left-auto sm:right-[30px] z-50 w-auto sm:w-[400px] h-[520px] max-h-[65vh] sm:max-h-[75vh] flex flex-col rounded-2xl border border-[#eee] bg-white/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden font-sans text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white relative shadow-sm">
              <div className="flex items-center gap-3">
                {/* Brand Logo Avatar & Online Dot */}
                <div className="relative w-9.5 h-9.5 rounded-full bg-white flex items-center justify-center border border-white/20 p-1 flex-shrink-0 shadow-inner">
                  <img src={brandLogo} alt="SKM Logo" className="w-full h-full object-contain" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-brand-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm tracking-tight m-0">SKM Egg Expert</h4>
                  <p className="text-[11px] opacity-95 font-body m-0">EGGXA • Virtual Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white/90 hover:text-white focus:outline-none flex items-center justify-center"
                  title="Reset conversation"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white/90 hover:text-white focus:outline-none flex items-center justify-center"
                  title="Minimise chat"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Box */}
            <div
              data-lenis-prevent
              className="flex-grow min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 custom-scrollbar bg-surface-50/40"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border text-[13px] leading-relaxed font-body ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white border-brand-600 rounded-tr-none'
                        : 'bg-white text-surface-700 border-[#eee] rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <>
                        {renderMessageText(msg.text)}
                        {msg.actions?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.actions.map((act) => {
                              const cls = 'inline-flex items-center px-4 py-2 rounded-full bg-brand-600 text-[12px] font-semibold text-white hover:bg-brand-700 no-underline transition-colors cursor-pointer';
                              return act.href ? (
                                <a key={act.label} href={act.href} target="_blank" rel="noopener noreferrer" className={cls}>
                                  {act.label}
                                </a>
                              ) : (
                                <button
                                  key={act.label}
                                  type="button"
                                  onClick={() => {
                                    onPageChange?.(act.page, act.prefill);
                                    setIsOpen(false);
                                  }}
                                  className={cls}
                                >
                                  {act.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-surface-100">
                            <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-1">Explore Products</p>
                            <div className="flex flex-wrap gap-1.5">
                              {[...new Set(msg.sources)].map((src) => (
                                <a
                                  key={src}
                                  href={`/${pageFromUrl(src) ?? ''}`}
                                  onClick={(e) => {
                                    const page = pageFromUrl(src);
                                    if (!page || !onPageChange) return;
                                    e.preventDefault();
                                    onPageChange(page);
                                    setMessages((prev) => [
                                      ...prev,
                                      {
                                        id: `nav-${Date.now()}`,
                                        sender: 'bot',
                                        text: `Here is the ${labelFromUrl(src)} page! Let me know if you need anything else.`,
                                        timestamp: new Date()
                                      }
                                    ]);
                                    setIsOpen(false);
                                  }}
                                  className="inline-flex items-center px-2.5 py-1 rounded-full border border-brand-600/30 bg-brand-50 text-[11px] font-medium text-brand-600 hover:bg-brand-600 hover:text-white no-underline transition-colors"
                                >
                                  {labelFromUrl(src)}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#eee] rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>


            {/* Input Bar */}
            <div className="flex items-center px-4 py-2 border-t border-surface-100 bg-white gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about egg powders, liquid products..."
                className="flex-grow bg-transparent text-surface-800 placeholder-surface-400 text-[13px] py-2.5 focus:outline-none border-none"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !inputValue.trim()}
                className={`w-8.5 h-8.5 rounded-xl transition-all duration-200 flex items-center justify-center focus:outline-none flex-shrink-0 ${
                  inputValue.trim() && !isTyping
                    ? 'bg-brand-600 text-white shadow-[0_2px_8px_rgba(228, 10, 24,0.25)] hover:scale-105 cursor-pointer'
                    : 'bg-surface-100 text-surface-400 cursor-default'
                }`}
                title="Send message"
              >
                <svg
                  className="w-4 h-4 transform rotate-45 -translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
