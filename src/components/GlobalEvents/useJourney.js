import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

// Timing (seconds). The flight is short; the EVENT stays for DISPLAY_SECONDS.
const START_DELAY_MS = 700;
const TRAVEL_SECONDS = 3.2;
const TRAVEL_DELAY = 0.25;
export const DISPLAY_SECONDS = 10;

// Pause / resume every running animation according to the current flags.
//  · hidden tab  → everything holds (timers never run while nobody can see them)
//  · user pause  → only the display timer holds; a flight in progress finishes
//                  and the plane then waits at its destination.
function syncPlayback(s) {
  s.controls.forEach(({ c, kind }) => {
    const hold = s.hidden || (kind === 'timer' && s.paused);
    if (hold) c.pause();
    else c.play();
  });
}

/**
 * Drives the events journey: India → stop 0 → stop 1 → … (each leg continues
 * from the previous stop). One animation is live at a time and every control
 * (next / previous / pin click / replay) cancels it first, so timers can never
 * stack. Position is exposed as motion values (travel, timer) so the
 * map can animate without re-rendering every frame.
 */
export default function useJourney({ count, active, reduce }) {
  const travel = useMotionValue(0); // 0→1 plane along the route (the trail grows with it)
  const timer = useMotionValue(0); // 0→1 event display time

  const [state, setState] = useState({ index: -1, phase: 'idle', leg: null });
  const [visited, setVisited] = useState([]);
  const [paused, setPaused] = useState(false);

  const run = useRef({
    last: -1, // stop the plane is currently at (-1 = India)
    target: -1,
    leg: 0,
    controls: [],
    paused: false,
    hidden: false,
    count,
  });

  // goTo calls itself when a stop's display time ends; reach it through a ref.
  const goToRef = useRef(null);

  const stopAll = useCallback(() => {
    run.current.controls.forEach(({ c }) => c.stop());
    run.current.controls = [];
  }, []);

  const goTo = useCallback(
    (target) => {
      const s = run.current;
      if (target < 0 || target >= s.count) return;
      stopAll();
      s.leg += 1;
      const id = s.leg;
      const from = s.last;
      s.target = target;

      setState({ index: target, phase: 'flying', leg: { id, from, to: target } });
      travel.set(0);
      timer.set(0);

      const arrive = () => {
        if (s.leg !== id) return;
        s.last = target;
        s.controls = [];
        setVisited((v) => (v.includes(target) ? v : [...v, target]));
        setState((st) => ({ ...st, phase: 'showing' }));

        const c = animate(timer, 1, {
          duration: DISPLAY_SECONDS,
          ease: 'linear',
          onComplete: () => {
            if (s.leg !== id) return;
            if (target < s.count - 1) goToRef.current(target + 1);
            else setState((st) => ({ ...st, phase: 'done' }));
          },
        });
        s.controls = [{ c, kind: 'timer' }];
        syncPlayback(s); // starts already paused if the user paused mid-flight
      };

      if (reduce) {
        // No flight: switch destination straight away.
        travel.set(1);
        arrive();
        return;
      }

      s.controls = [
        {
          c: animate(travel, 1, {
            duration: TRAVEL_SECONDS,
            delay: TRAVEL_DELAY,
            ease: [0.45, 0, 0.25, 1],
            onComplete: arrive,
          }),
          kind: 'flight',
        },
      ];
      syncPlayback(s);
    },
    [travel, timer, stopAll, reduce]
  );

  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  const next = useCallback(() => goTo(run.current.target + 1), [goTo]);
  const prev = useCallback(() => goTo(run.current.target - 1), [goTo]);

  const replay = useCallback(() => {
    run.current.last = -1;
    setVisited([]);
    goTo(0);
  }, [goTo]);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  // Keep the engine's flags in step with React state / the page.
  useEffect(() => {
    run.current.count = count;
  }, [count]);

  useEffect(() => {
    run.current.paused = paused;
    syncPlayback(run.current);
  }, [paused]);

  useEffect(() => {
    const onVisibility = () => {
      run.current.hidden = document.hidden;
      syncPlayback(run.current);
    };
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Start when the journey becomes active; fully reset when it ends / unmounts.
  useEffect(() => {
    if (!active || !count) return undefined;
    const s = run.current;
    const t = setTimeout(() => goTo(0), START_DELAY_MS);
    return () => {
      clearTimeout(t);
      stopAll();
      s.leg += 1;
      s.last = -1;
      s.target = -1;
      setState({ index: -1, phase: 'idle', leg: null });
      setVisited([]);
      setPaused(false);
    };
  }, [active, count, goTo, stopAll]);

  return {
    index: state.index,
    phase: state.phase,
    leg: state.leg,
    visited,
    paused,
    travel,
    timer,
    goTo,
    next,
    prev,
    replay,
    togglePause,
  };
}
