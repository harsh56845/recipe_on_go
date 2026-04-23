// import { motion } from "framer-motion";
// import "./App.css";

// function Dashboard({ history = [] }) {
//   // Logic to find most frequent dish
//   const mostFrequentDish = history.length > 0 
//     ? history.reduce((a, b, i, arr) => 
//         (arr.filter(v => v.predicted_dish === a.predicted_dish).length >= 
//          arr.filter(v => v.predicted_dish === b.predicted_dish).length ? a : b)
//       ).predicted_dish 
//     : "No Data";

//   const avgConfidence = history.length > 0
//     ? Math.round(history.reduce((acc, curr) => acc + (Number(curr.confidence) || 0), 0) / history.length)
//     : 0;

//   return (
//     <div className="dashboard-container culinary-app">
//       <header className="dashboard-hero">
//         <div className="status-indicator">
//           <span className="pulse-dot"></span>
//           User Analytics
//         </div>
//         <h1 className="title-text">Culinary Insights</h1>
//         <p className="subtitle">Tracking your journey from pantry to plate.</p>
//       </header>

//       {/* STATS GRID */}
//       <div className="stats-grid">
//         <motion.div whileHover={{ scale: 1.02 }} className="stat-card">
//           <p>Total Searches</p>
//           <h2>{history.length}</h2>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.02 }} className="stat-card">
//           <p>Top Preference</p>
//           <h2 style={{ fontSize: '1.8rem' }}>{mostFrequentDish.replace(/_/g, " ")}</h2>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.02 }} className="stat-card">
//           <p>Avg. Match</p>
//           <h2>{avgConfidence}%</h2>
//         </motion.div>
//       </div>

//       <div className="separator"><span>RECENT DISCOVERIES</span></div>
      
//       <div className="history-stack">
//         {history.length > 0 ? (
//           history.slice(0, 10).map((item, index) => (
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="history-card" 
//               key={item.id || index}
//             >
//               <div className="history-icon">🥘</div>
//               <div className="history-content">
//                 <h3>{item.predicted_dish?.replace(/_/g, " ") || "Unknown Dish"}</h3>
//                 <p>{item.ingredients}</p>
//               </div>
//               <div className="confidence-tag">
//                 {item.confidence}% Match
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <div className="error-text" style={{ padding: '40px', opacity: 0.5 }}>
//             No history discovered yet. Start cooking to see your insights!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./App.css";

/* ================= 1. SHARED NAVBAR ================= */
const Navbar = () => (
  <nav className="nav-bar">
    <div className="logo-brand">🍳 RECIPE ON THE GO</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/history">History</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  </nav>
);

/* ================= 2. ASSET LOADING ================= */
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

function Dashboard({ history = [] }) {
  /* ================= 3. LOGIC ================= */
  
  // Efficiently find the most frequent dish
  const mostFrequentDish = history.length > 0 
    ? Object.values(
        history.reduce((acc, { predicted_dish }) => {
          acc[predicted_dish] = (acc[predicted_dish] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b - a)[0] && 
      history.reduce((a, b, i, arr) => 
        (arr.filter(v => v.predicted_dish === a.predicted_dish).length >= 
         arr.filter(v => v.predicted_dish === b.predicted_dish).length ? a : b)
      ).predicted_dish
    : "No Data";

  const avgConfidence = history.length > 0
    ? Math.round(history.reduce((acc, curr) => acc + (Number(curr.confidence) || 0), 0) / history.length)
    : 0;

  return (
    <div className="culinary-app">
      <Navbar />

      <div className="container fade">
        <header className="hero" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            User Analytics
          </div>
          <h1 className="title-text" style={{ fontSize: '3rem' }}>Culinary Insights</h1>
          <p className="subtitle">Tracking your journey from pantry to plate.</p>
        </header>

        {/* STATS GRID */}
        <div className="stats-grid">
          <motion.div whileHover={{ translateY: -5 }} className="stat-card">
            <p>Total Searches</p>
            <h2>{history.length}</h2>
          </motion.div>

          <motion.div whileHover={{ translateY: -5 }} className="stat-card">
            <p>Top Preference</p>
            <h2 style={{ fontSize: '1.6rem' }}>{mostFrequentDish.replace(/_/g, " ")}</h2>
          </motion.div>

          <motion.div whileHover={{ translateY: -5 }} className="stat-card">
            <p>Avg. Match</p>
            <h2>{avgConfidence}%</h2>
          </motion.div>
        </div>

        <div className="separator"><span>RECENT DISCOVERIES</span></div>
        
        <div className="history-stack">
          {history.length > 0 ? (
            history.slice(0, 5).map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="history-card" 
                key={item.id || index}
              >
                {/* Visual Image for the Dashboard List */}
                <div className="history-img-box">
                  <img src={getImage(item.predicted_dish)} alt="" />
                </div>

                <div className="history-content">
                  <h3>{item.predicted_dish?.replace(/_/g, " ") || "Unknown Dish"}</h3>
                  <p className="ingredients-text">{item.ingredients}</p>
                </div>
                
                <div className="confidence-tag">
                  {item.confidence}% Match
                </div>
              </motion.div>
            ))
          ) : (
            <div className="error-text" style={{ padding: '40px', opacity: 0.5, textAlign: 'center' }}>
              No history discovered yet. Start cooking to see your insights!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;