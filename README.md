# Blog Buddy

A modern, responsive blog application built with React, TypeScript, and Vite. This project demonstrates efficient data fetching using TanStack Query and a beautiful UI component library based on shadcn/ui.

## Features

- 📝 **View All Blogs**: Browse a list of the latest blog posts with loading skeletons.
- 📖 **Read Blog Details**: Click on any blog to read the full content.
- ✨ **Create New Blogs**: A modal form to publish new posts with titles, descriptions, content, and categories.
- 🗑️ **Delete Blogs**: Remove unwanted blog posts.
- 🌓 **Dark Mode**: Built-in theme toggle for light and dark viewing modes.
- ⚡ **Real-time Updates**: Automatic data refetching and cache invalidation using TanStack Query.
- 📱 **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.

## Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **State Management & Data Fetching**: TanStack Query (React Query) v5
- **Icons**: Lucide React
- **Backend (Mock)**: JSON Server

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-buddy-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

This project requires two processes running simultaneously: the mock backend server and the frontend development server.

1. **Start the Backend Server**
   Open a terminal and run:
   ```bash
   npm run server
   ```
   This starts `json-server` on `http://localhost:3001` watching `db.json`.

2. **Start the Frontend**
   Open a **new** terminal window and run:
   ```bash
   npm run dev
   ```
   This starts the Vite development server (usually at `http://localhost:5173`).

3. **Open in Browser**
   Navigate to the URL shown in your terminal (e.g., `http://localhost:5173`) to view the app.

## Project Structure

```
src/
├── components/         # UI components
│   ├── blog/          # Blog-specific components (List, Card, Detail, Form)
│   └── ui/            # Reusable shadcn/ui components (Button, Input, etc.)
├── hooks/             # Custom React hooks (useBlogs, useToast)
├── lib/               # Utilities and API configuration
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## API Endpoints

The application communicates with a local JSON server.

| Method | Endpoint      | Description             |
|--------|---------------|-------------------------|
| GET    | `/blogs`      | Fetch all blog posts    |
| GET    | `/blogs/:id`  | Fetch a single blog post|
| POST   | `/blogs`      | Create a new blog post  |
| DELETE | `/blogs/:id`  | Delete a blog post      |