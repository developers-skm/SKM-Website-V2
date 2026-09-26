import { useEffect } from 'react';

// document.body.style.overflow = 'hidden' alone doesn't stop background
// touch-scroll chaining on iOS/mobile browsers, so this also pins the body
// with position: fixed and restores the scroll offset on unlock.
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previousPosition = style.position;
    const previousTop = style.top;
    const previousLeft = style.left;
    const previousRight = style.right;
    const previousOverflow = style.overflow;

    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.right = '0';
    style.overflow = 'hidden';

    return () => {
      style.position = previousPosition;
      style.top = previousTop;
      style.left = previousLeft;
      style.right = previousRight;
      style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
