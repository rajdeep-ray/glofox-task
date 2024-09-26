# Glofox task

## Overview

This project is an Express application that utilizes Prisma as an ORM, Docker Compose for managing a PostgreSQL database, and Jest for testing.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rajdeep-ray/glofox-task.git
   cd glofox-task
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   Create a `.env` file

   ```
    DATABASE_USERNAME=myuser
    DATABASE_PASSWORD=mypassword
    DATABASE_NAME=mydatabase

    DATABASE_URL=postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}

   ```

4. **Set up Docker:**

   Make sure Docker is running, then run:

   ```bash
   docker-compose up -d
   ```

5. **Run Prisma DB push:**

   ```bash
   npx prisma db push
   ```

## Configuration

- The Prisma schema can be found in `prisma/schema.prisma`. Update this file to define your database models.
- Configure your database connection in the `.env` file.

## Running the Application

To start the Express server, run:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Testing

This project uses Jest for testing. To run the tests, execute:

```bash
npm test
```

## API Endpoints

- **GET /**: "Hello, World!"
- **GET /health**: Health Check.
- **GET /classes**: Retrieves a list of classes.
- **POST /classes**: Creates a new class.
- **GET /booking**: Retrieves a list of bookings.
- **POST /booking**: Creates a booking.
