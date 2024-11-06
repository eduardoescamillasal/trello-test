
# Trello Mini Kanban

## Overview

This project is a Trello-like Kanban board application. It includes a frontend built with React and a backend API powered by Python using FastAPI. Data is stored locally using DynamoDB.

## Prerequisites

To run this project locally, you’ll need the following:

- **Node.js** and **npm** (preferably using Node v18.2.0): [Download here](https://nodejs.org/)
  - **NVM**: If you use Node Version Manager, ensure to set the version with `nvm use 18.2.0`
- **Python 3.9**: [Download here](https://www.python.org/downloads/)
- **DynamoDB Local**: Download and configure for local development
- **Uvicorn**: ASGI server to run the FastAPI backend
- **AWS CLI** (optional for DynamoDB setup): [Download here](https://aws.amazon.com/cli/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Setting Up the Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd trello-test-frontend
nvm use 18.2.0  # Ensure Node version 18.2.0
npm install
```

### 3. Setting Up the Backend

Navigate to the backend directory and create a virtual environment for dependencies:

```bash
cd ../trello-test-backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Set Up DynamoDB Locally

Download DynamoDB Local from the [AWS DynamoDB Local page](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

1. **Unzip and start DynamoDB Local**:

   ```bash
   java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
   ```

2. **Configure AWS CLI for Local DynamoDB** (optional):

   ```bash
   aws configure
   # Set these values for local development:
   # AWS Access Key ID [None]: dummy-key
   # AWS Secret Access Key [None]: dummy-secret
   # Default region name [None]: us-west-2
   # Default output format [None]: json
   ```

   Then, point the AWS CLI to use the local DynamoDB instance:

   ```bash
   export AWS_ENDPOINT_URL="http://localhost:8000"
   ```

### 5. Configure Environment Variables

Create an `.env` file in the `trello-test-backend` directory with necessary configurations:

```plaintext
# DynamoDB Local URL
DYNAMODB_ENDPOINT=http://localhost:8000

# Other environment variables as needed
```

### 6. Running the Backend with Uvicorn

To start the FastAPI backend server with `uvicorn`, run:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 5003
```

This will start the backend server at `http://127.0.0.1:5003`.

### 7. Running the Frontend

In a separate terminal window, go to the `trello-test-frontend` directory and start the React development server:

```bash
npm start
```

The frontend should now be accessible at `http://localhost:3000`.

## API Documentation

The FastAPI backend includes auto-generated API documentation. You can access it at:

- Swagger UI: `http://127.0.0.1:5003/docs`
- ReDoc: `http://127.0.0.1:5003/redoc`

## Troubleshooting

- **DynamoDB Connection Issues**: Ensure DynamoDB Local is running on `http://localhost:8000`.
- **CORS Issues**: If you encounter CORS errors, ensure the frontend and backend have appropriate CORS settings.
- **Environment Variables**: Ensure all required environment variables are set correctly in `.env`.

## Additional Commands

### Stopping DynamoDB Local

To stop DynamoDB Local, press `Ctrl + C` in the terminal window where it’s running.



---
