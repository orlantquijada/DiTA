import type { FireSignalType } from '@/db/schema';

export type SmokeStatus = 'normal' | 'warning' | 'danger';
const SmokeStatusMap: Record<SmokeStatus, number> = {
  normal: 0,
  warning: 300,
  danger: 500,
};

export function getSmokeStatus(signal: { smokeValue: number }): SmokeStatus {
  if (signal.smokeValue >= SmokeStatusMap.danger) {
    return 'danger';
  }
  if (signal.smokeValue >= SmokeStatusMap.warning) {
    return 'warning';
  }

  return 'normal';
}

export type Signal = Pick<
  FireSignalType,
  'longitude' | 'latitude' | 'smokeValue'
>;
