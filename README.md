# 🛠️ Todo App - Backend

This is the **Express.js** backend for the **Todo List App**, using **Prisma** and **PostgreSQL** for data storage.

## 📥 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd todo-backend

npm install
```

### 3. Environment Variables

Create a .env file in the root directory and add the following:

```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"
PORT=5005
```

Copy above code in to .env file and replace:
<username> with your PostgreSQL username.
<password> with your PostgreSQL password.
<database_name> with your desired database name.

### 4. Prisma Setup

#### 4.1 Initialize Prisma

If Prisma is not already initialized, run:

```bash
npx prisma init
```

#### 4.2 Update schema.prisma

Modify prisma/schema.prisma:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Task {
  id        Int      @id @default(autoincrement())
  title     String
  color     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### 4.3 Run Database Migrations

```bash
npx prisma migrate dev --name init
```

#### 4.4 Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Server

```bash
npm run dev
```

The server will run on http://localhost:5005.
