INSERT INTO users (name, email, password, role) VALUES
('Tom Hanks', 'tom@example.com', 'p1', TRUE),
('Leonardo DiCaprio', 'leo@example.com', 'p2', FALSE),
('Scarlett Johansson', 
'scarlett@example.com', 'p3', FALSE),
('Brad Pitt', 'brad@example.com', 'p4', FALSE),
('Angelina Jolie', 'angelina@example.com', 'p5', TRUE),
('Morgan Freeman', 'morgan@example.com', 'p6', FALSE),
('Natalie Portman', 'natalie@example.com', 'p7', FALSE),
('Robert Downey Jr.', 'robert@example.com', 'p8', FALSE),
('Johnny Depp', 'johnny@example.com', 'p9', TRUE),
('Meryl Streep', 'meryl@example.com', 'p10', FALSE);

INSERT INTO reviews (user_id, anime_id, rating, comment) VALUES
(1, 1, 8, 'c1'),
(2, 2, 9, 'c2'),
(3, 2, 7, 'c3'),
(4, 3, 6, 'c4'),
(5, 3, 10, 'c5'),
(6, 5, 5, 'c6'),
(7, 7, 8, 'c7'),
(8, 7, 9, 'c8'),
(9, 7, 7, 'c9'),
(10, 9, 6, 'c10');

INSERT INTO user_anime_status (user_id, anime_id, status) VALUES
(1, 1, 2),
(1, 2, 3),
(3, 3, 1),
(4, 4, 1),
(5, 5, 3),
(6, 6, 2),
(7, 7, 2),
(8, 8, 2),
(9, 9, 3);

INSERT INTO anime SELECT * FROM read_csv('data/sampleData.csv');
