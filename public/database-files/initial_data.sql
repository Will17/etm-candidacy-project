CREATE DATABASE tecnical_call;

USE tecnical_call;

DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

CREATE TABLE projects (
    ID int NOT NULL,
    NUMBER varchar(10) NOT NULL,
    DESCRIPTION varchar(1024) NOT NULL,
    EXP_DATE_START date NOT NULL,
    EXP_DATE_END date NOT NULL,
    EXP_HOURS decimal(16,6) NOT NULL,
    ACT_HOURS decimal(16,6) NOT NULL,
    ACT_HOURS_TASKS decimal(16,6) NOT NULL,
    CREATION_DATE datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FK_PROJECT int NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(FK_PROJECT) REFERENCES projects (ID) ON DELETE SET NULL
);

CREATE TABLE users (
    ID int NOT NULL,
    NAME varchar(50) NOT NULL,
    SURNAME varchar(50) NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE reports (
    ID int NOT NULL AUTO_INCREMENT,
    DATE date NOT NULL,
    HOUR_START time NOT NULL,
    HOUR_END time NOT NULL,
    DESCRIPTION varchar(255) NULL,
    FK_USER int NOT NULL,
    FK_PROJECT int NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(FK_USER) REFERENCES users (ID) ON DELETE NO ACTION,
    FOREIGN KEY(FK_PROJECT) REFERENCES projects (ID) ON DELETE SET NULL
);

INSERT INTO users(ID, NAME, SURNAME) VALUES
  ( 1, 'Mario',      'Rossi'    ),
  ( 2, 'Luigi',      'Bianchi'  ),
  ( 3, 'Stefano',    'Verdi'    ),
  ( 4, 'Giovanni',   'Rossi'    ),
  ( 5, 'Luca',       'Bianchi'  ),
  ( 6, 'Goffredo',   'Boni'     ),
  ( 7, 'Ottavio',    'Russo'    ),
  ( 8, 'Faustino',   'Romano'   ),
  ( 9, 'Rico',       'Romani'   ),
  (10, 'Angioletto', 'Toscani'  ),
  (11, 'Orfeo',      'Baroffio' ),
  (12, 'Francesco',  'Folliero' ),
  (13, 'Bertrando',  'Esposito' ),
  (14, 'Anastasio',  'Costa'    ),
  (15, 'Fiore',      'Siciliano'),
  (16, 'Luca',       'De luca'  ),
  (17, 'Riccardo',   'Milani'   ),
  (18, 'Federica',   'Monti'    ),
  (19, 'Aurora',     'Russo'    ),
  (20, 'Amelia',     'Grassi'   ),
  (21, 'Enea',       'Rinaldi'  ),
  (22, 'Leonardo',   'Mariani'  ),
  (23, 'Federica',   'Basso'    ),
  (24, 'Cloe',       'Coppola'  ),
  (25, 'Amelia',     'Grasso'   );

INSERT INTO projects(ID, NUMBER, DESCRIPTION, EXP_DATE_START, EXP_DATE_END, EXP_HOURS, ACT_HOURS, ACT_HOURS_TASKS, FK_PROJECT) VALUES
  ( 1, 'P220001', 'Tree-House building',       '2022-03-07', '2022-03-25', 120.0, 0, 0, NULL),
  ( 2, 'P220002', 'Designing',                 '2022-03-07', '2022-03-10',  32.0, 0, 0,    1),
  ( 3, 'P220003', 'Designing - Draft',         '2022-03-07', '2022-03-08',  16.0, 0, 0,    2),
  ( 4, 'P220004', 'Designing - Final',         '2022-03-09', '2022-03-09',   8.0, 0, 0,    2),
  ( 5, 'P220005', 'Designing - B.O.M',         '2022-03-10', '2022-03-10',   8.0, 0, 0,    2),
  ( 6, 'P220006', 'Purchase',                  '2022-03-11', '2022-03-11',   8.0, 0, 0,    1),
  ( 7, 'P220007', 'Building',                  '2022-03-14', '2022-03-23',  64.0, 0, 0,    1),
  ( 8, 'P220008', 'Building - Preparation',    '2022-03-14', '2022-03-15',  16.0, 0, 0,    7),
  ( 9, 'P220009', 'Building - Foundation',     '2022-03-16', '2022-03-22',  40.0, 0, 0,    7),
  (10, 'P220010', 'Building - Ladder',         '2022-03-16', '2022-03-16',   8.0, 0, 0,    9),
  (11, 'P220011', 'Building - Walls',          '2022-03-17', '2022-03-18',  16.0, 0, 0,    9),
  (12, 'P220012', 'Building - Roof',           '2022-03-21', '2022-03-22',  16.0, 0, 0,    9),
  (13, 'P220013', 'Building - Interiors',      '2022-03-23', '2022-03-23',   8.0, 0, 0,    7),
  (14, 'P220014', 'Closing',                   '2022-03-24', '2022-03-25',  16.0, 0, 0,    1);

INSERT INTO projects(ID, NUMBER, DESCRIPTION, EXP_DATE_START, EXP_DATE_END, EXP_HOURS, ACT_HOURS, ACT_HOURS_TASKS, FK_PROJECT) VALUES
  (15, 'P220015', 'Ferragosto',                '2022-08-10', '2022-08-12',  24.0, 0, 0, NULL),
  (16, 'P220016', 'Ferragosto - Location',     '2022-08-10', '2022-08-10',   8.0, 0, 0,   15),
  (17, 'P220017', 'Ferragosto - Guests/Roles', '2022-08-11', '2022-08-11',   8.0, 0, 0,   15),
  (18, 'P220018', 'Ferragosto - Groceries',    '2022-08-12', '2022-08-12',   8.0, 0, 0,   15);

INSERT INTO projects(ID, NUMBER, DESCRIPTION, EXP_DATE_START, EXP_DATE_END, EXP_HOURS, ACT_HOURS, ACT_HOURS_TASKS, FK_PROJECT) VALUES
  (19, 'P220019', 'NEW UI',                    '2022-11-01', '2022-11-22', 128.0, 0, 0, NULL),
  (20, 'P220020', 'NEW UI - Functions',        '2022-11-01', '2022-11-01',   8.0, 0, 0,   19),
  (21, 'P220021', 'NEW UI - Design',           '2022-11-02', '2022-11-04',  24.0, 0, 0,   19),
  (22, 'P220022', 'NEW UI - Approval',         '2022-11-07', '2022-11-07',   8.0, 0, 0,   19),
  (23, 'P220023', 'NEW UI - Development',      '2022-11-08', '2022-11-11',  32.0, 0, 0,   19),
  (24, 'P220024', 'NEW UI - Alpha Testing',    '2022-11-14', '2022-11-16',  24.0, 0, 0,   19),
  (25, 'P220025', 'NEW UI - Gather UX Info',   '2022-11-15', '2022-11-15',   8.0, 0, 0,   24),
  (26, 'P220026', 'NEW UI - Alpha bug fix',    '2022-11-16', '2022-11-16',   8.0, 0, 0,   24),
  (27, 'P220027', 'NEW UI - Beta Testing',     '2022-11-17', '2022-11-21',  24.0, 0, 0,   19),
  (28, 'P220028', 'NEW UI - Gather UX Info',   '2022-11-18', '2022-11-18',   8.0, 0, 0,   27),
  (29, 'P220029', 'NEW UI - Bug fix',          '2022-11-21', '2022-11-21',   8.0, 0, 0,   27),
  (30, 'P220030', 'NEW UI - Release',          '2022-11-22', '2022-11-22',   8.0, 0, 0,   19);
   
INSERT INTO reports(DATE, HOUR_START, HOUR_END, FK_USER, FK_PROJECT) VALUES
  /*Designing - Draft*/
  ('2022-03-07', '09:15:00', '12:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  3),
  ('2022-03-07', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  3),
  /*Designing - Final*/
  ('2022-03-08', '10:00:00', '12:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  4),
  ('2022-03-08', '16:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  4),
  /*Designing - B.O.M*/
  ('2022-03-09', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  5),
  /*Purchase*/
  ('2022-03-10', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  6),
  /*Building - Preparation*/
  ('2022-03-14', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-14', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-14', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-14', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-15', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-15', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-15', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  ('2022-03-15', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  8),
  /*Building - Ladder*/
  ('2022-03-16', '11:30:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 10),
  /*Building - Walls*/
  ('2022-03-16', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-16', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-16', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-17', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-17', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-17', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-18', '14:00:00', '17:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-18', '14:00:00', '16:15:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-18', '15:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-18', '15:45:00', '18:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-18', '09:00:00', '14:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  ('2022-03-21', '14:00:00', '18:45:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 11),
  /*Building - Roof*/
  ('2022-03-22', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 12),
  ('2022-03-22', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 12),
  ('2022-03-22', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 12),
  ('2022-03-23', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 12),
  ('2022-03-24', '16:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 12),
  /*Building - Interiors*/
  ('2022-03-25', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 13),
  ('2022-03-28', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 13),
  ('2022-03-29', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1), 13);

INSERT INTO reports(DATE, HOUR_START, HOUR_END, FK_USER, FK_PROJECT) VALUES
  /*Ferragosto - Location*/
  ('2022-08-08', '09:15:00', '12:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  16),
  ('2022-08-09', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  16),
  ('2022-08-10', '10:00:00', '12:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  16),
  ('2022-08-11', '16:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  16),
  /*Ferragosto - Guests/Roles*/
  ('2022-08-10', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-11', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-11', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-11', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  ('2022-08-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  17),
  /*Ferragosto - Groceries*/
  ('2022-08-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  18);

INSERT INTO reports(DATE, HOUR_START, HOUR_END, FK_USER, FK_PROJECT) VALUES
  /*NEW UI*/
  ('2022-11-08', '09:15:00', '12:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  19),
  ('2022-11-09', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  19),
  ('2022-11-10', '10:00:00', '12:30:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  19),
  ('2022-11-11', '16:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  19),
  /*NEW UI - Functions*/
  ('2022-11-01', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  ('2022-11-01', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  20),
  /*NEW UI - Design*/
  ('2022-11-02', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  ('2022-11-02', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  21),
  /*NEW UI - Approval*/
  ('2022-11-03', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  ('2022-11-03', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  22),
  /*NEW UI - Development*/
  ('2022-11-04', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  ('2022-11-04', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  23),
  /*NEW UI - Alpha Testing*/
  ('2022-11-07', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  ('2022-11-07', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  24),
  /*NEW UI - Gather UX Info*/
  ('2022-11-08', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  ('2022-11-08', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  25),
  /*NEW UI - Alpha bug fix*/
  ('2022-11-09', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  ('2022-11-09', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  26),
  /*NEW UI - Beta Testing*/
  ('2022-11-10', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  ('2022-11-10', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  27),
  /*NEW UI - Gather UX Info*/
  ('2022-11-11', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  ('2022-11-11', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  28),
  /*NEW UI - Bug fix*/
  ('2022-11-12', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  29),
  /*NEW UI - Release*/
  ('2022-11-12', '09:00:00', '17:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '09:00:00', '13:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30),
  ('2022-11-12', '14:00:00', '18:00:00', (SELECT ID FROM users ORDER BY RAND() LIMIT 1),  30);