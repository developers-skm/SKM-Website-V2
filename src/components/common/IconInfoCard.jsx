export default function IconInfoCard({ icon, title, body }) {
  return (
    <div className="p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 rounded-[10px] flex flex-col gap-4 hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300 group">
      <div className="w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug">{title}</h3>
        <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[24px] m-0">{body}</p>
      </div>
    </div>
  );
}
