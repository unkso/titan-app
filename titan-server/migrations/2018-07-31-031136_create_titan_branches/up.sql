CREATE TABLE organizations (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  slug VARCHAR (255) UNIQUE,
  group_type VARCHAR (255),
  wcf_user_group_id INTEGER UNIQUE,
  is_enabled BOOL DEFAULT true
);

-- The wcf_user_group_id values map to the wcf1_user_group table in unkso_primary database.
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id) VALUES ('Army', 'army', 'division', 28);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id, is_enabled) VALUES ('Air Force', 'air-force', 'division', 32, false);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id, is_enabled) VALUES ('Marines', 'marines', 'division', 36, false);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id) VALUES ('Navy', 'navy', 'division', 40);
INSERT INTO organizations (name, slug, group_type, wcf_user_group_id) VALUES ('Coast Guard', 'coast-guard', 'division', 83);