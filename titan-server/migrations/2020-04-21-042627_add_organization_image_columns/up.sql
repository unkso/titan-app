ALTER TABLE `organizations` ADD COLUMN `banner_image_url` TEXT AFTER avatar_url;
ALTER TABLE `organizations` ADD COLUMN `preview_image_url` TEXT AFTER banner_image_url;
