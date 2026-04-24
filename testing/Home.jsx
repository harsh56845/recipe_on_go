import { useState } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";
import getDishImage from "./utils/dishImages";

function App() {
  const [ingredients, setIngredients] = useState([]); // new ux change try
  const [inputValue, setInputValue] = useState(""); // new change
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ FIXED
  const [recipe, setRecipe] = useState(null);

  const handlePredict = async () => {
    if (ingredients.length === 0) {
      setError("Please enter ingredients"); // ✅ FIXED
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);
const API_URL = import.meta.env.VITE_API_URL;

const res = await axios.post(`${API_URL}/predict`, {
  ingredients: ingredients.join(" "),
});
      // const res = await axios.post("http://127.0.0.1:8000/predict", {
      //   ingredients: ingredients.join(" "),
      // });

      if (res.data.error) {
        setError(res.data.error);
        setData(null);
         setIngredients([]); // ✅ CLEAR INPUT
      } else {
        setData(res.data);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };


  const fetchRecipe = async (dish) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

const res = await axios.post(`${API_URL}/get-recipe`, {
  dish,
});
      // const res = await axios.post("http://127.0.0.1:8000/get-recipe", {
      //   dish,
      // });

      if (!res.data.error) {
        setRecipe(res.data);
      } else {
        alert("Recipe not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <h2>🍲 Recipe On The GO</h2>
      </div>

      {/* Search Box */}
      <div className="search-box">
        <div className="search-inner">
          {/* Chips */}
          <div className="chips-container">
            {ingredients.map((item, index) => (
              <span key={index} className="chip">
                {item}
                <button
                  onClick={() =>
                    setIngredients(ingredients.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </span>
            ))}
            {/* Clear All Button */}
            {ingredients.length > 0 && (
              <button className="clear-btn" onClick={() => setIngredients([])}>
                Clear All
              </button>
            )}
          </div>

          {/* Input + Button */}
          <div className="input-row">
            <input
              type="text"
              placeholder="Enter ingredients..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  e.preventDefault();
                  const newItem = inputValue.trim().toLowerCase();

                  if (!ingredients.includes(newItem)) {
                    setIngredients([...ingredients, newItem]);
                  }

                  setInputValue("");
                }
                // BACKSPACE → remove last chip
                if (e.key === "Backspace" && !inputValue) {
                  setIngredients(ingredients.slice(0, -1));
                }
              }}
            />

            <button onClick={handlePredict} disabled={loading}>
              {loading ? "Loading..." : "Predict"}
            </button>
          </div>
        </div>
      </div>
      {/* ✅ ERROR MESSAGE */}
      {error && <p className="error">{error}</p>}

      {/* RESULT */}
      {data && data.top_dish && (
        <div className="grid">
          {/* TOP DISH */}
          <motion.div className="card highlight">
            <img
              src={getDishImage(data.top_dish.dish)}
              alt={data.top_dish.dish}
              className="card-img"
            />
            <div className="card-content">
              <div className="card-header">
                <span className="emoji">⭐</span>
                <h3>{data.top_dish.dish.replace(/_/g, " ")}</h3>
                <button onClick={() => fetchRecipe(data.top_dish.dish)}>
                  View Recipe
                </button>
              </div>

              <p className="confidence-text">
                Confidence: {data.top_dish.confidence}%
              </p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${data.top_dish.confidence}%` }}
                ></div>
              </div>

              <span className="tag">Top Pick</span>
            </div>
          </motion.div>

          {/* OTHER OPTIONS */}
          {data.other_options.map((item, index) => (
            <motion.div className="card" key={index}>
              <img
                src={getDishImage(item.dish)}
                alt={item.dish}
                className="card-img"
              />
              <div className="card-content">
                <div className="card-header">
                  <span className="emoji">🍽️</span>
                  <h3>{item.dish.replace(/_/g, " ")}</h3>
                  <button onClick={() => fetchRecipe(item.dish)}>
                    View Recipe
                  </button>
                </div>

                <p className="confidence-text">
                  Confidence: {item.confidence}%
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.confidence}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* RECIPE MODAL */}
      {recipe && (
        <div className="recipe-modal"
          onClick={() => setRecipe(null)}
          >
          <div className="recipe-content"
          onClick={(e) => e.stopPropagation()} 
          >
            <h2>{recipe.dish.replace(/_/g, " ")}</h2>

            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>Steps:</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <button onClick={() => setRecipe(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;