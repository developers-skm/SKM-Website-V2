import { useCallback, useEffect, useRef, useState } from 'react';

const HOVER_OPEN_DELAY = 150;
const HOVER_CLOSE_DELAY = 180;

// Shared open/close/outside-focus/Escape/hover-intent logic for desktop nav
// disclosures (NavDropdown, ProductsMegaMenu). No focus trap — Tab flows
// naturally through the panel and onward into the page, per the "these are
// navigation disclosures, not ARIA menus" contract.
export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const closeAndReturnFocus = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeAndReturnFocus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeAndReturnFocus]);

  // Close when focus moves outside both the trigger and the panel — covers
  // mouse-click-elsewhere and keyboard-tabbing past the last link.
  const handleFocusOut = useCallback((event) => {
    const next = event.relatedTarget;
    if (next && (triggerRef.current?.contains(next) || panelRef.current?.contains(next))) {
      return;
    }
    setIsOpen(false);
  }, []);

  // Optional hover-intent open/close — never the only way in (click/keyboard
  // always work via the trigger button itself).
  const handleMouseEnter = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(open, HOVER_OPEN_DELAY);
  }, [open]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(close, HOVER_CLOSE_DELAY);
  }, [close]);

  useEffect(() => () => clearTimeout(hoverTimerRef.current), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    closeAndReturnFocus,
    triggerRef,
    panelRef,
    handleFocusOut,
    handleMouseEnter,
    handleMouseLeave,
  };
}
