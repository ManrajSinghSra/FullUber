# Users Registration Endpoint Documentation

## Endpoint

**POST** `/register`

## Description

This endpoint registers a new user. It validates the following fields:
- **email**: Must be a valid email address.
- **fullName**: An object that contains user name details.
  - **firstName**: Required. Must be at least 3 characters.
  - **lastName**: Optional.
- **password**: Must be at least 6 characters.

If the email already exists, an error will be returned.

## Request Body

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

## Success Response

- **Status Code:** 200 OK

The response includes the user document with a generated token.

```json
{
  "_id": "68975d9aa7aa107d3ee3bbc5",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "user@example.com",
  "password": "hashedPassword",
  "token": "generatedToken",
  // Other fields if available
}
```

## Error Responses

- **Status Code:** 400 Bad Request

Errors may include validation messages (e.g., Invalid Email, First name too short, or Password is too short).

Example error response:
```json
{
  "message": "Validation error details or User already Exists"
}
```

## Notes

- All fields are required except `lastName` inside `fullName`.
- Ensure the email