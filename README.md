# TaskFlow

TaskFlow is a responsive task management application built with React. It provides a simple workspace for creating, organizing, and tracking tasks, along with a dashboard that gives a quick overview of progress.

I built this project to put some of React's core concepts into practice, including component-based development, routing, API integration, shared state management, and form validation.

## Features

- **Dashboard:** View total, completed, and pending tasks, with charts showing overall progress.
- **Task management:** Create, edit, delete, and mark tasks as completed.
- **Search and filters:** Find tasks by keyword and filter them by status or priority.
- **Form validation:** Validate task details before submission, with clear error messages.
- **Responsive layout:** Works across desktop, tablet, and mobile screens, with a collapsible sidebar on smaller devices.
- **Local storage:** Keeps task changes available after refreshing the browser.

## Tech Stack

- React with Vite
- React Router for navigation
- Context API and `useReducer` for shared state management
- DummyJSON for fetching sample task data
- React Hook Form and Zod for form validation
- Recharts for dashboard visualizations
- Lucide React for icons
- CSS for styling and responsive layouts

## Getting Started

Clone the repository:

```bash
git clone https://github.com/sankar-tp/react-frontend-app.git
```

Navigate into the project:

```bash
cd react-frontend-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── EditTaskModal.jsx
│   └── StatCard.jsx
├── context/
│   └── TaskContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Tasks.jsx
│   ├── CreateTask.jsx
│   └── Settings.jsx
├── services/
│   └── taskApi.js
├── styles/
│   └── layout.css
├── App.jsx
└── main.jsx
```

## How It Works

**Routing**

React Router handles navigation between the Dashboard, Tasks, Create Task, and Settings pages. The sidebar and header are shared across the application.

**API Integration**

TaskFlow uses the free DummyJSON API to fetch an initial list of tasks.

API endpoint: https://dummyjson.com/todos?limit=20

The fetched data is stored in the application's shared state and displayed on the Dashboard and Tasks pages.

**State Management**

I used Context API with `useReducer` to manage task data in one place. This allows different components to access and update the same tasks without passing props through multiple levels.

For example, completing a task on the Tasks page automatically updates the Dashboard statistics.

**Form Validation**

The Create Task form uses React Hook Form with Zod to validate the title, description, priority, and due date before adding a task.

**Data Persistence**

Since DummyJSON is a mock API, task creation, editing, and deletion are handled locally rather than saved to its server. The application uses browser localStorage to preserve those changes between page refreshes.

## Deployment

The project can be deployed using Vercel's free hosting.

**Live Demo:** Add deployment URL here

## Notes

This project focuses on frontend functionality and does not include a custom backend or user authentication.

The main goal was to build a functional React application while keeping the code organized, reusable, and easy to maintain.
