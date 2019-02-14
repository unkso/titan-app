CREATE TABLE user_event_excuses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_type_id INT NOT NULL,
  event_date DATETIME NOT NULL,
  comments TEXT NOT NULL,
  ack_user_id INT,
  ack_date DATETIME,
  ack_comments TEXT,
  date_created DATETIME NOT NULL,
  date_modified DATETIME NOT NULL
);