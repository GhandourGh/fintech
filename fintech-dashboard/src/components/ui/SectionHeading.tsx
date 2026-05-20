import clsx from 'clsx';
import { InfoTip } from './InfoTip';
import type { HelpId } from '../../data/helpContent';

type Props = {
  title: string;
  infoId?: HelpId;
  subtitle?: string;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
};

export function SectionHeading({ title, infoId, subtitle, className, as: Tag = 'h3' }: Props) {
  return (
    <div className={clsx('mb-4', className)}>
      <div className="flex items-start gap-2">
        <Tag className="font-display font-semibold text-lg flex-1 text-[var(--text-primary)] leading-snug">
          {title}
        </Tag>
        {infoId && <InfoTip id={infoId} className="mt-0.5" />}
      </div>
      {subtitle && <p className="text-sm text-[var(--text-muted)] mt-1">{subtitle}</p>}
    </div>
  );
}
