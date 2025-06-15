# BookLog API

Backend API for my BookLog MERN stack application. This API provides endpoints for user authentication and book management.  
  
BookLog is a simple and minimalist project that allows you to keep track of your book backlog, without any overhead or unnecessary frills.

> **Note:** This API is hosted on Render.com's free tier. The server will sleep after 15 minutes of inactivity, causing the first request after sleep to take up to 50 seconds to respond. Subsequent requests will be normal speed.

## What about the UI?
Soon I will develop a UI in React that interacts with this API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd bookLog-API
```

2. Install dependencies:
```bash
npm install
```

3. Environment Configuration:
   - Copy the `.env.placeholder` file to `.env`
   - Configure the following environment variables in your `.env` file:
     ```
     PORT=5000
     DB=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/booklog
     JWT_SECRET=your_jwt_secret_key
     ```
   Note: The database name should be `booklog` as specified in the connection string.

4. Development:
   ```bash
   npm run dev
   ```

5. Production Build:
   ```bash
   npm run build
   npm start
   ```

## Deployment on Render.com (or any other service you like)

1. Create a new Web Service
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     - Add all variables from your `.env` file
     - Make sure to set the correct MongoDB connection string
     - Set the appropriate JWT secret

## API Endpoints

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| POST   | /api/register  | Register a new user |
| POST   | /api/login     | Login user          |
| GET    | /api/books     | Get all books       |
| POST   | /api/books     | Add a new book      |
| PATCH  | /api/books/:id | Update a book       |
| DELETE | /api/books/:id | Delete a book       |

### Endpoint Details

#### POST /api/register
Request body:
```json
{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

#### POST /api/login
Request body:
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```
Response:
```json
{
    "message": "Success",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /api/books
Response:
```json
{
    "message": "Success",
    "books": [
        {
            "_id": "65f2e8b7c261e6001234abcd",
            "isbn": "9780061120084",
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "imgUrl": "https://example.com/mockingbird.jpg",
            "progress": 0, // to read
            "createdAt": "2024-03-13T10:00:00.000Z",
            "updatedAt": "2024-03-13T10:00:00.000Z"
        },
        {
            "_id": "65f2e8b7c261e6001234abce",
            "isbn": "9780451524935",
            "title": "1984",
            "author": "George Orwell",
            "imgUrl": "https://example.com/1984.jpg",
            "progress": 1, // in progress
            "createdAt": "2024-03-12T15:30:00.000Z",
            "updatedAt": "2024-03-13T09:45:00.000Z"
        }
    ]
}
```

#### POST /api/books
Request body:
```json
{
    "isbn": "9780140283334",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "imgUrl": "https://example.com/gatsby.jpg",
    "progress": 0
}
```
Response:
```json
{
    "message": "Book created",
    "book": {
        "_id": "65f2e8b7c261e6001234abcf",
        "isbn": "9780140283334",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "imgUrl": "https://example.com/gatsby.jpg",
        "progress": 0,
        "createdAt": "2024-03-13T11:20:00.000Z",
        "updatedAt": "2024-03-13T11:20:00.000Z"
    }
}
```

#### PATCH /api/books/:id
Request body:
```json
{
    "progress": 2 // book completed
}
```
Response:
```json
{
    "message": "Book updated",
    "body": {
        "id": "65f2e8b7c261e6001234abcf"
    },
    "data": {
        "modifiedCount": 1
    }
}
```

#### DELETE /api/books/:id
Response:
```json
{
    "message": "Book removed",
    "body": {
        "id": "65f2e8b7c261e6001234abcf"
    },
    "data": {
        "deletedCount": 1
    }
}
```

### Progress Parameter

The `progress` parameter in the book object indicates the reading status of the book:

| Value | Status    | Description                                   |
|-------|-----------|-----------------------------------------------|
| 0     | To Read   | Book is in your reading list but not started  |
| 1     | Reading   | Book is currently being read                  |
| 2     | Completed | Book has been finished reading                |

Example usage in requests:
```json
// Adding a new book
{
    "isbn": "9780140283334",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "imgUrl": "https://example.com/gatsby.jpg",
    "progress": 0  // or 1 or 2
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Development Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the TypeScript project
- `npm start`: Start the production server
- `npm run watch`: Watch for TypeScript changes

## Project Structure

```
src/
├── app.ts           # Express application setup
├── server.ts        # Server entry point
├── db.ts           # Database connection
├── controllers/    # Route controllers
├── models/        # Mongoose models
└── types/         # TypeScript type definitions
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "message": "Error message description"
}
```
