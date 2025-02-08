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

## File Structure

- [/web-app](https://github.com/patel-aaryan/cs348/tree/main/web-app): the React app that users will interact with.
- [/data](https://github.com/patel-aaryan/cs348/tree/main/data): includes the anime data that powers the app.
  - [/data/production-data](https://github.com/patel-aaryan/cs348/tree/main/data/production-data): include the production dataset
  - [/data/sample-data](https://github.com/patel-aaryan/cs348/tree/main/data/sample-data): include the sample dataset
- [/sql](https://github.com/patel-aaryan/cs348/tree/main/sql): includes the sql scripts used to create and test the database

## Environment Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/patel-aaryan/cs348.git
   ```

## Connect to the Database (for db testing, not required for running the app)

- Authenticate to the database hosted on Neon with the following:

  ```bash
  psql "postgresql://neondb_owner:npg_57rRMbpQwjOA@ep-bitter-cherry-a84kfw3m-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
  ```
  Run any sql command to interact with the database.
- Note: **Tables with sample data are already created in the database**. Since it's hosted on Neon, you don't need to create the tables yourself. But if you want to test creating tables, you can drop all tables, and the run `/sql/create_tables.sql` to create the tables. To populate the tables, either

  - `/sql/populate_tables.sql` to populate all the tables with sample data
  - run `copy table_name FROM 'path/to/sample-data/data.csv' DELIMITER ',' CSV HEADER` to populate a specific table with sample data

- To execute the any sql file from local machine and check the output, run the following command:

  ```bash
  psql "postgresql://neondb_owner:npg_57rRMbpQwjOA@ep-bitter-cherry-a84kfw3m-pooler.eastus2.azure.neon.tech/neondb?sslmode=require" -f <path/to/file.sql> -o <path/to/file.out>
  ```

## Running the Application

1. **Change the directory to the web-app folder**:

   ```bash
   cd web-app
   ```

2. **Install Dependencies**:
   Make sure you have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) on your machine. **Node version must be greater tha 18.18.0**.

    ```bash
    npm install
    ```

3. **Run the server locally**:

   ```bash
   npm run dev
   ```

4. **Access the Application**:

   Open your browser and navigate to `http://localhost:3000`.
