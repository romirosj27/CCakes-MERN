## CCakes E-commerce Website
Welcome to the CCakes E-commerce Website! This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse and purchase cakes, while administrators can manage the cake listings.

## Features
User authentication and authorization
Browse cake listings with image galleries
Admin panel to add, update, and delete cakes
Image upload and storage
Responsive design for mobile and desktop users

## Tech Stack
Frontend: React.js, Axios, React Router
Backend: Node.js, Express.js, Mongoose
Database: MongoDB
Other Libraries: Multer (for image uploads), bcryptjs (for password hashing), JWT (for authentication)

## Installation
Clone the repository:

git clone https://github.com/your-username/ccakes-mern.git
cd ccakes-mern

Install dependencies for both frontend and backend:

cd server
npm install
cd ../client
npm install

Running the Backend
Set up your environment variables:
Create a .env file in the server directory and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

cd server
npm start

The backend server should now be running on http://localhost:5000.

Running the Frontend
Start the frontend development server:

cd client
npm start
The frontend server should now be running on http://localhost:3000.

## Usage
Open your browser and navigate to http://localhost:3000 to access the application.
Navigate through the website to browse cakes, and use the admin panel to manage cake listings.
