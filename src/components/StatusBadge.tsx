type Status = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

const statusConfig: Record<Status, { bg: string; text: string; dot: string }> = {
  Pending:    { bg: 'bg-amber-50',   text: 'text-amber-700',  dot: 'bg-amber-400' },
  Processing: { bg: 'bg-blue-50',    text: 'text-blue-700',   dot: 'bg-blue-400' },
  Shipped:    { bg: 'bg-purple-50',  text: 'text-purple-700', dot: 'bg-purple-400' },
  Delivered:  { bg: 'bg-[#d8f3dc]', text: 'text-[#1b4332]',  dot: 'bg-[#2d6a4f]' },
  Cancelled:  { bg: 'bg-red-50',     text: 'text-red-700',    dot: 'bg-red-400' },
};

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}
