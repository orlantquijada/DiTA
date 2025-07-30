CREATE TABLE `devices` (
	`id` text PRIMARY KEY NOT NULL,
	`longitude` real NOT NULL,
	`latitude` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `fire_signals` (
	`id` text PRIMARY KEY NOT NULL,
	`smoke_value` integer DEFAULT 0 NOT NULL,
	`longitude` real NOT NULL,
	`latitude` real NOT NULL,
	`device_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE set null
);
