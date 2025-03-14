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

-- Query 2: Average Rating for a Specific Anime (ID = 1)
SELECT 
    anime.id, 
    anime.name, 
    AVG(reviews.rating) AS average_rating
FROM 
    anime
LEFT JOIN 
    reviews ON anime.id = reviews.anime_id
WHERE 
    anime.id = 1
GROUP BY 
    anime.id, anime.name;


-- Feature 3:

-- Query 3: Insert new anime
INSERT INTO anime (name, description, image_url, is_verified)  
VALUES ('Death Note test', 'test', 'https://cdn.myanimelist.net/images/test.jpg', FALSE);

SELECT * FROM anime;


-- Feature 4:

-- Query 4: delete newly added anime -- could be changed to delete specific one
DELETE FROM anime
WHERE id = (SELECT MAX(id) FROM anime);

SELECT * FROM anime;



-- Feature 5:

-- Query 5: View watching history for user
SELECT anime.name AS name, anime.image_url AS image, uas.status AS status, reviews.rating AS rating, reviews.comment AS comment
FROM user_anime_status uas
LEFT JOIN reviews ON uas.anime_id = reviews.anime_id AND uas.user_id = reviews.user_id
JOIN anime ON uas.anime_id = anime.id
WHERE uas.user_id = 1 AND uas.status = 1
ORDER BY uas.updated_at DESC
