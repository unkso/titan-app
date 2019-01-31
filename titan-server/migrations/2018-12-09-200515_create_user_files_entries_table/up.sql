CREATE TABLE IF NOT EXISTS user_file_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_file_entry_type_id INT NOT NULL,
  user_id INT NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME,
  comments TEXT,
  date_modified DATETIME NOT NULL,
  modified_by INT NOT NULL
);
