// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import "./App.css";

// // function History() {
// //   const [history, setHistory] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchHistory();
// //   }, []);

// //   const fetchHistory = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get("http://127.0.0.1:8000/history");
// //       setHistory(res.data);
// //     } catch (err) {
// //       console.error("Error fetching history:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="dashboard-container culinary-app">
// //       {/* HEADER */}
// //       <header className="dashboard-hero">
// //         <div className="status-indicator">
// //           <span className="pulse-dot"></span>
// //           Archive
// //         </div>
// //         <h1 className="title-text">Search History</h1>
// //         <p className="subtitle">Every flavor journey you've embarked on.</p>
// //       </header>

// //       <div className="separator"><span>YOUR CULINARY TIMELINE</span></div>

// //       {/* HISTORY LIST */}
// //       <div className="history-stack">
// //         {loading ? (
// //           <p className="error-text">Loading your kitchen logs...</p>
// //         ) : history.length === 0 ? (
// //           <div className="error-text" style={{ padding: '60px', opacity: 0.5 }}>
// //             <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>📔</span>
// //             Your history is a blank page. Start predicting to fill it up!
// //           </div>
// //         ) : (
// //           history.map((item, index) => (
// //             <motion.div 
// //               initial={{ opacity: 0, y: 15 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: index * 0.05 }}
// //               className="history-card" 
// //               key={item.id || index}
// //             >
// //               <div className="history-icon">📜</div>
              
// //               <div className="history-content">
// //                 <h3>{item.predicted_dish.replace(/_/g, " ")}</h3>
// //                 <p className="ingredients-text">
// //                   {item.ingredients}
// //                 </p>
// //               </div>

// //               <div className="confidence-tag">
// //                 {item.confidence}% Match
// //               </div>
// //             </motion.div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default History;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import "./App.css";
// import { Link } from "react-router-dom";

// export const Navbar = () => (
//   <nav className="nav-bar">
//     <div className="logo-brand">🍳 RECIPE ON THE GO</div>
//     <div className="nav-links">
//       <Link to="/">Home</Link>
//       <Link to="/history">History</Link>
//       <Link to="/dashboard">Dashboard</Link>
//     </div>
//   </nav>
// );

// /* ================= 1. ASSET LOADING (Same as Home) ================= */
// const imageModules = import.meta.glob("/src/assets/*.png", { eager: true, import: "default" });
// const imageMap = {};
// Object.entries(imageModules).forEach(([path, url]) => {
//   const fileName = path.split("/").pop().split(".")[0].toLowerCase();
//   imageMap[fileName] = url;
// });

// const getImage = (dishName) => {
//   if (!dishName) return imageMap["default"];
//   const cleanName = dishName.toLowerCase().trim().replace(/\s+/g, "_");
//   return imageMap[cleanName] || imageMap["default"];
// };

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://127.0.0.1:8000/history");
//       setHistory(res.data);
//     } catch (err) {
//       console.error("Error fetching history:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="culinary-app">
//       <div className="container">
//         <header className="hero">
//           <div className="status-indicator">
//             <span className="pulse-dot"></span> Archive
//           </div>
//           <h1 className="title-text">Your Kitchen Logs</h1>
//         </header>

//         <div className="separator"><span>PREVIOUS DISCOVERIES</span></div>

//         <div className="history-stack">
//           {loading ? (
//             <p className="error-text">Retrieving your recipes...</p>
//           ) : history.length === 0 ? (
//             <p className="error-text">No history found.</p>
//           ) : (
//             history.map((item, index) => (
//               <motion.div 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="history-card" 
//                 key={item.id || index}
//               >
//                 {/* 📸 IMAGE INSTEAD OF ICON */}
//                 <div className="history-img-box">
//                   <img src={getImage(item.predicted_dish)} alt={item.predicted_dish} />
//                 </div>
                
//                 <div className="history-content">
//                   <h3>{item.predicted_dish.replace(/_/g, " ")}</h3>
//                   <p className="ingredients-text">{item.ingredients}</p>
//                 </div>

//                 <div className="confidence-tag">
//                   {item.confidence}% Match
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default History;

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./App.css";

/* ================= 1. SHARED NAVBAR ================= */
// You can also move this to a separate Navbar.jsx file later
export const Navbar = () => (
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

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;

const res = await axios.get(`${API_URL}/history`);
      // const res = await axios.get("http://127.0.0.1:8000/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="culinary-app">
      {/* FIXED: Added Navbar here */}
      <Navbar />

      <div className="container">
        <header className="hero">
          <div className="status-indicator">
            <span className="pulse-dot"></span> Archive
          </div>
          <h1 className="title-text" style={{ fontSize: '3rem' }}>Your Kitchen Logs</h1>
          <p className="subtitle">Every flavor journey you've embarked on.</p>
        </header>

        <div className="separator"><span>PREVIOUS DISCOVERIES</span></div>

        <div className="history-stack">
          {loading ? (
            <p className="error-text">Retrieving your recipes...</p>
          ) : history.length === 0 ? (
            <div className="error-text" style={{ padding: '60px', opacity: 0.5, textAlign: 'center' }}>
               <span style={{ fontSize: '40px', display: 'block' }}>📔</span>
               No history found. Start cooking to fill your logs!
            </div>
          ) : (
            history.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="history-card" 
                key={item.id || index}
              >
                {/* Image Box */}
                <div className="history-img-box">
                  <img 
                    src={getImage(item.predicted_dish)} 
                    alt={item.predicted_dish} 
                    onError={(e) => e.target.src = imageMap["default"]}
                  />
                </div>
                
                <div className="history-content">
                  <h3>{item.predicted_dish.replace(/_/g, " ")}</h3>
                  <p className="ingredients-text">{item.ingredients}</p>
                </div>

                <div className="confidence-tag">
                  {item.confidence}% Match
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default History;