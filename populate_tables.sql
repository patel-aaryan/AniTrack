INSERT INTO anime (name, genre, description, image_url, is_verified) VALUES
('Cowboy Bebop', 'Action, Award Winning, Sci-Fi', 'Crime is timeless. By the year 2071, humanity has expanded across the galaxy...', 'https://cdn.myanimelist.net/images/anime/4/19644.jpg', TRUE),
('Cowboy Bebop: Tengoku no Tobira', 'Action, Sci-Fi', 'Another day, another bounty—such is the life of the often unlucky crew of the Bebop...', 'https://cdn.myanimelist.net/images/anime/1439/93480.jpg', TRUE),
('Trigun', 'Action, Adventure, Sci-Fi', 'Vash the Stampede is the man with a $$60,000,000,000 bounty on his head...', 'https://cdn.myanimelist.net/images/anime/7/20310.jpg', TRUE),
('Witch Hunter Robin', 'Action, Drama, Mystery, Supernatural', 'Robin Sena is a powerful craft user drafted into the STNJ...', 'https://cdn.myanimelist.net/images/anime/10/19969.jpg', TRUE),
('Bouken Ou Beet', 'Adventure, Fantasy, Supernatural', 'It is the dark century and the people are suffering under the rule of the devil...', 'https://cdn.myanimelist.net/images/anime/7/21569.jpg', FALSE),
('Eyeshield 21', 'Sports', 'Shy, reserved, and small-statured, Deimon High School student Sena Kobayakawa...', 'https://cdn.myanimelist.net/images/anime/1079/133529.jpg', TRUE),
('Hachimitsu to Clover', 'Comedy, Drama, Romance', 'Yuuta Takemoto, a sophomore at an arts college...', 'https://cdn.myanimelist.net/images/anime/1301/133577.jpg', TRUE),
('Hungry Heart: Wild Striker', 'Comedy, Slice of Life, Sports', 'As the younger brother of Japanese soccer star Seisuke Kanou...', 'https://cdn.myanimelist.net/images/anime/12/49655.jpg', TRUE),
('Initial D Fourth Stage', 'Action, Drama', 'Takumi Fujiwara finally joins Ryousuke and Keisuke Takahashi...', 'https://cdn.myanimelist.net/images/anime/9/10521.jpg', FALSE),
('Monster', 'Drama, Mystery, Suspense', 'Dr. Kenzou Tenma, an elite neurosurgeon recently engaged...', 'https://cdn.myanimelist.net/images/anime/10/18793.jpg', TRUE);

INSERT INTO users (name, email, password, is_admin) VALUES
('Tom Hanks', 'tom@example.com', 'p1', TRUE),
('Leonardo DiCaprio', 'leo@example.com', 'p2', FALSE),
('Scarlett Johansson', 'scarlett@example.com', 'p3', FALSE),
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
