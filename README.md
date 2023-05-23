# To-Do List
This is a simple To-Do List application built using Express.js. It allows users to create, update, and delete tasks on their to-do list. The application provides a user-friendly interface for managing tasks efficiently.

# Prerequisites
Make sure you have the following software installed on your system:

- Node.js
- npm

# Installation
1. Clone the repository:

        git clone https://github.com/Siddharth-2382/To-Do-List.git
2. Navigate to the project directory:

        cd To-Do-List
3. Install the dependencies:

        npm install

# Configuration
1. Create .env file:
        
        touch .env
2. Save your mongo-atlas username and password in .env:

        MONGO_USERNAME=your_username
        MONGO_PASSWORD=your_password

**OR**
1. Replace mongodb url with your local mongodb url.

        mongoose.connect("mongodb://localhost:27017/todolistDB");

# Usage
1. Run app.js:

        npm start
2. Open your web browser and visit http://localhost:3000 to access the application.
3. You will be presented with a simple interface to manage your to-do list.

# API Endpoints
The application provides the following API endpoints:

- `GET /` : Retrieves the `Today` list from the database.
- `GET /:customListName` : Creates a new list named `customListName` or retrieves the list if it already exists.

# Folder Structure
The project has the following folder structure:

- `public/` : Contains static assets, such as CSS.
- `views/` : Contains the EJS templates for rendering HTML views.

# Dependencies
The application relies on the following dependencies:

- Express.js: A web framework for building server-side applications.
- EJS: A templating engine for generating dynamic HTML views.
- Lodash: A utility library that provides helpful functions for working with data.
- MongoDB: The NoSQL database used for storing and managing data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

# Screenshot

![CleanShot 2023-05-23 at 17 48 51@2x](https://github.com/Siddharth-2382/To-Do-List/assets/94699055/459df52c-9a82-43bf-bc32-4d7d83028f63)
