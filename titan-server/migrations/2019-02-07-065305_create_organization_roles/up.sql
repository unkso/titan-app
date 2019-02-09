CREATE TABLE organization_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  organization_id INT NOT NULL,
  user_id INT,
  role VARCHAR(255) NOT NULL,
  `rank` INT,
  FOREIGN KEY fk_organization_id (organization_id)
    REFERENCES organizations (id),
  FOREIGN KEY fk_user_id (user_id)
    REFERENCES users (id),
  CONSTRAINT organization_rank UNIQUE (organization_id, `rank`)
);
