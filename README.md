# React + Vite
# LowCost Airline Booking App

This project is a MERN (MongoDB, Express.js, React.js, Node.js) application for booking flights with a custom seating algorithm. Chakra UI is utilized for frontend design and user interface.

## Features

- **User Authentication**: Allows users to register, login, and manage their accounts.
- **Flight Booking**: Enables users to search for available flights, view flight details, and book seats.
- **Seating Algorithm**: Implements a custom algorithm to optimize seat selection and prevent single scattered seats.
- **Discounts for Children**: Offers a 25% discount on seats for children aged 15 or younger.
- **Cancellation Policy**: Enforces a policy where tickets cannot be cancelled within 72 hours of departure.
- **Staff and Management Features**: Provides additional features for staff and management, including seat locking/unlocking and manual booking for customers.

## Technologies Used

- **Frontend**: React.js, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Seating Algorithm**: Custom algorithm implemented in JavaScript

## Project Structure

- **client**: Contains the frontend React application.
- **server**: Houses the backend Node.js and Express.js server.
- **database**: Manages MongoDB database connections and models.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the `client` directory: `cd client` and install dependencies: `npm install`
3. Repeat step 2 for the `server` directory.
4. Set up MongoDB database connection and configure environment variables.
5. Start the frontend and backend servers: `npm start` in both the `client` and `server` directories.

## Usage

- Access the application through the provided URL.
- Register or login to your account.
- Search for available flights and select seats.
- Proceed with booking and payment.
- View booking details and manage your reservations.
