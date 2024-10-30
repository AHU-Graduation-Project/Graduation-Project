from fastapi import FastAPI, HTTPException, Depends, Query
from typing import List, Optional
from app.models import Book, BookCreate, BookUpdate
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
import jwt  # Corrected import
import asyncio

app = FastAPI()

# In-memory list of books
books = []
book_id_counter = 1

# OAuth2 scheme for token-based authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Secret key to encode and decode JWT tokens
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Function to create a token (for demonstration purposes)
def create_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to validate the token
def validate_token(token: str) -> bool:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Book API"}

# Create a new book with authentication
@app.post("/books", response_model=Book)
async def create_book(
    book: BookCreate,
    token: str = Depends(oauth2_scheme)
):
    global book_id_counter, books
    if not validate_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")

    for existing_book in books:
        if existing_book.title == book.title and existing_book.author == book.author:
            raise HTTPException(status_code=400, detail="Book already exists")

    new_book = Book(id=book_id_counter, **book.dict())
    books.append(new_book)
    book_id_counter += 1
    return new_book

# Update an existing book
@app.put("/books/{id}", response_model=Book)
async def update_book(id: int, book: BookUpdate):
    global books
    for existing_book in books:
        if existing_book.id == id:
            update_data = book.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(existing_book, key, value)
            return existing_book
    raise HTTPException(status_code=404, detail="Book not found")

# Delete a book by ID
@app.delete("/books/{id}")
async def delete_book(id: int):
    global books
    books = [book for book in books if book.id != id]
    return {"message": "Book deleted"}

# Get all books with filtering and pagination
@app.get("/books", response_model=dict)
async def get_books(
    title: Optional[str] = None, 
    author: Optional[str] = None, 
    genre: Optional[str] = None, 
    year: Optional[int] = None, 
    page: int = 1, 
    limit: int = 10, 
    order_by: str = "id"
):
    global books
    filtered_books = books
    if title:
        filtered_books = [book for book in filtered_books if title.lower() in book.title.lower()]
    if author:
        filtered_books = [book for book in filtered_books if author.lower() in book.author.lower()]
    if genre:
        filtered_books = [book for book in filtered_books if book.genre == genre]
    if year:
        filtered_books = [book for book in filtered_books if book.year == year]

    total_books = len(filtered_books)
    start = (page - 1) * limit
    end = start + limit
    return {"total": total_books, "books": filtered_books[start:end]}

# Get a book by ID
@app.get("/books/{id}", response_model=Book)
async def get_book(id: int):
    global books
    for book in books:
        if book.id == id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

# Simulate non-blocking external call
@app.get("/books/external")
async def fetch_books_external():
    await asyncio.sleep(2)
    return {"message": "Fetched external books"}
