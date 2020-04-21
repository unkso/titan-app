-- This file should undo anything in `up.sql`
ALTER TABLE `organizations` DROP COLUMN `banner_image_url`;
ALTER TABLE `organizations` DROP COLUMN `preview_image_url`;
