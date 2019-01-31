CREATE TABLE organizations (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR (255) UNIQUE NOT NULL,
  group_type VARCHAR (255) NOT NULL,
  wcf_user_group_id INTEGER UNIQUE NOT NULL,
  is_enabled BOOL DEFAULT true NOT NULL
);

-- The wcf_user_group_id values map to the wcf1_user_group table in unkso_primary database.
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id, is_enabled) VALUES ('Army', 'army', 'division', 28, false);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id) VALUES ('Air Force', 'air-force', 'division', 32);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id, is_enabled) VALUES ('Marines', 'marines', 'division', 36, false);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id) VALUES ('Navy', 'navy', 'division', 40);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id) VALUES ('Coast Guard', 'coast-guard', 'division', 83);
