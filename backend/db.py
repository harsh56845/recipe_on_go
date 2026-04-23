import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="recipe_db"
    )


def save_history(ingredients, predicted_dish, confidence):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO history (ingredients, predicted_dish, confidence)
    VALUES (%s, %s, %s)
    """

    cursor.execute(query, (ingredients, predicted_dish, confidence))

    conn.commit()
    cursor.close()
    conn.close()


def get_history():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM history ORDER BY created_at DESC"

    cursor.execute(query)
    results = cursor.fetchall()

    cursor.close()
    conn.close()

    return results    