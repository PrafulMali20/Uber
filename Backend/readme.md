# Uber Backend

This folder contains the backend implementation for the Uber-like application. It includes controllers, models, services, and other necessary components to handle the server-side logic.

## API Documentation

### POST `/users/register`

This endpoint is used to register a new user.

#### Request Body

The request body must be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters): The first name of the user.
  - `lastname` (string, optional, minimum 3 characters): The last name of the user.
- `email` (string, required, minimum 5 characters): The email address of the user.
- `password` (string, required, minimum 6 characters): The password for the user.

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Field Details

| Field         | Type   | Required | Conditions                                   |
|---------------|--------|----------|---------------------------------------------|
| `fullname`    | Object | Yes      | Must contain `firstname` and optionally `lastname`. |
| `firstname`   | String | Yes      | Minimum 3 characters.                       |
| `lastname`    | String | No       | Minimum 3 characters.                       |
| `email`       | String | Yes      | Must be a valid email address, minimum 5 characters. |
| `password`    | String | Yes      | Minimum 6 characters.                       |

#### Responses

- **201 Created**: User successfully registered.
  - Example Response:
    ```json
    {
      "user": {
        "_id": "64f1c2e7e4b0a5c123456789",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **400 Bad Request**: Validation errors or missing fields.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "Enter a valid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

#### Example Response for Successful Registration

```json
{
  "user": {
    "_id": "64f1c2e7e4b0a5c123456789",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/users/login`

This endpoint is used to log in an existing user.

#### Request Body

The request body must be a JSON object with the following fields:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user.

#### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Field Details

| Field      | Type   | Required | Conditions                                   |
|------------|--------|----------|---------------------------------------------|
| `email`    | String | Yes      | Must be a valid email address.              |
| `password` | String | Yes      | Minimum 6 characters.                       |

#### Responses

- **200 OK**: User successfully logged in.
  - Example Response:
    ```json
    {
      "user": {
        "_id": "64f1c2e7e4b0a5c123456789",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **400 Bad Request**: Validation errors or missing fields.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "Enter a valid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
- **401 Unauthorized**: Invalid email or password.
  - Example Response:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### GET `/users/profile`

This endpoint is used to get the authenticated user's profile information.

#### Authentication

Requires a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Responses

- **200 OK**: Profile successfully retrieved.
  - Example Response:
    ```json
    {
      "_id": "64f1c2e7e4b0a5c123456789",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```
- **401 Unauthorized**: No token provided or invalid token.
  - Example Response:
    ```json
    {
      "message": "Access denied. No token provided"
    }
    ```

### GET `/users/logout`

This endpoint is used to log out the current user and invalidate their token.

#### Authentication

Requires a valid JWT token in the Authorization header or cookies:
```
Authorization: Bearer <token>
```
or
```
Cookie: token=<token>
```

#### Responses

- **200 OK**: Successfully logged out.
  - Example Response:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
- **401 Unauthorized**: No token provided or invalid token.
  - Example Response:
    ```json
    {
      "message": "Access denied. No token provided"
    }
    ```

### POST `/captains/register`

This endpoint is used to register a new captain (driver).

#### Request Body

The request body must be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters): The first name of the captain.
  - `lastname` (string, required, minimum 3 characters): The last name of the captain.
- `email` (string, required): The email address of the captain.
- `password` (string, required, minimum 6 characters): The password for the captain.
- `vehicle`: An object containing:
  - `color` (string, required, minimum 3 characters): The color of the vehicle.
  - `plate` (string, required, minimum 3 characters): The license plate number.
  - `capacity` (number, required): The passenger capacity of the vehicle.
  - `vehicleType` (string, required): Must be one of: 'car', 'auto', 'motercycle'.

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Driver"
  },
  "email": "john.driver@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Black",
    "plate": "MH12DE3456",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Details

| Field             | Type   | Required | Conditions                                   |
|-------------------|--------|----------|---------------------------------------------|
| `firstname`       | String | Yes      | Minimum 3 characters                        |
| `lastname`        | String | Yes      | Minimum 3 characters                        |
| `email`          | String | Yes      | Must be a valid email address               |
| `password`       | String | Yes      | Minimum 6 characters                        |
| `vehicle.color`  | String | Yes      | Minimum 3 characters                        |
| `vehicle.plate`  | String | Yes      | Minimum 3 characters                        |
| `vehicle.capacity`| Number | Yes      | Must be a valid number                      |
| `vehicle.vehicleType` | String | Yes  | Must be 'car', 'auto', or 'motercycle'     |

#### Responses

- **201 Created**: Captain successfully registered.
  - Example Response:
    ```json
    {
      "captain": {
        "_id": "64f1c2e7e4b0a5c123456789",
        "fullname": {
          "firstname": "John",
          "lastname": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
          "color": "Black",
          "plate": "MH12DE3456",
          "capacity": 4,
          "vehicleType": "car"
        }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **400 Bad Request**: Validation errors or missing fields.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "vehicle type must be one of car, auto, motercycle",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

## Captain Routes Documentation

### POST `/captains/register`

Register a new captain (driver) account.

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",     // required, min 3 characters
    "lastname": "Driver"     // required, min 3 characters
  },
  "email": "john.driver@example.com",    // required, valid email format
  "password": "secure123",               // required, min 6 characters
  "vehicle": {
    "color": "Black",        // required, min 3 characters
    "plate": "MH12DE3456",   // required, min 3 characters
    "capacity": 4,           // required, must be a number
    "vehicleType": "car"     // required, must be: 'car', 'auto', or 'motercycle'
  }
}
```

#### Success Response (201 Created)
```json
{
  "captain": {
    "_id": "64f1c2e7e4b0a5c123456789",
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH12DE3456",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // JWT token valid for 24h
}
```

### POST `/captains/login`

Login for existing captains.

#### Request Body
```json
{
  "email": "john.driver@example.com",    // required, valid email format
  "password": "secure123"                // required, min 6 characters
}
```

#### Success Response (200 OK)
```json
{
  "captain": {
    "_id": "64f1c2e7e4b0a5c123456789",
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH12DE3456",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // JWT token valid for 24h
}
```

### GET `/captains/profile`

Get the authenticated captain's profile.

#### Headers
```
Authorization: Bearer <token>    // JWT token required
```

#### Success Response (200 OK)
```json
{
  "captain": {
    "_id": "64f1c2e7e4b0a5c123456789",
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH12DE3456",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### GET `/captains/logout`

Logout the currently authenticated captain.

#### Headers
```
Authorization: Bearer <token>    // JWT token required
```
or
```
Cookie: token=<token>           // Cookie token required
```

#### Success Response (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses

- **400 Bad Request**: Validation errors
```json
{
  "errors": [
    {
      "msg": "Enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**: Invalid credentials or token
```json
{
  "message": "Access denied. No token provided"
}
```

## Setup Instructions

1. Clone the repository.
2. Navigate to the `Backend` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Contributing

Feel free to contribute by submitting issues or pull requests.
