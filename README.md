# Nxt Watch – Full Stack MERN Project

## Overview

**Nxt Watch** is a full-stack video streaming web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It provides a seamless experience for users to browse trending, gaming, and saved videos, with full authentication and video management functionalities.

---

## Features

- User authentication (Login/Logout)
- Protected routes for authenticated users
- Search videos with live API integration
- Save, like, and dislike videos
- Light and dark themes toggle
- Responsive UI design with modern layouts
- Video playback with React Player
- Error handling for API failures

---

## Frontend

The frontend includes the following **routes and functionalities**:

- **Login Route**:
  - Validates username/password
  - Redirects authenticated users to Home
  - Shows error messages for invalid credentials
  - Toggle show/hide password

- **Home Route**:
  - Fetches videos from `homeVideosApiUrl`
  - Displays loader while fetching
  - Shows videos or failure/no-videos views
  - Supports search and navigation

- **Trending Route**:
  - Fetches videos from `trendingVideosApiUrl`
  - Displays loader and handles failure
  - Navigation between other routes

- **Gaming Route**:
  - Fetches videos from `gamingVideosApiUrl`
  - Loader and failure handling
  - Sidebar navigation

- **Video Item Details Route**:
  - Fetches video details by ID
  - Supports like, dislike, and save functionality
  - Uses **react-player** for playback

- **Saved Videos Route**:
  - Displays saved videos list
  - Shows empty view if no saved videos
  - Navigation to video details

- **Not Found Route**:
  - Handles invalid URLs
  - Redirects users appropriately

- **Logout**:
  - Logout confirmation popup
  - Cancel closes popup
  - Confirm redirects to Login route

---

## Technologies Used

**Frontend:**

- React.js
- React Router
- Fetch
- React Player
- CSS / Styled Components

**Backend:**

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

---
