import os
import requests  # Ensure to import requests
from fastapi import FastAPI, Depends, HTTPException, Request
from jose import jwt, JWTError
import random
from brain import get_response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

CLERK_JWT_ISSUER = os.environ["CLERK_JWT_ISSUER"]
CLERK_PUBLIC_KEY_URL = os.environ["CLERK_PUBLIC_KEY_URL"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to get the public key for verifying JWT
def get_public_key():
    try:
        response = requests.get(CLERK_PUBLIC_KEY_URL)
        if response.status_code == 200:
            return response.json()
        raise HTTPException(status_code=500, detail="Failed to retrieve public key.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to verify JWT token
def verify_clerk_token(token: str):
    public_key_data = get_public_key()

    try:
        # The public key needs to be in the right format for decoding
        decoded_token = jwt.decode(token, public_key_data, algorithms=["RS256"], issuer=CLERK_JWT_ISSUER)
        return decoded_token
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token.")

# Dependency to check if the JWT is valid
def check_jwt(request: Request):
    authorization = request.headers.get("Authorization")
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing.")
    
    token = authorization.split(" ")[1]  # Extract the token from the header
    return verify_clerk_token(token)  # Verify the token

# Function to get a response based on user input
def get_here(user_input):
    random_number = random.randint(1, 17)
    file_name = f"templates/template{random_number}.txt"

    try:
        with open(file_name, 'r') as file:
            file_content = file.read()
        response = get_response(file_content, user_input)
        return response  # Make sure to return the response
    except FileNotFoundError:
        print(f"{file_name} not found.")
        return "File not found."  # Return a message if the file is not found

# Route that requires a valid JWT
@app.get("/response/")
async def get_email(topic: str, token: dict = Depends(check_jwt)):
    # JWT validation is done in the check_jwt function
    # If the token is invalid, this endpoint won't be reached

    print(f"Received request with topic: {topic}")
    print(f"Validated JWT token: {token}")

    # Get the response based on the topic
    response = get_here(topic)
    print(f"Received response from get_here: {response}")

    # Handle cases where response may not contain code
    if "```" not in response:
        print(f"No code block found in the response for topic: {topic}")
        return JSONResponse(content={"error": "No code block found in response."}, status_code=400)
    
    # Extracting code block
    start = response.find("```") + 3
    end = response.rfind("```")
    code = response[start:end]
    instructions = response[end + 3:] if end + 3 < len(response) else ""  # Safeguard against out-of-bounds

    # Debugging extracted code and instructions
    print(f"Extracted code: {code}")
    print(f"Extracted instructions: {instructions}")

    # Construct the JSON response
    content = {"code": code, "instructions": instructions}
    
    print(f"Returning response for topic: {topic}")
    return JSONResponse(content=content, media_type="application/json")
