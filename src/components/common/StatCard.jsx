import useCountUp from '../../utils/useCountUp';

export default function StatCard({ value, label, animated = true }) {
  const { ref, display } = useCountUp(String(value));
  return (
    <div
      ref={animated ? ref : undefined}
      className="p-5 bg-brand-600/4 dark:bg-brand-950/20 border border-[rgba(228, 10, 24,0.10)] dark:border-brand-900/30 rounded-[10px] flex flex-col gap-1.5 shadow-[5px_3px_40px_rgba(0,72,88,0.05)]"
    >
      <span className="font-heading font-bold text-[20px] sm:text-[22px] text-brand-600 dark:text-brand-400 leading-tight">{animated ? display : value}</span>
      <span className="font-body text-[11px] font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wide leading-tight">{label}</span>
    </div>
  );
}
