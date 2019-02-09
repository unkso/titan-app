ALTER TABLE organizations ADD COLUMN parent_id INT;
ALTER TABLE organizations ADD FOREIGN KEY fk_parent_id (parent_id) REFERENCES organizations (id);