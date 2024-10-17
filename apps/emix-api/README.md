# MJML Email Template Generator API

This repository contains the API backend for an application that creates dynamic MJML email templates. The API leverages FastAPI to handle requests, selects random MJML templates, and generates customized email content based on user-provided topics.

## Table of Contents

- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [GET /response/](#get-response)
- [Project Structure](#project-structure)


## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/flex3-org/emailer.git
cd emailer
```

### 2. Create a Virtual Environment
```bash
python3 -m venv venv
```
### 3. Activate the Virtual Environment
- On macOS/Linux:
  ```
  source venv/bin/activate 
  ```
- On Windows:
```bash
venv\Scripts\activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Variables
Create a .env file in the root directory of your project and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 5. Start the FastAPI server using uvicorn:

```bash
uvicorn main:app --reload
```
The server will start at http://127.0.0.1:8000. You can access the interactive API documentation at http://127.0.0.1:8000/docs.

## API Documentation

### GET `/response/`

Generates a customized MJML email template based on the provided topic. This endpoint accepts a topic as a query parameter, selects a random MJML template, processes it with the provided topic, and returns a structured JSON response containing the generated email code and additional instructions.

#### Request

- **Method:** `GET`
- **Endpoint:** `/response/`
- **Query Parameters:**
  - `topic` (string, required): The topic or description based on which the email template will be customized.

#### Example Request

```bash
GET http://127.0.0.1:8000/response/?topic=GDG%20Hackathon%20Success
```

## Project Structure
```
your_project/
├── templates/
│   ├── template1.txt
│   ├── template2.txt
│   ├── ...
│   └── template17.txt
├── brain.py
├── main.py
├── .env
├── requirements.txt
└── README.md
```
