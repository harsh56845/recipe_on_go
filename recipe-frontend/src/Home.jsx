import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "./App.css";

/* ================= 1. ASSET LOADING ================= */
const imageModules = import.meta.glob("/src/assets/*.png", { eager: true, import: "default" });
const imageMap = {};
Object.entries(imageModules).forEach(([path, url]) => {
  const fileName = path.split("/").pop().split(".")[0].toLowerCase();
  imageMap[fileName] = url;
});

const getImage = (dishName) => {
  if (!dishName) return imageMap["default"];
  const cleanName = dishName.toLowerCase().trim().replace(/\s+/g, "_");
  return imageMap[cleanName] || imageMap["default"];
};

function Home() {
  /* ================= 2. STATE ================= */
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [recipe, setRecipe] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const heroTexts = ["🔥 Turn ingredients into magic", "🍳 What's in your fridge?", "👨‍🍳 Let's cook something amazing!"];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex((p) => (p + 1) % heroTexts.length), 4000);
    return () => clearInterval(interval);
  }, [heroTexts.length]);

  /* ================= 3. API LOGIC ================= */
  const handlePredict = async () => {
    if (ingredients.length === 0) {
      setError("Please add some ingredients first.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        ingredients: ingredients.join(" "),
      });
      
      if (res.data.error) {
        setError(res.data.error);
        setData(null);
      } else {
        setData(res.data);
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipe = async (dish) => {
    try {
      setRecipeLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/get-recipe", { dish });
      if (!res.data.error) {
        setRecipe(res.data);
      } else {
        alert("Recipe details not found in our database!");
      }
    } catch (err) {
      alert("Error fetching recipe details.");
    } finally {
      setRecipeLoading(false);
    }
  };

  // Helper to handle adding ingredients via Enter key
  const addIngredient = () => {
    const val = inputValue.toLowerCase().trim();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setInputValue("");
      setError("");
    } else if (ingredients.includes(val)) {
      setError("That ingredient is already added!");
    }
  };

  const dishes = data?.top_k || (data?.top_dish ? [data.top_dish, ...(data.other_options || [])] : []);

  return (
    <div className="culinary-app">
      <nav className="nav-bar">
        <div className="logo-brand">🍳 RECIPE ON THE GO</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <div className="container">
        <header className="hero">
          <div className="status-indicator">
            <span className="pulse-dot"></span> {ingredients.length} Items Selected
          </div>
          <h1 key={heroIndex} className="title-text fade">{heroTexts[heroIndex]}</h1>
        </header>

        <section className="search-wrap">
          <div className="modern-search">
            <div className="tags-area">
              {ingredients.map((item, index) => (
                <div key={index} className="tag">
                  {item} <button onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}>×</button>
                </div>
              ))}
              {ingredients.length > 0 && <button className="clear-all" onClick={() => {setIngredients([]); setData(null);}}>Clear All</button>}
            </div>
            <div className="input-box">
              <input
                value={inputValue}
                placeholder="Onion, Tomato, Chicken..."
                onChange={(e) => {setInputValue(e.target.value); setError("");}}
                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
              />
              <button onClick={handlePredict} className={`action-btn ${ingredients.length > 0 ? 'active' : ''}`}>
                {loading ? "Simmering..." : "Find Recipes"}
              </button>
            </div>
          </div>
          {error && <p className="error-text" style={{color: '#ff6b6b'}}>{error}</p>}
        </section>

        {dishes.length > 0 && (
          <main className="results">
            <div className="separator"><span>TOP PICKS FOR YOU</span></div>
            <div className="recipe-grid">
              {dishes.slice(0, 3).map((dish, index) => (
                <div key={index} className="recipe-card">
                  <div className="image-holder">
                    <img src={getImage(dish.dish)} alt={dish.dish} />
                    <div className="match-percent">{Math.round(dish.confidence)}% Match</div>
                  </div>
                  <div className="info">
                    <label>MAIN COURSE</label>
                    <h3>{dish.dish.replace(/_/g, " ")}</h3>
                    <button 
                      className="start-btn" 
                      onClick={() => fetchRecipe(dish.dish)}
                      disabled={recipeLoading}
                    >
                      {recipeLoading ? "Opening..." : "Start Cooking"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}
      </div>

      {/* --- RECIPE MODAL --- */}
      {recipe && (
        <div className="modal-overlay" onClick={() => setRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRecipe(null)}>×</button>
            
            <img src={getImage(recipe.dish)} className="modal-hero-img" alt={recipe.dish} />
            <h2 className="modal-title">{recipe.dish.replace(/_/g, " ")}</h2>
            
            <div className="modal-body">
              <section className="modal-section">
                <h4>🛒 Needed Ingredients</h4>
                <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
              </section>
              <section className="modal-section">
                <h4>👨‍🍳 Cooking Steps</h4>
                <ol>{recipe.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
              </section>
            </div>
            
            <button className="close-btn-bottom" onClick={() => setRecipe(null)}>Got it, Let's Cook!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;