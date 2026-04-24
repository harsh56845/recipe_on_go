import pickle
import os

# ---------------- SYNONYMS ----------------
SYNONYMS = {
    # Hindi → English
    "aloo": "potato",
    "aaloo": "potato",
    "nariyal":"coconut",
    "chawal": "rice",
    "tamatar": "tomato",
    "pyaz": "onion",
    "pyaaz": "onion",
    "lasun": "garlic",
    "adrak": "ginger",
    "bhindi": "okra",
    "baingan": "eggplant",
    "lauki": "bottle_gourd",
    "tori": "ridge_gourd",
    "karela": "bitter_gourd",
    "matar": "peas",
    "paneer": "paneer",
    "dahi": "curd",
    "roti": "chapati",
    "atta": "wheat_flour",
    "maida": "refined_flour",
    "besan": "gram_flour",
    "sabji": "vegetable",
    "sabzi": "vegetable",

    # English variations
    "potatoes": "potato",
    "onions": "onion",
    "tomatoes": "tomato",
    "chilies": "chili",
    "chillies": "chili",
    "curd": "yogurt",
    "yoghurt": "yogurt"
}

def normalize_input(text):
    words = text.lower().strip().split()
    normalized = []

    for word in words:
        if word in SYNONYMS:
            normalized.append(SYNONYMS[word])
        else:
            normalized.append(word)

    return " ".join(normalized)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "models", "model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "models", "vectorizer.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)

with open(vectorizer_path, "rb") as f:
    vectorizer = pickle.load(f)


def predict_top_k(ingredients: str, k=3):
    ingredients = normalize_input(ingredients)
    ingredients = ' '.join(sorted(ingredients.split()))
    
    input_vector = vectorizer.transform([ingredients])
    probs = model.predict_proba(input_vector)[0]
    classes = model.classes_
    
    top_k_idx = probs.argsort()[-k:][::-1]
    
    results = []
    for i in top_k_idx:
        results.append({
            "dish": classes[i],
            "probability": float(round(probs[i], 3))
        })
    
    return results


def predict_dish(ingredients: str):
    ingredients = normalize_input(ingredients)
    ingredients = ' '.join(sorted(ingredients.split()))
    
    input_vector = vectorizer.transform([ingredients])
    prediction = model.predict(input_vector)
    
    return prediction[0]


def is_valid_input(ingredients: str):
    return isinstance(ingredients, str) and len(ingredients.strip()) > 0


def is_meaningful_input(ingredients: str):
    ingredients = normalize_input(ingredients)

    ingredients = ingredients.split()
    
    valid_words = set(vectorizer.get_feature_names_out())
    
    count = 0
    for word in ingredients:
        if word in valid_words:
            count += 1
    
    return count >= 2   # at least 1 valid ingredient


if __name__ == "__main__":
    print(predict_top_k("chicken onion tomato"))