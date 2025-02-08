# CS 348 Project - Milestone 1

## Features

- **List Popular Anime**: Provides users with ranked list of top 100 anime based on reviews.
- **Anime Ratings**: Get average rating for specified anime based on user ratings.
- **Adding New Anime**: Contribute to the community by adding new anime titles.
- **Delete Anime**: Administrative feature of removing anime listings.
- **View Watch History**: User can view all anime they watched, are watching, or want to watch.

## Prerequisites

Before setting up the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Environment Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/patel-aaryan/cs348.git
   cd cs348
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Connect to the Database**:

   - Authenticate to the database hosted on Neon with the following:

   ```bash
   psql -U postgres neon_connection_link
   ```

   - Then, execute the following

     ```bash
     \copy anime FROM 'path\to\project\cs348\data\AnimeListSampleData.csv' DELIMITER ',' CSV HEADER
     ```

## Running the Application

1. **Run the server locally**:

   ```bash
   npm run dev
   ```

2. **Access the Application**:

   - Open your browser and navigate to `http://localhost:3000`.
