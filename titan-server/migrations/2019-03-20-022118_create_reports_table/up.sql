CREATE TABLE reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_id INT NOT NULL,
  term_start_date DATETIME NOT NULL,
  submission_date DATETIME,
  comments TEXT,
  ack_user_id INT,
  ack_date DATETIME,
  date_created DATETIME NOT NULL,
  date_modified DATETIME NOT NULL,

  FOREIGN KEY fk_role_id (role_id) REFERENCES organization_roles (id),
  FOREIGN KEY fk_ack_user_id (ack_user_id) REFERENCES users (id)
);
