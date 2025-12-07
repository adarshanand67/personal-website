# Database Setup

**Current Status:** The site is currently using JSON files. Follow these steps to migrate to PostgreSQL.

This project now uses PostgreSQL instead of local JSON files.

## Prerequisites
- Docker Desktop must be running

## Setup Steps

### 1. Start the Database
```bash
docker-compose up -d db
```

This starts a PostgreSQL container on port 5432.

### 2. Run Migrations
```bash
npx prisma migrate dev --name init
```

This creates all the database tables based on the schema.

### 3. Seed the Database
```bash
npx prisma db seed
```

This imports all your existing data from the JSON files into the database.

### 4. Generate Prisma Client
```bash
npx prisma generate
```

This generates the TypeScript types for database access.

### 5. Start the Development Server
```bash
pnpm dev
```

### 6. Switch to Database API
Once everything is working, update your imports:

1. Rename `lib/api.ts` to `lib/api-json.ts` (backup)
2. Rename `lib/api-db.ts` to `lib/api.ts`
3. Restart the dev server

Your site will now use PostgreSQL instead of JSON files!

## Useful Commands

### View Database in Prisma Studio
```bash
npx prisma studio
```

Opens a GUI to browse and edit your database at http://localhost:5555

### Reset Database (WARNING: Deletes all data)
```bash
npx prisma migrate reset
```

### Stop Database
```bash
docker-compose down
```

## Connection String
The database connection is configured in `.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/personal_website"
```

## Production Deployment
For production, update the `DATABASE_URL` environment variable to point to your production PostgreSQL instance (e.g., Railway, Supabase, Neon, etc.).
