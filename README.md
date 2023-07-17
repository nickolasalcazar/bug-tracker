# Bug Tracker

A bug tracking web application designed to track and manage bugs for a software project. The application is built on Amazon RDS, Express.js, React.js, and Node.js. It provides an easy-to-use interface for creating, updating, and resolving bugs.

The app is composed of three microservices: a React frontend, a Node (Express) backend, and a Postgres database. These services are containerized and can be run locally using `docker-compose`.

## Run the project locally

### Run the project with Docker

After cloning the project, run the app locally with the `docker-compose` command
`docker-compose up -d --build`

### Run the project without Docker

No database functionality is present out-the-box without launching the app with Docker. If you still wish to just launch the frontend and backend without database functionality, use the following commands.

If Docker is not installed, run the backend with the command
`cd server && npm start`

And the frontend with the command
`cd client && npm start`

## Project Status

This is a hobby project that I work on in my free time. Additional features will be added with time.
