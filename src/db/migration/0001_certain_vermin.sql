ALTER TABLE `company_details` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `company_details` ADD `updated_at` timestamp;