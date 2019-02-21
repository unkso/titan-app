CREATE TABLE event_types (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE
);

INSERT INTO event_types
  (name)
VALUES
  ("Meeting"),
  ("NCO Meeting"),
  ("Practice"),
  ("Scrim"),
  ("Training"),
  ("Exam"),
  ("Other");
