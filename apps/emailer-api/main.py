from fastapi import FastAPI
import random
from brain import get_response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_here(user_input):
    random_number = random.randint(1, 17)

    file_name = f"templates/template{random_number}.txt"

    try:
        with open(file_name, 'r') as file:
            file_content = file.read()
        response = get_response(file_content, user_input)
        print(response)
    except FileNotFoundError:
        print(f"{file_name} not found.")

    return response


@app.get("/response/")
async def get_email(topic: str):
    response = get_here(topic)
    start = response.find("```") + 3
    end = response.rfind("```")
    code = response[start:end]
    instructions = response[end + 3:]
    content = {"code": code, "instructions": instructions}
    print(code)
    return JSONResponse(content=content, media_type="application/json")
