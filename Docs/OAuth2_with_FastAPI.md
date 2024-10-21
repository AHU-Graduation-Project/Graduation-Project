# OAuth2 with JWT in FastAPI

## Introduction
OAuth2 is a framework for managing access control and authentication in applications. This document explains how OAuth2 with JWT (JSON Web Token) works in the FastAPI framework, based on the provided implementation. It also outlines how the frontend should handle the authentication process.

## Authentication Flow Overview
In this system, the backend (FastAPI) implements authentication via OAuth2 Password Flow. The backend verifies users, generates access tokens, and handles secured routes with JWTs. Below is a breakdown of how OAuth2 and JWT work together in this setup.

### 1. Login Process (/api/v1/auth/login)
The frontend sends the user's credentials (username, password) to the `/login` endpoint using `OAuth2PasswordRequestForm`.

**On the backend:**
- The user’s credentials are verified by fetching the user from the database (`get_user_from_db`).
- If the credentials match, an access token (JWT) is generated using the `create_access_token` function. This token contains information like the user's username and an expiration time (set for 30 minutes in this example).
- The generated token is returned in the response, along with its expiration time and the token type.

**on the Front**
```js
const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'username': username,
          'password': password,
        }),
      });
```
**Response Example:**
```json
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer",
  "expires_in": 1800,  // Token expires in 30 minutes
  "username": "user123"
}
```

### 2. Sign-Up Process (/api/v1/auth/signUp)
For new users, the frontend sends a POST request with the user’s details (username, email, password) to the /signUp endpoint.

On the backend:

It checks if the user already exists (by username or email).
If the user doesn’t exist, the password is hashed, and the user is saved into the database (save_user_to_db).
A success message is returned once the user is saved.
Response Example:

```json
{
  "message": "User successfully signed up"
}
```

### 3. Protected Routes (/api/v1/protected-route)
To access protected routes, the frontend includes the Bearer token (access token) in the request headers:

```http
Authorization: Bearer <JWT_TOKEN>
```

On the backend:

The token is decoded and validated. If the token is valid and not expired, the backend retrieves the user associated with the token.
If valid, access to the protected resource is granted.
If the token is invalid or expired, the backend returns an HTTP 401 Unauthorized error.

### JWT (JSON Web Token) Breakdown
A JWT is an encoded JSON object with three parts: header, payload, and signature.

- Header: Contains the algorithm and token type (e.g., HS256).
- Payload: Contains claims like the user’s information (sub: username) and the expiration time (exp).
- Signature: Verifies the token wasn't altered.

When a user logs in successfully, a JWT is created using the `create_access_token` function, which includes the user's information (sub: username) and the token’s expiration time.

### Frontend Considerations for Handling OAuth2 with JWT

1. **Login and Token Storage**  
   After a successful login, the frontend should store the JWT token in a secure storage location, such as `localStorage` or `sessionStorage`.

   Example (using localStorage):
   ```js
   localStorage.setItem("token", response.access_token);
   ```
   Additionally, the frontend can store the token expiration time (`expires_in`) to monitor when to refresh or renew the token.

2. **Authorization Header for Protected Routes**  
   For every request to a protected route, the frontend should include the Bearer token in the Authorization header:

   ```js
   fetch("/api/v1/protected-route", {
       headers: {
           "Authorization": `Bearer ${token}`
       }
   });
   ```

3. **Token Expiration Handling**  
   Before making any request, the frontend should check if the token is still valid. If the token is about to expire or has expired, the frontend should trigger a token refresh or force the user to log in again.

   Example of checking expiration time:
   ```js
   const tokenExpiration = localStorage.getItem("token_expiration");
   const currentTime = Math.floor(Date.now() / 1000); // in seconds

   if (currentTime > tokenExpiration) {
     // Token has expired, prompt for login or token refresh
   }
   ```

4. **Token Refreshing**  
   Although the provided code doesn’t include a refresh token endpoint, in a production-ready setup, you would implement token refreshing. The backend could provide a refresh token during login, which allows users to request new access tokens without needing to log in again.

5. **Logout**  
   To log out, the frontend should clear the JWT from storage:
   ```js
   localStorage.removeItem("token");
   ```

### Error Handling

If the backend returns a 401 Unauthorized error, the frontend should:

- Prompt the user to log in again.
- Optionally, automatically redirect the user to the login page.

Example:
```js
if (response.status === 401) {
  alert("Session expired. Please log in again.");
  window.location.href = "/login";
}
```

### Security Considerations

- Always use HTTPS to protect sensitive data like tokens during transit.
- Store the JWT token in a secure storage mechanism and avoid exposing it to JavaScript (e.g., avoid cookies with the HttpOnly flag).
- Implement refresh tokens to minimize the risk of token expiration disrupting user sessions.
