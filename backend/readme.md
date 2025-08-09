# Users Endpoints Documentation

## /users/register

### Endpoint

**POST** `/register`

### Description

Registers a new user. The endpoint validates the following fields:
- **email**: Must be a valid email address.
- **fullName**: An object containing user name details.
  - **firstName**: Required. Must be at least 3 characters.
  - **lastName**: Optional.
- **password**: Must be at least 6 characters.

### Request Body

```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "securePassword"
}
```

### Success Response

- **Status Code:** 200 OK

The response returns the created user along with a generated token.

```json
{
  "_id": "userId",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "user@example.com",
  "password": "hashedPassword",
  // Other user data if available
}
```

### Error Response

- **Status Code:** 400 Bad Request

Errors may include validation issues or if the user already exists.

```json
{
  "message": "Validation error details or User already Exists"
}
```


## /users/login

### Endpoint

**POST** `/login`

### Description

Logs in an existing user. The endpoint validates:
- **email**: Must be a valid email address and should not exceed 30 characters.
- **password**: Must be at least 6 characters.

On successful login, the server sets a cookie named `token` with the generated JWT and returns user data.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

### Success Response

- **Status Code:** 200 OK

The response returns the authenticated user data.

```json
{
  "data": {
    "_id": "userId",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com",
    // Additional user fields if applicable
  }
}
```

**Note:** A cookie named `token` containing the JWT is also set in the response.

### Error Response

- **Status Code:** 401 Unauthorized

Possible errors include invalid credentials or if the email length is too long.

```json
{
  "message": "Invalid Credentials or Email is too long..."
}
```

## /users/profile

### Endpoint

**GET** `/profile`

### Description

This endpoint returns the profile of the currently authenticated user. It is a protected route, so a valid token must be present in the request cookies.

### Request Requirements

- A cookie named `token` containing a valid JWT must be sent.

### Success Response

- **Status Code:** 200 OK

```json
{
  "data": {
    "_id": "userId",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
    // Additional user fields if applicable
  }
}
```

### Error Response

- **Possible Error Messages:**
  - Missing token: `"Authorization denied fuck here is mistake"`
  - Blacklisted token or invalid user: `"Invalid not able to hack ...."` or `"User does not exists"`

```json
{
  "error": "Authorization denied fuck here is mistake"
}
```

---

## /users/logout

### Endpoint

**GET** `/logout`

### Description

This endpoint logs out the authenticated user. It works by blacklisting the JWT token and clearing the cookie from the client.

### Request Requirements

- A cookie named `token` containing a valid JWT must be sent.

### Success Response

- **Status Code:** 200 OK

```json
{
  "message": "OK"
}
```

### Error Response

- If an error occurs while processing the logout, the following error format is returned:

```json
{
  "error": "<error message>"
}
```

### Notes

- Both endpoints are protected. The authentication middleware will respond with an error if the token is missing, blacklisted, or invalid.
- The `/logout` endpoint will add the token to a blacklist, which then prevents reuse of the same token.