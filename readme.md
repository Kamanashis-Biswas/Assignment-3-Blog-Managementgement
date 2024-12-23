# Blog Backend Project

## Overview

This project is a backend implementation for a blogging platform where users can write, update, and delete their blogs. The system has two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Features

- User authentication (register and login)
- Role-based access control (Admin and User roles)
- CRUD operations for blogs
- Public API for fetching blogs with search, sort, and filter capabilities
- Admin actions (block user and delete any blog)

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog_platform
   JWT_SECRET=your_jwt_secret_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Routes

### Authentication Routes

Base path: `/api/auth`

| Method | Endpoint  | Description         | Access |
| ------ | --------- | ------------------- | ------ |
| POST   | /register | Register a new user | Public |
| POST   | /login    | Login a user        | Public |

### Blog Routes

Base path: `/api/blogs`

| Method | Endpoint | Description                  | Access        |
| ------ | -------- | ---------------------------- | ------------- |
| POST   | /        | Create a new blog            | Authenticated |
| PATCH  | /:id     | Update a blog                | Authenticated |
| DELETE | /:id     | Delete a blog                | Authenticated |
| GET    | /        | Get all blogs (with filters) | Public        |

### Admin Routes

Base path: `/api/admin`

| Method | Endpoint             | Description     | Access |
| ------ | -------------------- | --------------- | ------ |
| PATCH  | /users/:userId/block | Block a user    | Admin  |
| DELETE | /blogs/:id           | Delete any blog | Admin  |

## API Usage and Expected Responses

### Authentication

#### Register a new user

- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "statusCode": 201,
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

#### Login a user

- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
  }
  ```

### Blog Operations

#### Create a new blog

- **POST** `/api/blogs`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```
- **Response**:
  ```json
  {
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
  }
  ```

#### Update a blog

- **PATCH** `/api/blogs/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```
- **Response**:
  ```json
  {
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
  }
  ```

#### Delete a blog

- **DELETE** `/api/blogs/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
  }
  ```

#### Get all blogs

- **GET** `/api/blogs?search=tech&sortBy=createdAt&sortOrder=desc&filter=60d5ecb8b98c7a1b9cad3a1b`
- **Response**:
  ```json
  {
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
  }
  ```

### Admin Operations

#### Block a user

- **PATCH** `/api/admin/users/:userId/block`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "User blocked successfully",
    "statusCode": 200
  }
  ```

#### Delete any blog (Admin)

- **DELETE** `/api/admin/blogs/:id`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
  }
  ```

## Error Responses

In case of errors, the API will return responses in the following format:

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": { "details": "Additional error details, if applicable" },
  "stack": "error stack trace (only in development mode)"
}
```

#### Login as a Admin

- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "email@gmail.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
  }
  ```
