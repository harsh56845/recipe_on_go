from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ✅ Correct imports
from backend.db import init_db, save_history, get_history
from backend.recipes import RECIPES

# (Optional: if ML file exists)
from backend.ml.model_loader import predict_top_k, is_valid_input, is_meaningful_input

# ✅ Create app FIRST
app = FastAPI()

# ✅ Run DB on startup
@app.on_event("startup")
def startup():
    init_db()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Request model
class InputData(BaseModel):
    ingredients: str


# ================= ROUTES ================= #

# ✅ Home
@app.get("/")
def home():
    return {"message": "API is running 🚀"}


# ✅ Predict dish
@app.post("/predict")
def predict(data: InputData):
    ingredients = data.ingredients

    # validation
    if not is_valid_input(ingredients):
        return {"error": "Invalid input"}

    if not is_meaningful_input(ingredients):
        return {"error": "Please enter valid food ingredients"}

    results = predict_top_k(ingredients)

    if not results:
        return {"error": "No matching dish found"}

    # format response
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

    # save to DB
    save_history(
        ingredients,
        response["top_dish"]["dish"],
        results[0]["probability"]
    )

    return response


# ✅ Get recipe
class RecipeRequest(BaseModel):
    dish: str

@app.post("/get-recipe")
def get_recipe(data: RecipeRequest):
    dish = data.dish.lower().replace("_", " ").strip()

    if dish in RECIPES:
        return {
            "dish": dish,
            "ingredients": RECIPES[dish]["ingredients"],
            "steps": RECIPES[dish]["steps"]
        }
    else:
        return {"error": "Recipe not found"}


# ✅ History
@app.get("/history")
def history():
    data = get_history()

    for item in data:
        item["confidence"] = round(item["confidence"] * 100, 1)

    return data