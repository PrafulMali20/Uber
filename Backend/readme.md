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
