# Nxt Watch - Full Stack Video Streaming App

![Nxt Watch Logo](./frontend/src/assets/logo.png)

**Nxt Watch** is a full-stack video streaming platform inspired by popular video apps. It allows users to browse trending, gaming, and saved videos, view detailed video pages, and manage their preferences. Built with **React** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## Table of Contents

1. [Features](#features)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [Routes](#routes)
5. [Functionality](#functionality)
6. [Getting Started](#getting-started)
7. [Technologies Used](#technologies-used)
8. [License](#license)

---

## Features

- Light/Dark theme toggle
- User authentication (Login/Register)
- Video browsing: Home, Trending, Gaming
- Video details page with Like, Dislike, and Save functionality
- Save videos for later viewing
- Responsive design
- Error handling for failed API requests
- Logout confirmation popup
- Not Found page for invalid routes

---

## Frontend

**Pages / Routes:**

- **Login Route**: User authentication, show/hide password
- **Home Route**: Display all videos with search functionality
- **Trending Route**: Display trending videos
- **Gaming Route**: Display gaming videos
- **Video Item Details Route**: Detailed video page with React Player
- **Saved Videos Route**: Display saved videos list
- **Not Found Route**: Handles invalid paths
- **Popup Design**: Logout confirmation popup

**Frontend Functionality:**

- Conditional navigation based on authentication
- Loader displayed while fetching data
- Retry option on API failure
- Dynamic button states (Like, Dislike, Save)
- Redirect users correctly on login/logout
- Search videos via API query
- Responsive layout for all devices

---

## Backend

**Overview:**

The backend is built with **Node.js**, **Express**, and **MongoDB**. It handles authentication, video data APIs, and saved videos management.
