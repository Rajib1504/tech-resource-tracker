# DevVault 🚀 (Tech Resource Tracker)

**Live Demo**: [https://tech-resource-tracker.vercel.app/](https://tech-resource-tracker.vercel.app/)

## Project Overview

DevVault is a modern, developer-centric platform built to organize, store, and discover your code snippets, API documentation links, architecture diagrams, and tech articles. This project was built to demonstrate the core concepts of Next.js 15 (App Router) taught in the ChaiCode Web Dev Cohort 2026.

## Tech Stack Used

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Animations:** Framer Motion
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** Custom JWT-based Auth
- **Web Scraping:** Cheerio (for rich link previews)

## Features Implemented

- **Secure Authentication:** JWT-based custom authentication system with hashed passwords.
- **Rich Link Previews:** Automatically scrapes `og:image` and metadata from any URL you save using Cheerio.
- **Code Snippets:** Store and organize raw code snippets alongside your URLs.
- **Smart Categorization:** Organize your vault with custom, globally shared categories.
- **Public Feed:** Share your knowledge with the community via the live public resource feed.
- **Premium UI/UX:** Built with a stunning Neo-brutalist aesthetic using Tailwind CSS and Framer Motion.

## How to Run Locally

### Prerequisites
Make sure you have Node.js (v18+) and Bun installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Rajib1504/tech-resource-tracker.git
cd tech-resource-tracker
```

### 2. Install dependencies
```bash
bun install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of your project using the provided `.env.example` file:
```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### 4. Initialize the Database
Push the Prisma schema to your PostgreSQL database and generate the TypeScript client:
```bash
bunx prisma db push
bunx prisma generate
```

### 5. Start the Development Server
```bash
bun dev
```
Navigate to `http://localhost:3000` to see your app running!

## Project Architecture & Next.js Concepts Covered

This application was designed specifically to cover the major concepts from the Next.js syllabus.

### Routes/Pages Included (File-based Routing)
- `/` - Static Landing Page (SSG)
- `/login` - Authentication Page
- `/signup` - Registration Page
- `/dashboard/vault` - Private user dashboard for managing resources
- `/dashboard/add` - Page to add a new link or snippet
- `/dashboard/edit/[id]` - Dynamic route to edit an existing resource

### Layouts
- `app/layout.tsx` - Root layout containing the global Custom Cursor, Noise Overlay, and Theme Provider.
- `app/dashboard/layout.tsx` - Nested layout containing the Sidebar and Topbar exclusively for authenticated users.

### API Routes Included (RESTful)
All API routes return structured JSON responses (`{ success, message, data }`) and include try/catch error handling.
- `GET /api/resources` - Fetches all resources (or user-specific resources if authenticated)
- `POST /api/resources` - Creates a new resource (link or snippet)
- `GET /api/resources/[id]` - Fetches a specific resource
- `PATCH /api/resources/[id]` - Updates an existing resource
- `DELETE /api/resources/[id]` - Deletes a resource
- `GET /api/categories` - Fetches all categories
- `POST /api/categories` - Creates a new category
- `POST /api/users/signup` - Registers a user
- `POST /api/users/login` - Authenticates a user and sets an HttpOnly JWT cookie
- `GET /api/users/logout` - Clears the JWT cookie

### Server Actions
- **`getRecentResources`**: Located in `src/app/actions/resource-actions.ts`, this Server Action directly queries the database using Prisma to fetch the latest resources for the public homepage. It demonstrates the ability to bypass building a dedicated API route for simple, server-side data fetching. 

### Rendering Strategies Used
- **Server-Side Rendering (SSR)**: Used heavily on the Dashboard and API routes. The application dynamically checks the HttpOnly JWT cookie on request time to render the user's private vault securely.
- **Static Site Generation (SSG)**: Pages like the Landing Page (`/`) and Auth pages (`/login`, `/signup`) are statically generated at build time for maximum performance since they don't require user-specific data to render the shell.
- **Incremental Static Regeneration (ISR)**: ISR is utilized via the `revalidatePath("/")` function. Whenever a user adds, edits, or deletes a resource via the API routes, the path `/` is revalidated. This ensures the statically generated homepage's "Recent Resources" feed updates in the background with the latest data without needing a full rebuild.

## Assumptions or Limitations
- **Categories**: Categories are currently globally shared across all users to encourage standard tagging (e.g., "React", "Next.js").
- **Scraping**: The Cheerio web scraper works for most modern sites, but sites with heavy anti-bot protections or client-side-only rendering (SPAs without SSR) might fallback to a default Google favicon for the thumbnail.
- **Desktop Cursor**: The custom sonar ring cursor is optimized and visible only on desktop (`hidden md:block`) to prevent touch-target issues on mobile devices.
