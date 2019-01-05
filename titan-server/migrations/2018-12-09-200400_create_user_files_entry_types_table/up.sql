CREATE TABLE IF NOT EXISTS user_file_entry_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE
);

INSERT INTO user_file_entry_types(id, name) VALUES (23, ' Complete Course');
INSERT INTO user_file_entry_types(id, name) VALUES (4, 'A-15');
INSERT INTO user_file_entry_types(id, name) VALUES (12, 'Application Denied');
INSERT INTO user_file_entry_types(id, name) VALUES (22, 'Application Withdrawn');
INSERT INTO user_file_entry_types(id, name) VALUES (2, 'Award/Commendation');
INSERT INTO user_file_entry_types(id, name) VALUES (5, 'AWOL / NUA (Notice of Unauthorized Absence)');
INSERT INTO user_file_entry_types(id, name) VALUES (30, 'Complete Audit');
INSERT INTO user_file_entry_types(id, name) VALUES (24, 'Complete Rating');
INSERT INTO user_file_entry_types(id, name) VALUES (31, 'Complete Supervised');
INSERT INTO user_file_entry_types(id, name) VALUES (10, 'Demotion');
INSERT INTO user_file_entry_types(id, name) VALUES (11, 'Discharge');
INSERT INTO user_file_entry_types(id, name) VALUES (6, 'E-0 BCT Complete');
INSERT INTO user_file_entry_types(id, name) VALUES (7, 'E-1 BCT Complete');
INSERT INTO user_file_entry_types(id, name) VALUES (8, 'E-2 BCT Complete');
INSERT INTO user_file_entry_types(id, name) VALUES (18, 'E-3 BCT AIT Complete');
INSERT INTO user_file_entry_types(id, name) VALUES (3, 'LOA');
INSERT INTO user_file_entry_types(id, name) VALUES (15, 'MOS Qualification');
INSERT INTO user_file_entry_types(id, name) VALUES (9, 'NCO Academy Complete');
INSERT INTO user_file_entry_types(id, name) VALUES (20, 'NCO Meeting');
INSERT INTO user_file_entry_types(id, name) VALUES (25, 'NOI: Notice of Inactivity');
INSERT INTO user_file_entry_types(id, name) VALUES (28, 'Non Mandatory Event');
INSERT INTO user_file_entry_types(id, name) VALUES (17, 'Other');
INSERT INTO user_file_entry_types(id, name) VALUES (21, 'Pass JCS Interview');
INSERT INTO user_file_entry_types(id, name) VALUES (29, 'Practice/Op Leader');
INSERT INTO user_file_entry_types(id, name) VALUES (1, 'Promotion');
INSERT INTO user_file_entry_types(id, name) VALUES (27, 'Reserve Status');
INSERT INTO user_file_entry_types(id, name) VALUES (13, 'Retired');
INSERT INTO user_file_entry_types(id, name) VALUES (19, 'TEST');
INSERT INTO user_file_entry_types(id, name) VALUES (16, 'Transfer');