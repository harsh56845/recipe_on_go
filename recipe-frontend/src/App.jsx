// import { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import axios from "axios";

// // Components
// import Home from "./Home";
// import Dashboard from "./Dashboard";
// import History from "./History"; // Added this import

// import "./App.css";

// function App() {
//   const [history, setHistory] = useState([]);

//   // Fetch history from your backend API
//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/history");
//       setHistory(res.data);
//     } catch (err) {
//       console.error("Error fetching history:", err);
//     }
//   };

//   // Load history on mount
//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/history" element={<History />} />
//         {/* We pass the history state as a prop to Dashboard */}
//         <Route path="/dashboard" element={<Dashboard history={history} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import History from "./History";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [historyData, setHistoryData] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/history");
      setHistoryData(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard history={historyData} />} />
      </Routes>
    </div>
  );
}

export default App;