// Factories so per-section stagger/spring tuning stays expressible as a
// one-line diff instead of a re-inlined object literal in every file.
export const makeContainerVariants = (staggerChildren = 0.08, extraTransition = {}) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, ...extraTransition } },
});

export const makeItemVariants = ({ y = 20, stiffness = 90, damping = 15 } = {}) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness, damping } },
});

export const containerVariants = makeContainerVariants();
export const itemVariants = makeItemVariants();
