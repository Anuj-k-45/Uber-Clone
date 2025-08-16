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

# Captain Registration API Documentation

## Endpoint

`POST /captain/register`

## Description

Registers a new captain in the system. Requires a valid email, password (minimum 6 characters), full name (first name minimum 3 characters), and vehicle details.

## Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- `fullname.firstname` (string, required): Captain's first name (min 3 characters)
- `fullname.lastname` (string, optional): Captain's last name
- `email` (string, required): Valid email address
- `password` (string, required): Password (min 6 characters)
- `vehicle.color` (string, required): Vehicle color (min 3 characters)
- `vehicle.plate` (string, required): Vehicle plate (min 3 characters)
- `vehicle.capacity` (integer, required): Vehicle capacity (min 1)
- `vehicle.vehicleType` (string, required): Vehicle type (`car`, `motorcycle`, or `auto`)

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**

  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname"
      }
      // ...other errors
    ]
  }
  ```

### Duplicate Error

- **Status Code:** `400 Bad Request`
- **Body:**

  ```json
  {
    "message": "Captain already exists"
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:4000/captain/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Smith"},"email":"jane.smith@example.com","password":"yourpassword","vehicle":{"color":"Red","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64e8b7c2f8a2c1e8b7c2f8a2",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# Captain Login API Documentation

## Endpoint

`POST /captain/login`

## Description

Authenticates a captain and returns a JWT token if credentials are valid.

## Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Valid email address
- `password` (string, required): Password (min 6 characters)

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**

  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
        "msg": "Invalid Email",
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
curl -X POST http://localhost:4000/captain/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.smith@example.com","password":"yourpassword"}'
```

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64e8b7c2f8a2c1e8b7c2f8a2",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# Captain Profile API Documentation

## Endpoint

`GET /captain/profile`

## Description

Returns the authenticated captain's profile information. Requires a valid JWT token in the request (sent via cookie or Authorization header).

## Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookie)

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**

  ```json
  {
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
curl -X GET http://localhost:4000/captain/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Example Success Response

```json
{
  "captain": {
    "_id": "64e8b7c2f8a2c1e8b7c2f8a2",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# Captain Logout API Documentation

## Endpoint

`GET /captain/logout`

## Description

Logs out the captain by clearing the authentication token cookie and blacklisting the token. Requires the token to be sent via cookie or Authorization header.

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
curl -X GET http://localhost:4000/captain/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Example Success Response

```json
{
  "message": "Logged out successfully"
}
```
