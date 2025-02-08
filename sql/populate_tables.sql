INSERT INTO anime (name, description, image_url, is_verified) VALUES
('Cowboy Bebop', 'Crime is timeless. By the year 2071, humanity has expanded across the galaxy...', 'https://cdn.myanimelist.net/images/anime/4/19644.jpg', TRUE),
('Cowboy Bebop: Tengoku no Tobira', 'Another day, another bounty—such is the life of the often unlucky crew of the Bebop...', 'https://cdn.myanimelist.net/images/anime/1439/93480.jpg', TRUE),
('Trigun', 'Vash the Stampede is the man with a $$60,000,000,000 bounty on his head...', 'https://cdn.myanimelist.net/images/anime/7/20310.jpg', TRUE),
('Witch Hunter Robin', 'Robin Sena is a powerful craft user drafted into the STNJ...', 'https://cdn.myanimelist.net/images/anime/10/19969.jpg', TRUE),
('Bouken Ou Beet', 'It is the dark century and the people are suffering under the rule of the devil...', 'https://cdn.myanimelist.net/images/anime/7/21569.jpg', FALSE),
('Eyeshield 21', 'Shy, reserved, and small-statured, Deimon High School student Sena Kobayakawa...', 'https://cdn.myanimelist.net/images/anime/1079/133529.jpg', TRUE),
('Hachimitsu to Clover', 'Yuuta Takemoto, a sophomore at an arts college...', 'https://cdn.myanimelist.net/images/anime/1301/133577.jpg', TRUE),
('Hungry Heart: Wild Striker', 'As the younger brother of Japanese soccer star Seisuke Kanou...', 'https://cdn.myanimelist.net/images/anime/12/49655.jpg', TRUE),
('Initial D Fourth Stage', 'Takumi Fujiwara finally joins Ryousuke and Keisuke Takahashi...', 'https://cdn.myanimelist.net/images/anime/9/10521.jpg', FALSE),
('Monster', 'Dr. Kenzou Tenma, an elite neurosurgeon recently engaged...', 'https://cdn.myanimelist.net/images/anime/10/18793.jpg', TRUE);

INSERT INTO genre (name) VALUES
('Action'),
('Award Winning'),
('Sci-Fi'),
('Adventure'),
('Drama'),
('Mystery'),
('Supernatural'),
('Fantasy'),
('Sports'),
('Comedy'),
('Romance'),
('Slice of Life'),
('Suspense');

INSERT INTO anime_genre (anime_id, genre_id) VALUES
(1, 1), (1, 2), (1, 3),  
(2, 1), (2, 3),          
(3, 1), (3, 4), (3, 3),  
(4, 1), (4, 5), (4, 6), (4, 7),
(5, 4), (5, 8), (5, 7),  
(6, 9),                  
(7, 10), (7, 5), (7, 11),
(8, 10), (8, 12), (8, 9),
(9, 1), (9, 5),          
(10, 5), (10, 6), (10, 13); 

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
