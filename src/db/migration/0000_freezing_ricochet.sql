CREATE TABLE `accounts` (
	`userId` varchar(36) NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text NOT NULL,
	`access_token` text NOT NULL,
	`expires_at` int NOT NULL,
	`token_type` text NOT NULL,
	`scope` text NOT NULL,
	`id_token` text NOT NULL,
	`session_state` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(254) NOT NULL,
	`emailVerified` timestamp,
	`image` text,
	`password` text NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `company_details` (
	`logo` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`contact_number` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp
);
