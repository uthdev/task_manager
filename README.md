# Task Manager API

A Node.js/Express REST API for managing users, authentication, tasks, and reporting, with PostgreSQL and Sequelize ORM.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Zod for validation
- Swagger for API documentation

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/uthdev/task_manager.git
   cd task_manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values as needed.

4. **Set up the database:**
   - Ensure PostgreSQL is running and accessible.
   - Create the database(s) as specified in your `.env`.
   - Run migrations and seeders:
     ```bash
     npm run db:migrate
     npm run db:seed
     ```

5. **Start the application:**
   ```bash
   npm run dev
   # or
   npm start
   ```

6. **View API documentation:**
   - Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for Swagger UI.

## API Endpoints

### Auth
- `POST /api/v1/auth/register` — Register a new user
- `POST /api/v1/auth/login` — Login and receive JWT

### Tasks
- `POST /api/v1/tasks` — Create a new task
- `GET /api/v1/tasks` — Get all tasks for authenticated user (supports pagination & filtering)
- `PUT /api/v1/tasks/:id` — Update a task
- `DELETE /api/v1/tasks/:id` — Delete a task

### Admin
- `GET /api/v1/admin/tasks` — Admin: Get all tasks (with filtering)
- `GET /api/v1/admin/users` — Admin: Get all users (with filtering)

### Reports
- `GET /api/v1/report-time` — Get time spent per task (dummy values)
- `GET /api/v1/report` — Get task completion statistics

## Request/Response Examples

### Register
```json
POST /api/v1/auth/register
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/v1/auth/login
{
  "email": "alice@example.com",
  "password": "password123"
}
```

### Create Task
```json
POST /api/v1/tasks
{
  "title": "Finish docs",
  "description": "Write API documentation",
  "status": "pending"
}
```

## Database Configuration
- See `.env.example` for required environment variables.
- Sequelize config is in `src/config/config.js`.

---

For full API details, see the [Swagger UI](http://localhost:3000/api-docs).