import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import OfflineEggImg from '../../assets/images/offline-cracked-wifi-egg.png';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

function OfflineEggSvg() {
  return (
    <svg className="w-full h-full text-brand-600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="yolkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FAD961" />
          <stop offset="100%" stopColor="#F76B1C" />
        </radialGradient>
        <linearGradient id="eggShell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="wifiArc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E40A18" />
          <stop offset="50%" stopColor="#F3C969" />
          <stop offset="100%" stopColor="#E40A18" />
        </linearGradient>
      </defs>

      {/* Ambient background glow */}
      <circle cx="100" cy="115" r="70" fill="url(#yolkGlow)" opacity="0.2" filter="blur(20px)" />

      {/* Cracked Eggshell Base */}
      <path
        d="M55 130 C55 168, 145 168, 145 130 C145 118, 134 112, 128 118 L116 106 L105 118 L95 106 L84 118 L73 108 C67 116, 55 118, 55 130 Z"
        fill="url(#eggShell)"
        stroke="#CBD5E1"
        strokeWidth="2.5"
      />

      {/* Floating Golden Egg Yolk */}
      <circle cx="100" cy="112" r="22" fill="url(#yolkGlow)" />
      <circle cx="93" cy="105" r="6" fill="#FFFFFF" opacity="0.5" />

      {/* Wi-Fi Signal Arc 1 (Inner) */}
      <path
        d="M76 86 A 30 30 0 0 1 124 86"
        stroke="url(#wifiArc)"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Wi-Fi Signal Arc 2 (Middle) */}
      <path
        d="M62 70 A 48 48 0 0 1 138 70"
        stroke="url(#wifiArc)"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Wi-Fi Signal Arc 3 (Outer) */}
      <path
        d="M48 54 A 64 64 0 0 1 152 54"
        stroke="url(#wifiArc)"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function OfflinePage({ onPageChange, targetPage = 'home' }) {
  const { isOnline, isChecking, checkConnection } = useNetworkStatus();
  const [errorMessage, setErrorMessage] = useState('');
  const [reconnected, setReconnected] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Auto-restore when network connectivity returns
  useEffect(() => {
    if (isOnline && !isChecking && !reconnected) {
      setReconnected(true);
      const timer = setTimeout(() => {
        if (onPageChange) {
          onPageChange(targetPage || 'home');
        } else {
          window.location.reload();
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOnline, isChecking, reconnected, onPageChange, targetPage]);

  const handleTryAgain = async () => {
    setErrorMessage('');
    const online = await checkConnection();
    if (online) {
      setReconnected(true);
      setTimeout(() => {
        if (onPageChange) {
          onPageChange(targetPage || 'home');
        } else {
          window.location.reload();
        }
      }, 1000);
    } else {
      setErrorMessage('Unable to reconnect. Check your internet connection and try again.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-y-auto bg-page dark:bg-surface-950 px-4 pt-16 pb-12 sm:pt-20 sm:pb-16">
      <SEO
        title="Offline | SKM Egg Products"
        description="No internet connection detected. Please check your connection and try again."
        noindex
      />

      {/* Subtle SKM Radial Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 40%, rgba(228, 10, 24, 0.06) 0%, rgba(243, 201, 105, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* Decorative architectural grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-600) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-600) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-surface-900 border border-brand-200/60 dark:border-brand-900/50 text-brand-700 dark:text-brand-400 font-bold text-xs tracking-widest uppercase mb-6 shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                reconnected ? 'bg-emerald-400' : 'bg-brand-500'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                reconnected ? 'bg-emerald-500' : 'bg-brand-600'
              }`}
            />
          </span>
          {reconnected ? 'RECONNECTED' : 'OFFLINE'}
        </motion.div>

        {/* Hero Visual Container */}
        <motion.div
          animate={
            isChecking
              ? { scale: [1, 1.03, 1], rotate: [0, -1, 1, 0] }
              : { y: [0, -6, 0] }
          }
          transition={
            isChecking
              ? { duration: 1, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative w-44 h-44 sm:w-56 sm:h-56 aspect-square mb-6 group"
        >
          {/* Ambient Glow behind Image */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-brand-600/15 via-gold-400/20 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-80" />

          {/* Premium Image Frame */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)] bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm p-4 flex items-center justify-center">
            {!imgFailed ? (
              <img
                src={OfflineEggImg}
                alt="SKM Offline — Looks like the connection cracked visual concept"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-contain rounded-2xl select-none transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
            ) : (
              <OfflineEggSvg />
            )}
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight mb-2.5"
        >
          Looks like the connection cracked.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-surface-600 dark:text-surface-300 text-sm sm:text-base leading-relaxed max-w-md mb-6"
        >
          We couldn't connect to the SKM website. Check your internet connection and try again.
        </motion.p>

        {/* Inline Error / Reconnection Feedback Message */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md mb-5"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-sm font-medium text-left">
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}

          {reconnected && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md mb-5"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium text-left">
                <svg className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Connection restored! Restoring page...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* Primary CTA: Try Again */}
          <button
            onClick={handleTryAgain}
            disabled={isChecking || reconnected}
            className="btn-primary-red focus-gold w-full sm:w-auto min-w-[160px] justify-center text-center py-3.5 px-7 text-sm font-bold tracking-wider disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
            aria-label="Try re-establishing internet connection"
          >
            {isChecking ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Checking...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Try Again
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
            )}
          </button>

          {/* Secondary CTA: Back to Home */}
          <button
            onClick={() => onPageChange && onPageChange('home')}
            className="btn-outline-red focus-gold w-full sm:w-auto min-w-[150px] justify-center text-center py-3.5 px-6 text-sm font-bold tracking-wider"
          >
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
