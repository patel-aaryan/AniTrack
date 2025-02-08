CREATE TABLE anime (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) CHECK (
        image_url LIKE 'http%'
        AND image_url LIKE '%.%'
    ),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE anime_genre (
    anime_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (anime_id, genre_id),
    FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE reviews (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    anime_id INT REFERENCES anime(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 10),
    comment TEXT,
    PRIMARY KEY (user_id, anime_id)
);

CREATE TABLE user_anime_status (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    anime_id INT REFERENCES anime(id) ON DELETE CASCADE,
    status INT CHECK (status BETWEEN 1 AND 3),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, anime_id)
);

CREATE TABLE friendship (
    user_id1 INT REFERENCES users(id) ON DELETE CASCADE,
    user_id2 INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id1, user_id2),
    CHECK (user_id1 <> user_id2)
)
