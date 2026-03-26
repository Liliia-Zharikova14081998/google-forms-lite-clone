# Google Forms Lite Clone

A simplified Google Forms clone built as a technical task for the Trainee Front-End Developer position.
The project allows users to create custom forms, fill them out, and view submitted responses.

## 🚀 Technologies

- **Frontend:** React, TypeScript, Redux Toolkit, RTK Query (with Code Generation), React Router.
- **Backend:** Node.js, Apollo Server (GraphQL), In-memory storage.
- **Project Structure:** Monorepo with npm workspaces.

## 📁 Project Structure

This project is organized as a monorepo to manage both client and server efficiently:

- `packages/client/` - React application (Frontend)
- `packages/server/` - Node.js GraphQL API (Backend)

## 🛠️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd <your-repository-name>

   ```

2. **Install dependencies:**

   From the root directory, run:

   ```bash
   npm install
   ```

This command installs all dependencies for both the client and server workspaces automatically.

## 🏃 Running the Project

The project is configured to run both the frontend and backend concurrently from the root directory.

1. **Start both Client & Server:**

```bash
 npm run dev
```

- **Frontend:** http://localhost:5173/
- **GraphQL Playground:** http://localhost:4000/

## 💡 Key Features

- **Form Builder:** Create forms with TEXT, DATE, MULTIPLE_CHOICE, and CHECKBOX questions.
- **Form Filler:** Dynamic interface for submitting responses with real-time validation.
- **Responses View:** Detailed view of submitted data mapped back to the original questions.
- **Type Safety:** Full integration with graphql-codegen for auto-generated types and hooks.

## 📫 Author

Liliia Zharikova

[Git Hub](https://github.com/Liliia-Zharikova14081998)
