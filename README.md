# Buzz Board

Buzz Board is a social media platform where users can create discussions, share thoughts, and engage in conversations. This project is built using Node.js, TypeScript, Express, and MongoDB.

## Tech Stack -

**Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.  
**TypeScript**: A statically typed superset of JavaScript that adds optional types, classes, and other features.  
**Express**: A minimal and flexible Node.js web application framework.  
**MongoDB**: A popular NoSQL document database used for storing application data.
**Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
**JSON Web Tokens (JWT)**: A compact and self-contained way for securely transmitting information between parties as a JSON object.

## Features

- User authentication (signup, login)
- Create, update, and delete discussions
- Add hashtags and images to discussions
- Search discussions by text or hashtags
- Comment on discussions and reply to comments
- Like comments
- Follow other users
- View discussion statistics (likes, views)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   `git@github.com:tushar-nath/buzzboard-server.git`

2. **Install the dependencies:**

   `npm install`

3. **Set up environment variables:** Create a `.env` file in the project root directory and add the following variables:

   `PORT=3000`
   `MONGODB_URI=mongodb://localhost:27017/buzzboard`
   `JWT_SECRET=your_jwt_secret`

4. **Start the server:**
   `npm start`
   The server will be running at `http://localhost:3000`.

## API Documentation

### User Endpoints

- `POST /api/users/signup`: Register a new user.
- `POST /api/users/login`: Authenticate and log in a user.
- `PUT /api/users/:id` (Authenticated): Update a user's profile.
- `DELETE /api/users/:id` (Authenticated): Delete a user's account.
- `GET /api/users/` (Authenticated): Get a list of all users.
- `GET /api/users/search?name=<name>` (Authenticated): Search for users by name.
- `PUT /api/users/follow/:id` (Authenticated): Follow another user.

### Discussion Endpoints

- `POST /api/discussions/` (Authenticated): Create a new discussion.
- `PUT /api/discussions/:id` (Authenticated): Update a discussion.
- `DELETE /api/discussions/:id` (Authenticated): Delete a discussion.
- `GET /api/discussions/tags?tags=<tag1>,<tag2>,...`: Get discussions by hashtags.
- `GET /api/discussions/text?text=<text>`: Search discussions by text.
- `PUT /api/discussions/:id/view` (Authenticated): Increment the view count of a discussion.

### Comment Endpoints -

- `POST /api/comments/` (Authenticated): Create a new comment on a discussion.
- `PUT /api/comments/:id/like` (Authenticated): Like a comment.
- `POST /api/comments/:id/reply` (Authenticated): Reply to a comment.
- `PUT /api/comments/:id` (Authenticated): Update a comment.

### Health Check Endpoint -

- `GET /api/healthcheck/`: Check the health status of the application.

## Hosted Postman API Collection

A hosted public Postman API collection is available for easy testing and exploration of the API endpoints: [Buzz Board API Collection]([https://www.postman.com/your-workspace/collection/YOUR_COLLECTION_ID](https://www.postman.com/restless-moon-196183/workspace/buzzboard/collection/24997979-9bcb7e0c-6154-46c3-a57c-f7ea8ef8b786?action=share&creator=24997979))

## Low-Level Design Document

The Low-Level Design Document (LLD) for this project is available on Google Docs: [LLD Link](https://docs.google.com/document/d/1WsfShQwMNVZA238XIgq9W9xmmri6AlLpjvifxtXsTbY/edit?usp=sharing)
