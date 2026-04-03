export const InputGroupIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary dark:group-focus-within:text-white transition-colors">
    {children}
  </div>
);