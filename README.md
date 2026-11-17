# To-Do List App Backend

A REST API for managing todos, built with Node.js, Express, MongoDB, Mongoose, and Yup validation.

## Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/todo-app
```

Start the server:

```bash
npm run dev
```

The API will run at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/todos` | Get all todos |
| `GET` | `/todos/:id` | Get a todo |
| `POST` | `/todos` | Create a todo |
| `PATCH` | `/todos/:id` | Update a todo |
| `DELETE` | `/todos/:id` | Delete a todo |

## Todo Example

```json
{
  "name": "Learn Express",
  "description": "Build a REST API",
  "status": "Pending"
}
```

### Valid Status Values

- `Pending`
- `In-process`
- `Completed`

## Update a Todo

```http
PATCH /todos/:id
Content-Type: application/json
```

```json
{
  "name": "Learn Express",
  "description": "Build and test a REST API",
  "status": "In-process"
}
```

At least one field is required.

## Delete a Todo

```http
DELETE /todos/:id
```

The deleted todo is returned in the response.

## Validation

- `name`: Required for creation, 3–200 characters
- `description`: Required for creation, maximum 500 characters
- `status`: One of the valid status values
- Updates require at least one field
