from fastapi import FastAPI, Form
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app=FastAPI()
def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        passwd=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"message": "Vocabulary Trainer API"}

@app.get("/vocabulary")
def get_vocab():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM vocabulary ORDER BY word ASC")
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    return records

@app.post("/vocabulary/add")
def add_word(
    word: str = Form(...),
    translation: str = Form(...),
    example: str = Form(""),
    category: str = Form(""),
    language: str = Form(""),
):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO vocabulary (word, translation, example, category, language) VALUES (%s, %s, %s, %s, %s)",
        (word, translation, example, category, language)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Word added successfully"}

@app.post("/vocabulary/update")
def update_word(
    id: int = Form(...),
    word: str = Form(...),
    translation: str = Form(...),
    example: str = Form(...),
    category: str = Form(...),
    language: str = Form(...),
):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE vocabulary
        SET word = %s, translation = %s, example = %s, category = %s, language = %s
        WHERE id = %s
        """,
        (word, translation, example, category, language, id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Word updated successfully"}
          
@app.post("/vocabulary/delete")
def delete_word(id: int = Form(...)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM vocabulary WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Word deleted successfully"}

@app.get("/languages")
def get_languages():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM languages")
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    return records

@app.get("/vocabulary/quizwords")
def get_quiz_words():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM quiz_questions")
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    return records

@app.post("/vocabulary/mark_known")
def mark_known(id: int = Form(...), correct: bool = Form(...)):
    conn = get_connection()
    cursor = conn.cursor()
    if correct:
        cursor.execute("UPDATE vocabulary SET proficiency = proficiency + 1 WHERE id = %s", (id,))
    else:
        cursor.execute("UPDATE vocabulary SET proficiency = GREATEST(proficiency - 1, 0) WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Proficiency updated"}