from fastapi import Depends, status, HTTPException, APIRouter, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from pydantic import BaseModel
from jose import JWTError, jwt
import logging

# Setup JWT configurations
SECRET_KEY = "secret_key"  # Use a secure and randomly generated secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2 Password flow for login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# User model for sign-up and login


class User(BaseModel):
    username: str
    email: str
    password: str

# Database call to retrieve user data


def get_user_from_db(username: str):
    # TODO: Fetch user from database by username
    # This function should return user details such as username and hashed password from the database
    pass


def save_user_to_db(user: User):
    # TODO: Save the new user (username, email, hashed password) to the database
    pass

# JWT utility functions


# JWT utility functions
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15)
                                  )  # Short-lived token
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# This utility can be used for refresh tokens


def create_refresh_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=7)  # Refresh tokens last longer
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


# Router for authentication endpoints
router = APIRouter()


@router.post("/api/v1/auth/login", response_model=dict)
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        # Retrieve user from the database
        user = get_user_from_db(form_data.username)

        # If user is not found, raise an error
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Verify the password
        if not verify_password(form_data.password, user['password']):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create JWT token if authentication is successful
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user["username"]}, expires_delta=access_token_expires
        )

        # Add successful login status code for frontend tracking (optional)
        response.status_code = status.HTTP_200_OK

        # Return the token with additional data
        return {
            "access_token": access_token,
            "token_type": "bearer",
            # Expiration in seconds for frontend handling
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "username": user["username"]  # just fro testing
        }

    except HTTPException as e:
        # Log authentication errors (optional for tracking)
        logging.error(f"Authentication failed for user {
                      form_data.username}: {e.detail}")
        raise e

    except Exception as general_error:
        # Log unexpected errors for server-side debugging
        logging.error(f"Unexpected error during login: {general_error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later."
        )


# signUp
@router.post("/api/v1/auth/signUp", response_model=dict)
async def sign_up(user: User):
    try:
        # Check if the user already exists in the database (by username or email)
        existing_user = get_user_from_db(user.username)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )

        # Optional: Check if email is already registered
        existing_user_by_email = get_user_by_email(user.email)
        if existing_user_by_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Hash the password before storing it
        hashed_password = hash_password(user.password)

        # Replace the plain password with the hashed one
        user_with_hashed_password = User(
            username=user.username,
            email=user.email,
            password=hashed_password
        )

        # Try to save the user with the hashed password to the database
        try:
            save_user_to_db(user_with_hashed_password)
        except Exception as db_error:
            logging.error(f"Error saving user to database: {db_error}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while saving the user to the database"
            )

        return {"message": "User successfully signed up"}

    except HTTPException as e:
        # Re-raise handled HTTP exceptions
        raise e
    except Exception as general_error:
        # Log and raise a general exception if something unexpected occurs
        logging.error(f"Unexpected error during sign up: {general_error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )


@router.get("/api/v1/protected-route")
async def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401, detail="Could not validate credentials")
    except JWTError:
        raise HTTPException(
            status_code=401, detail="Could not validate credentials")

    # Optionally retrieve user from DB based on token's subject
    # TODO: Fetch and validate user based on the token's username (payload["sub"])

    return {"message": "Protected resource access granted"}
