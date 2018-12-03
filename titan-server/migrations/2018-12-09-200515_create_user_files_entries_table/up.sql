CREATE TABLE IF NOT EXISTS user_file_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_file_entry_type_id INT,
  user_id INT,
  start_date DATETIME,
  end_date DATETIME,
  comments TEXT,
  date_modified DATETIME,
  modified_by INT
);