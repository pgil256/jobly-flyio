# Jobly Flyio

## Overview

🌐 [jobly-app.fly.dev/](https://jobly-app.fly.dev/)

**Jobly Flyio** is a web application designed to assist users in managing and organizing their tasks and responsibilities. The application is built with a frontend-backend architecture, utilizing modern web technologies.

## Features
- **Backend**: Provides API endpoints for data retrieval, insertion, and modification.
- **Frontend**: A user-friendly interface that communicates with the backend to present and gather information.

## Getting Started

### Prerequisites
- Docker
- Node.js (version 20.2.0 or higher)
- PostgreSQL (for the backend database)

### Running Locally
1. Clone the repository.
2. Navigate to the root directory and build the Docker container using:
   ```bash
   docker build -t jobly-flyio .
Start the PostgreSQL server (on Linux):

bash
Copy code
sudo service postgresql start
Navigate to the backend directory and run:

bash
Copy code
npm start
In a separate terminal, navigate to the frontend directory and run:

bash
Copy code
npm start
Testing
Ensure you have Jest installed. Navigate to the respective directory (frontend or backend) and run:

bash
Copy code
npm test
Technology Stack
Frontend: React (version 18.2.0)
Backend: Node.js (version 20.2.0)
Styling: SASS modules
Database: PostgreSQL
Contributing
Feel free to submit pull requests or raise issues to improve the application.
