# import mysql.connector

# def get_connection():
#     return mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="",
#         database="recipe_db"
#     )

#     # return mysql.connector.connect(
#     #     host="mysql.railway.internal",
#     #     user="root",
#     #     password="DDOMnbwZonCmLpJorHixsGmjhlaishYp",
#     #     database="recipe_db"
#     # )


# def save_history(ingredients, predicted_dish, confidence):
#     conn = get_connection()
#     cursor = conn.cursor()

#     query = """
#     INSERT INTO history (ingredients, predicted_dish, confidence)
#     VALUES (%s, %s, %s)
#     """

#     cursor.execute(query, (ingredients, predicted_dish, confidence))

#     conn.commit()
#     cursor.close()
#     conn.close()


# def get_history():
#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)

#     query = "SELECT * FROM history ORDER BY created_at DESC"

#     cursor.execute(query)
#     results = cursor.fetchall()

#     cursor.close()
#     conn.close()

#     return results    

import sqlite3

def get_connection():
    return sqlite3.connect("recipes.db", check_same_thread=False)


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredients TEXT,
        predicted_dish TEXT,
        confidence REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()


def save_history(ingredients, predicted_dish, confidence):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO history (ingredients, predicted_dish, confidence)
    VALUES (?, ?, ?)
    """, (ingredients, predicted_dish, confidence))

    conn.commit()
    conn.close()


def get_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM history ORDER BY created_at DESC")
    rows = cursor.fetchall()

    data = []
    for row in rows:
        data.append({
            "ingredients": row[1],
            "predicted_dish": row[2],
            "confidence": row[3],
            "created_at": row[4]
        })

    conn.close()
    return data