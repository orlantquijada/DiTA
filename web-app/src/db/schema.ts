import { createId } from '@paralleldrive/cuid2';
import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const timestamps = {
  createdAt: integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
};

export const Device = sqliteTable('devices', {
  id: text()
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  longitude: real().notNull(),
  latitude: real().notNull(),
});

export const FireSignal = sqliteTable('fire_signals', {
  id: text()
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  smokeValue: integer().notNull().default(0),

  // intentionally duplicating location data
  longitude: real().notNull(),
  latitude: real().notNull(),

  deviceId: text().references(() => Device.id, { onDelete: 'set null' }),

  ...timestamps,
});

export const fireSignalRelations = relations(FireSignal, ({ one }) => ({
  device: one(Device, {
    fields: [FireSignal.deviceId],
    references: [Device.id],
  }),
}));

export const deviceRelations = relations(Device, ({ many }) => ({
  signals: many(FireSignal),
}));
