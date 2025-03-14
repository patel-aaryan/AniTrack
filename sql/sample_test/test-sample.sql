-- Feature 1:

-- Query 1: Top 5 Animes by Average Rating
SELECT 
    anime.id, 
    anime.name, 
    anime.image_url, 
    AVG(reviews.rating) AS avg_rating
FROM 
    anime
LEFT JOIN 
    reviews ON anime.id = reviews.anime_id
GROUP BY 
    anime.id, anime.name, anime.image_url
ORDER BY 
    avg_rating DESC NULLS LAST
LIMIT 5;



-- Feature 2:

-- Query 2: Rate an anime, in this example user id 1 rating anime id 2
INSERT INTO reviews (user_id, anime_id, rating, comment)
VALUES (1, 2, 9, 'Amazing anime with a great story!');

SELECT user_id, anime_id, rating, comment
FROM reviews
WHERE user_id = 1 AND anime_id = 2;

DELETE FROM reviews
WHERE user_id = 1 AND anime_id = 2;


-- Feature 3: Insert/Delete Animes

-- Query 3: Insert new anime
INSERT INTO anime (name, description, image_url, is_verified)  
VALUES ('Death Note test', 'test', 'https://cdn.myanimelist.net/images/test.jpg', FALSE);

SELECT * FROM anime;

-- Query 4: delete newly added anime -- could be changed to delete specific one
DELETE FROM anime
WHERE id = (SELECT MAX(id) FROM anime);

SELECT * FROM anime;

-- Feature 4: Find Friends based on Shared Anime

-- Query 5: Find potential friends for user 2 to add
WITH UserWatched AS (
    SELECT anime_id
    FROM user_anime_status
    WHERE user_id = 2 AND status = 3
),
PotentialFriends AS (
    SELECT uas.user_id, COUNT(uas.anime_id) AS shared_anime_count
    FROM user_anime_status AS uas
    JOIN UserWatched uw ON uas.anime_id = uw.anime_id
    WHERE uas.user_id <> 2 AND uas.status = 3
    GROUP BY uas.user_id
),
FilteredFriends AS (
    SELECT pf.user_id, pf.shared_anime_count
    FROM PotentialFriends pf
    LEFT JOIN friendship f 
    ON (f.user_id1 = 2 AND f.user_id2 = pf.user_id)
    OR (f.user_id2 = 2 AND f.user_id1 = pf.user_id)
    WHERE f.user_id1 IS NULL
)
SELECT u.id, u.name, u.email, ff.shared_anime_count
FROM FilteredFriends ff
JOIN users u ON ff.user_id = u.id
ORDER BY ff.shared_anime_count DESC
LIMIT 10;


-- Feature 5:

-- Query 6: View watching history for user

SELECT
    uas.status,
    uas.updated_at,
    uas.anime_id
FROM 
    user_anime_status AS uas
JOIN 
    anime AS a ON uas.anime_id = a.id
WHERE 
    uas.user_id = 1
ORDER BY 
    uas.updated_at DESC;