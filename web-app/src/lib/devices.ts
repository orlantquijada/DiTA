import type { DeviceType, FireSignalType } from '@/db/schema';

export type DeviceWithDetails = DeviceType & {
  signal: FireSignalType | undefined;
};
