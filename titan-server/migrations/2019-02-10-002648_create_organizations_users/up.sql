CREATE TABLE organizations_users (
  organization_id INT,
  user_id INT,
  PRIMARY KEY (organization_id, user_id),
  FOREIGN KEY fk_organization (organization_id) REFERENCES organizations (id),
  FOREIGN KEY fk_user (user_id) REFERENCES users (id)
);
