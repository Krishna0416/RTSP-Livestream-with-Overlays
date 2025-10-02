# API Documentation for RTSP Overlay App

This document provides detailed information about the RESTful API endpoints available for managing overlays in the RTSP Livestream application.

## Base URL

All API endpoints are relative to the base URL: `http://localhost:5000/api`

## Authentication

Currently, the API doesn't require authentication. For a production environment, proper authentication should be implemented.

## Endpoints

### Get All Overlays

Retrieves all saved overlays.

- **URL**: `/overlays`
- **Method**: `GET`
- **URL Parameters**: None
- **Response Format**: JSON

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
[
  {
    "_id": "sample-id-1",
    "name": "Sample Logo",
    "type": "image",
    "content": "https://example.com/logo.png",
    "position": {
      "x": 10,
      "y": 10
    },
    "size": {
      "width": 100,
      "height": 50
    }
  },
  {
    "_id": "7444c076-47b2-4dd9-a432-47eb515eba2d",
    "name": "Welcome Text",
    "type": "text",
    "content": "Welcome to the livestream!",
    "position": {
      "x": 50,
      "y": 80
    },
    "size": {
      "width": 400,
      "height": 50
    },
    "color": "#ffffff",
    "fontSize": "24px"
  }
]
```

### Get a Specific Overlay

Retrieves details about a specific overlay.

- **URL**: `/overlays/:id`
- **Method**: `GET`
- **URL Parameters**: 
  - `id` - The UUID of the overlay
- **Response Format**: JSON

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "_id": "7444c076-47b2-4dd9-a432-47eb515eba2d",
  "name": "Company Logo",
  "type": "image",
  "content": "https://example.com/logo.png",
  "position": {
    "x": 10,
    "y": 10
  },
  "size": {
    "width": 100,
    "height": 50
  }
}
```

**Error Response**:
- **Code**: 404 Not Found
- **Content**:
```json
{
  "error": "Overlay not found"
}
```

### Create a New Overlay

Creates a new overlay with the specified properties.

- **URL**: `/overlays`
- **Method**: `POST`
- **Headers**:
  - Content-Type: application/json
- **Data Constraints**:
```json
{
  "name": "[name for the overlay]",
  "type": "[text or image]",
  "content": "[text content or image URL]",
  "position": {
    "x": "[x position in percentage]",
    "y": "[y position in percentage]"
  },
  "size": {
    "width": "[width in pixels]",
    "height": "[height in pixels]"
  },
  "color": "[optional, for text overlays, hex color code]",
  "fontSize": "[optional, for text overlays, font size with unit]"
}
```

**Data Example**:
```json
{
  "name": "New Logo",
  "type": "image",
  "content": "https://example.com/new-logo.png",
  "position": {
    "x": 20,
    "y": 15
  },
  "size": {
    "width": 120,
    "height": 60
  }
}
```

**Success Response**:
- **Code**: 201 Created
- **Content**: Returns the newly created overlay object including its UUID

**Error Response**:
- **Code**: 400 Bad Request
- **Content**:
```json
{
  "error": "Missing required fields"
}
```

### Update an Existing Overlay

Updates an existing overlay with new values.

- **URL**: `/overlays/:id`
- **Method**: `PUT`
- **URL Parameters**: 
  - `id` - The UUID of the overlay to update
- **Headers**:
  - Content-Type: application/json
- **Data Constraints**: Same as the POST endpoint, but only the fields that need to be updated are required.

**Data Example**:
```json
{
  "position": {
    "x": 25,
    "y": 15
  },
  "size": {
    "width": 150,
    "height": 60
  }
}
```

**Success Response**:
- **Code**: 200 OK
- **Content**: Returns the updated overlay object

**Error Response**:
- **Code**: 404 Not Found
- **Content**:
```json
{
  "error": "Overlay not found"
}
```

### Delete an Overlay

Deletes a specific overlay.

- **URL**: `/overlays/:id`
- **Method**: `DELETE`
- **URL Parameters**: 
  - `id` - The UUID of the overlay to delete
- **Response Format**: JSON

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "message": "Overlay deleted successfully"
}
```

**Error Response**:
- **Code**: 404 Not Found
- **Content**:
```json
{
  "error": "Overlay not found"
}
```

## Data Models

### Overlay Schema

```
{
  _id: String (UUID),
  name: String,
  type: String (either 'text' or 'image'),
  content: String,
  position: {
    x: Number (percentage),
    y: Number (percentage)
  },
  size: {
    width: Number (pixels),
    height: Number (pixels)
  },
  color: String (optional, hex color code for text overlays),
  fontSize: String (optional, for text overlays)
}
```

## Implementation Note

The current implementation uses an in-memory data store instead of MongoDB. The API endpoints and functionality remain the same, but the data is not persisted between server restarts.

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Successful operation
- 201: Resource created
- 400: Bad request (invalid input)
- 404: Resource not found
- 500: Server error

Errors are returned as JSON objects with an "error" field containing a description of the problem.