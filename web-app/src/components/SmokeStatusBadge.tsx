import type { FireSignalType } from '@/db/schema';
import { getSmokeStatus } from '@/lib/signal';
import { Badge } from './ui/badge';

export default function SmokeStatusBadge({
  signal,
}: {
  signal?: FireSignalType;
}) {
  const smokeStatus = signal ? getSmokeStatus(signal) : 'normal';
  const label =
    smokeStatus === 'normal'
      ? 'Normal'
      : // biome-ignore lint/style/noNestedTernary: asd
        smokeStatus === 'warning'
        ? 'Warning'
        : 'Danger';

  return (
    <Badge
      variant={
        smokeStatus === 'normal'
          ? 'secondary'
          : // biome-ignore lint/style/noNestedTernary: asd
            smokeStatus === 'warning'
            ? 'warning'
            : 'destructive'
      }
    >
      {label}
    </Badge>
  );
}
