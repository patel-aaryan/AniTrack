-- Auth.js required tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bio TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  "sessionToken" VARCHAR(255) NOT NULL,
  "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_token (
  identifier TEXT,
  token TEXT,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Application-specific tables
CREATE TABLE IF NOT EXISTS anime (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT image_url_valid CHECK (
        image_url LIKE 'http%'
        AND image_url LIKE '%.%'
    )
);

CREATE INDEX idx_anime_name_search ON anime USING GIN (to_tsvector('english', name));

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS anime_genre (
    anime_id INT NOT NULL REFERENCES anime(id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (anime_id, genre_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    anime_id INT REFERENCES anime(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 10),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, anime_id)
);

CREATE TABLE IF NOT EXISTS user_anime_status (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    anime_id INT REFERENCES anime(id) ON DELETE CASCADE,
    status INT CHECK (status BETWEEN 1 AND 3), -- 1: Watching, 2: Completed, 3: Wishlist
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, anime_id)
);

CREATE TABLE IF NOT EXISTS friendship (
    user_id1 INT REFERENCES users(id) ON DELETE CASCADE,
    user_id2 INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id1, user_id2),
    CHECK (user_id1 <> user_id2)
)
