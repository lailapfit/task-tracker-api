INSERT INTO customers (name)
VALUES
('Greendale'),
('Taniry Mobile'),
('Glidian'),
('Laniry'),
('Wovty International'),
('Dozti Slogan'),
('Lariox Shop');

INSERT INTO projects (customer_id, name)
VALUES
(1, 'Rebranding Strategy'),
(2, 'iOS Checklist Tracker'),
(3, 'Mobile Wallet'),
(4, 'Daily Expense Tracker'),
(5, 'Daily News Alert'),
(6, 'Spring Marketting'),
(7, 'Delivery Van Tracking');

INSERT INTO tasks (description, project_id)
VALUES
('Define brand architecture', 1),
('Brand audit', 1),
('Summarize brand strategy', 1),
('Create launch plan', 1),
('Sprint planning', 2),
('Design approval', 2),
('Sprint planning', 2),
('Create task import functionality', 2),
('Sprint planning', 3),
('QR code functionality', 3),
('Design handover', 3),
('Sprint Planning', 4),
('Create database architecture', 4),
('Bank integration', 4),
('Sprint planning', 5),
('Create AWS SNS registration', 5),
('Create AWS SNS topic subscription', 5),
('Create launch plan', 6),
('Write stories to focus the project on an audience', 6),
('Define main marketing material', 6),
('Sprint planning', 7),
('Integrate current delivery vans', 7),
('Design handover', 7),
('Create adminstrative dashboard', 7);

INSERT INTO task_logs (task_id, user_id, duration_minutes)
VALUES
(1, 1, 480),
(2, 2, 580),
(3, 3, 80),
(5, 4, 30),
(6, 6, 180),
(7, 7, 280);