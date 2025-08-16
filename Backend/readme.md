# User Registration API Documentation

## Endpoint

`POST /user/register`

## Description

Registers a new user in the system. Requires a valid email, a password (minimum 8 characters), and a full name (first name minimum 2 characters).

## Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required): User's first name (min 2 characters)
- `fullname.lastname` (string, optional): User's last name
- `email` (string, required): Valid email address
- `password` (string, required): Password (min 8 characters)

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**

  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**

  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email"
      }
    ]
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:4000/user/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john.doe@example.com","password":"yourpassword"}'
```

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64e8b7c2f8a2c1e8b7c2f8a2",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Login API Documentation

## Endpoint

`POST /user/login`

## Description

Authenticates a user and returns a JWT token if credentials are valid.

## Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Valid email address
- `password` (string, required): Password (min 8 characters)

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**

  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**

  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email"
      }
    ]
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:4000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"yourpassword"}'
```

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64e8b7c2f8a2c1e8b7c2f8a2",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Profile API Documentation

## Endpoint

`GET /user/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token in the request (sent via cookie or Authorization header).

## Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookie)

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**

  ```json
  {
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**

  ```json
  {
    "message": "Authentication required"
  }
  ```

## Example Request

```sh
curl -X GET http://localhost:4000/user/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Example Success Response

```json
{
  "user": {
    "_id": "64e8b7c2f8a2c1e8b7c2f8a2",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Logout API Documentation

## Endpoint

`GET /user/logout`

## Description

Logs out the user by clearing the authentication token cookie and blacklisting the token. Requires the token to be sent via cookie or Authorization header.

## Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookie)

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Error

- **Status Code:** `400 Bad Request`
- **Body:**

  ```json
  {
    "message": "Token not provided"
  }
  ```

## Example Request

```sh
curl -X GET http://localhost:4000/user/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Example Success Response

```json
{
  "message": "Logged out successfully"
}
```
