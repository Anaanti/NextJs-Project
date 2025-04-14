# Next.js Blog App

This is a simple blog application built using **Next.js 15**, implementing key features such as routing, server actions, authentication, and dynamic rendering.

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- React
- TypeScript (optional, depending on your setup)
- Tailwind CSS
- NextAuth (for authentication)
- Markdown / MDX (for blog posts)
- Prisma + PostgreSQL (if a database is used)

## Features

- User authentication with NextAuth
- Create, edit, and delete blog posts
- Server Actions & Dynamic Routing
- SEO-optimized pages
- Tailwind CSS styling
- Static Site Generation (SSG) and Server-Side Rendering (SSR)

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Anaanti/NextJs-Project.git
   cd NextJs-Project
   npm install
   ```

2. Create a `.env.local` file in the project root and add the required environment variables (e.g., for database and authentication):
   ```plaintext
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_auth_secret
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Status

**In Progress**