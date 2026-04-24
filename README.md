# 🍽️ Recipe On The Go (Full Stack AI App)

A full-stack AI-powered recipe recommendation system that predicts dishes based on user-provided ingredients and provides detailed cooking steps.

---

# 🎓 Academic Project

📌 **Major Project (MCA 4th Semester)**
🏫 Harcourt Butler Technical University (HBTU), Kanpur

---

# 🚀 Live Demo

* 🌐 **Frontend (Vercel)**: https://recipe-on-admroc7hu-harsh56845s-projects.vercel.app/
* ⚙️ **Backend (Railway)**: https://recipeongo-production.up.railway.app
* 📘 **API Docs**: https://recipeongo-production.up.railway.app/docs

---

# 🧠 Features

* 🔍 Predict dish from ingredients using AI model
* 📖 Get complete recipe (ingredients + steps)
* 🕓 Store and view search history
* ⚡ FastAPI backend with REST APIs
* 🎨 Interactive React UI (Vite)
* ☁️ Fully deployed (Vercel + Railway)

---

# 🏗️ Project Structure

```
Racipe-project/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── recipes.py
│   ├── ml/
│   ├── requirements.txt
│   └── __init__.py
│
├── recipe-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Backend Setup (FastAPI)

## 📌 1. Navigate to backend

```
cd backend
```

## 📌 2. Create virtual environment

```
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

## 📌 3. Install dependencies

```
pip install -r requirements.txt
```

## 📌 4. Run backend

```
uvicorn backend.main:app --reload
```

## 📌 5. Open API docs

* http://127.0.0.1:8000/docs

---

# 💾 Database

* Uses **SQLite (recipes.db)**
* Automatically created on startup
* Stores user search history

---

# 🎨 Frontend Setup (React + Vite)

## 📌 1. Navigate to frontend

```
cd recipe-frontend
```

## 📌 2. Install dependencies

```
npm install
```

## 📌 3. Create `.env`

```
VITE_API_URL=http://127.0.0.1:8000
```

## 📌 4. Run frontend

```
npm run dev
```

## 📌 5. Open app

* http://localhost:5173

---

# 🔗 Frontend ↔ Backend Connection

```js
const API_URL = import.meta.env.VITE_API_URL;
```

---

# ☁️ Deployment

## 🚀 Backend (Railway)

1. Push code to GitHub
2. Create project on Railway
3. Deploy from GitHub repo
4. Add Start Command:

```
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

5. Go to **Networking → Generate Domain**
6. Use your live backend:

```
https://recipeongo-production.up.railway.app
```

---

## 🌐 Frontend (Vercel)

1. Import project (`recipe-frontend`)
2. Add environment variable:

```
VITE_API_URL=https://recipeongo-production.up.railway.app
```

3. Deploy

---

# 🧪 API Endpoints

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| GET    | /           | Health check         |
| POST   | /predict    | Predict dish         |
| POST   | /get-recipe | Fetch recipe details |
| GET    | /history    | View search history  |

---

# ⚠️ Common Issues

### ❌ Backend not connecting

* Check `VITE_API_URL`

### ❌ CORS error

* Ensure CORS middleware enabled

### ❌ Wrong Railway URL

* Do NOT use `.railway.internal`
* Always use `.up.railway.app`

---

# 🧑‍💻 Tech Stack

* Frontend: React (Vite)
* Backend: FastAPI
* Database: SQLite
* Deployment: Vercel + Railway
* AI/ML: Custom trained model (TF-IDF / ML pipeline)

---

# 👥 Team Members

* 👨‍💻 Harsh Vardhan
* 👩‍💻 Anshika Sharma
* 👨‍💻 Rajnarayan Yadav
* 👨‍💻 Saurabh Tiwari

---

# 🎯 Project Objective

To build an intelligent system that:

* Understands user ingredients
* Predicts relevant dishes
* Provides complete cooking guidance
* Enhances user experience with AI-based suggestions

---

# 🔮 Future Enhancements

* 🔐 User authentication system
* 🌎 Multi-language support
* 📱 Mobile responsive UI
* 🤖 Advanced NLP model (BERT / Transformers)
* 📊 Analytics dashboard

---

# 📜 License

This project is developed for academic purposes under MCA curriculum at HBTU.

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub and share your feedback!
