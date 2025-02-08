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

3. **Configure the Database**:

   - Create a PostgreSQL database named `anime_social_platform`.
   - Update the database configuration in `config/database.js` with your PostgreSQL credentials:

     ```javascript
     module.exports = {
       host: "your_db_host",
       port: 5432,
       database: "anime_social_platform",
       user: "your_db_user",
       password: "your_db_password",
     };
     ```

4. **Load Sample Data**:

   - The sample data is sourced from the [MyAnimeList Dataset](https://www.kaggle.com/datasets/dbdmobile/myanimelist-dataset).
   - Ensure the dataset is placed in the `data/` directory.
   - Run the script to populate the database:

     ```bash
     node scripts/loadSampleData.js
     ```

## Running the Application

1. **Run the server locally**:

   ```bash
   npm run dev
   ```

2. **Access the Application**:

   - Open your browser and navigate to `http://localhost:3000`.
