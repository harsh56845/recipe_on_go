from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# Import ML functions
from ml.model_loader import predict_top_k, is_valid_input, is_meaningful_input

from backend.db import save_history, get_history

from backend.recipes import RECIPES

app = FastAPI()

# Enable CORS (important for frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body structure
class InputData(BaseModel):
    ingredients: str


# Root route (just to test server)
@app.get("/")
def home():
    return {"message": "Recipe Prediction API is running"}


# Prediction route
@app.post("/predict")
def predict(data: InputData):
    ingredients = data.ingredients

    if not is_valid_input(ingredients):
        return {"error": "Invalid input"}

    # 🔥 NEW CHECK
    if not is_meaningful_input(ingredients):
        return {"error": "Please enter valid food ingredients"}

    results = predict_top_k(ingredients)

    for r in results:
        r["confidence"] = round(r["probability"] * 100, 1)

    response = {
        "top_dish": {
            "dish": results[0]["dish"],
            "confidence": results[0]["confidence"]
        },
        "other_options": [
            {
                "dish": r["dish"],
                "confidence": r["confidence"]
            }
            for r in results[1:]
        ]
    }

    save_history(
        ingredients,
        response["top_dish"]["dish"],
        results[0]["probability"]
    )

    return response


@app.post("/get-recipe")
def get_recipe(data: dict):
    dish = data.get("dish", "").lower().replace("_", " ").strip()

    if dish in RECIPES:
        return {
            "dish": dish,
            "ingredients": RECIPES[dish]["ingredients"],
            "steps": RECIPES[dish]["steps"]
        }
    else:
        return {
            "error": "Recipe not found"
        }


@app.get("/history")
def history():
    data = get_history()
    
    for item in data:
        item["confidence"] = round(item["confidence"] * 100, 1)
    
    return data


