# User Registration API Documentation

## Endpoint

`POST /user/register`

## Description

Registers a new user in the system. Requires a valid email, a password (minimum 8 characters), and a full name (first name minimum 2 characters).

## Request Body

Send a JSON object with the following structure:

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
      // other user fields
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
        "param": "email",
        "location": "body"
      }
      // ...other errors
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
    // other user fields
  }
}
```

# User Login API Documentation

## Endpoint

`POST /user/login`

## Description

Authenticates a user and returns a JWT token if credentials are valid.

## Request Body

Send a JSON object with the following structure:

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
      // other user fields
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
        "param": "email",
        "location": "body"
      }
      // ...other errors
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
    // other user fields
  }
}
```
