import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import OfflineEggPng from '../../assets/images/offline-cracked-wifi-egg.png?inline';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export default function OfflinePage({ onPageChange, targetPage = 'home' }) {
  const { isOnline, isChecking, checkConnection } = useNetworkStatus();
  const [errorMessage, setErrorMessage] = useState('');
  const [reconnected, setReconnected] = useState(false);
  const [imageSrc, setImageSrc] = useState(OfflineEggPng || '/images/offline-cracked-wifi-egg.png');

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
      setErrorMessage('Still offline. Please check your internet connection and try again.');
    }
  };

  const handleImageError = () => {
    if (imageSrc !== '/images/offline-cracked-wifi-egg.png') {
      setImageSrc('/images/offline-cracked-wifi-egg.png');
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center overflow-x-hidden bg-page px-6 sm:px-12 lg:px-16 py-12 lg:py-0 select-none">
      <SEO
        title="Offline | SKM Egg Products"
        description="No internet connection detected. Please check your connection and try again."
        noindex
      />

      {/* Subtle Warm Radial Ambient Background Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(228, 10, 24, 0.05) 0%, rgba(243, 201, 105, 0.04) 50%, transparent 80%)',
        }}
      />

      {/* Extremely faint architectural grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-600) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-600) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main Content Layout Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 my-auto pt-16 lg:pt-0">
        
        {/* Left Side (Desktop): Bespoke Integrated PNG Hero Visual (No card frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full lg:w-1/2 flex items-center justify-center"
        >
          <motion.div
            animate={
              isChecking
                ? { scale: [1, 1.03, 1], rotate: [0, -1, 1, 0] }
                : { y: [0, -8, 0] }
            }
            transition={
              isChecking
                ? { duration: 1, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] max-w-full aspect-square flex items-center justify-center group"
          >
            {/* Soft Ambient Soft Glow behind Egg Visual */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-600/20 via-gold-400/25 to-transparent blur-3xl opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Integrated PNG Hero Image - Breathing freely without heavy card frame */}
            <img
              src={imageSrc}
              alt="SKM Offline — Connection cracked concept"
              onError={handleImageError}
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* Right Side (Desktop) / Centered (Mobile): Content & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50/80 border border-brand-200/50 text-brand-700 font-bold text-xs tracking-widest uppercase mb-6 shadow-xs backdrop-blur-sm"
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
            <span>{reconnected ? 'RECONNECTED' : 'OFFLINE'}</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-surface-900 tracking-tight leading-[1.15] mb-4">
            Looks like the connection cracked.
          </h1>

          {/* Supporting Description */}
          <p className="text-surface-600 text-base sm:text-lg leading-relaxed max-w-md lg:max-w-lg mb-8">
            We couldn't connect to the SKM website. Check your internet connection and try again.
          </p>

          {/* Inline Error / Reconnection Feedback Message */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md mb-6"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-sm font-medium text-left">
                  <svg className="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                className="w-full max-w-md mb-6"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm font-medium text-left">
                  <svg className="w-5 h-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Connection restored! Restoring page...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons: Primary Dominant CTA + Quiet Secondary Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Primary CTA: Try Again */}
            <button
              onClick={handleTryAgain}
              disabled={isChecking || reconnected}
              className="btn-primary-red focus-gold w-full sm:w-auto min-w-[180px] justify-center text-center py-4 px-8 text-sm font-bold tracking-wider uppercase disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all rounded-xl"
              aria-label="Try re-establishing internet connection"
            >
              {isChecking ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Checking connection...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  Try Again
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              )}
            </button>

            {/* Secondary Quiet Action: Back to Home */}
            <button
              onClick={() => onPageChange && onPageChange('home')}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-surface-600 hover:text-brand-600 transition-colors py-2 px-3 group"
            >
              <span>Back to Home</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
