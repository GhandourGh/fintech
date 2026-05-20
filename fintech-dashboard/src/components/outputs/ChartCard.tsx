import { motion } from 'framer-motion';
import { Download, ImageIcon } from 'lucide-react';
import type { GeneratedChart } from '../../data/generatedCharts';

type Props = {
  chart: GeneratedChart;
  imageUrl: string;
  index: number;
};

export function ChartCard({ chart, imageUrl, index }: Props) {
  const downloadName = `${chart.id}.png`;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = downloadName;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden shadow-sm hover:border-teal-500/25 transition-colors"
    >
      <div className="relative aspect-[16/10] bg-white p-3">
        <img
          src={imageUrl}
          alt={chart.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col gap-3 border-t border-[var(--border)]">
        <div className="flex items-start gap-2 min-w-0">
          <ImageIcon size={16} className="text-teal-500 shrink-0 mt-0.5" />
          <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{chart.title}</h3>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 transition-colors"
        >
          <Download size={16} />
          Download PNG
        </button>
      </div>
    </motion.article>
  );
}
