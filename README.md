
# TaskTango

TaskTango is a modern and intuitive To-Do List application designed to help you manage your tasks efficiently. Built with a robust and scalable tech stack, it offers a seamless user experience with features like Google Sign-In, real-time task updates, and a sleek dark/light theme toggle.

## ✨ Core Features

*   **Google Sign-In**: Securely authenticate using your Google account via Firebase Authentication.
*   **Add Tasks**: Easily add new tasks to your to-do list through a clear and accessible input field.
*   **Toggle Completion**: Mark tasks as complete or incomplete with a simple click.
*   **Delete Tasks**: Remove tasks you no longer need with a dedicated delete button.
*   **Firestore Persistence**: Your tasks are saved in real-time and persisted using Firebase Firestore, ensuring your data is always up-to-date across sessions.
*   **Dark/Light Theme Toggle**: Switch between a visually appealing dark mode and a clean light mode to suit your preference.
*   **Responsive Design**: Enjoy a consistent experience across desktop and mobile devices thanks to a mobile-first approach.

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components)
*   **UI Library**: [React](https://reactjs.org/) (Functional Components, Hooks)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
*   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (for potential future AI-powered features)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these instructions to get a local copy of TaskTango up and running for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A Firebase project. You can create one at [Firebase Console](https://console.firebase.google.com/).

### Environment Variables

Before you can run the application, you need to set up your Firebase environment variables.

1.  Create a file named `.env.local` in the root of your project.
2.  Add your Firebase project configuration to this file. You can find these credentials in your Firebase project settings (Project settings > General > Your apps > Firebase SDK snippet > Config).

    ```plaintext
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
    ```

    **Note**: Ensure your Firebase project has Authentication (Google Sign-In method enabled) and Firestore (Native mode) set up. For Firestore, you'll also need to configure security rules. A basic rule for development allowing authenticated users to read/write their own data under a `users/{userId}/tasks` collection would be a good start.

### Installation

1.  Clone the repository (if applicable) or ensure you have the project files.
2.  Navigate to the project directory:
    ```bash
    cd path/to/your-project
    ```
3.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

Once the installation is complete and environment variables are set up, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json` if different) with your browser to see the application.

## 📁 Project Structure

The project follows a standard Next.js structure with key directories:

*   `src/app/`: Contains the core application routes, layouts, and page components using the Next.js App Router.
*   `src/components/`: Reusable UI components.
    *   `src/components/ui/`: ShadCN UI components.
    *   `src/components/auth/`: Authentication related components.
    *   `src/components/tasks/`: Components specific to task management.
    *   `src/components/layout/`: Layout components like the header.
*   `src/hooks/`: Custom React hooks for managing state and side effects (e.g., `useAuth`, `useTasks`).
*   `src/lib/`: Utility functions and Firebase configuration (`firebase.ts`).
*   `src/ai/`: Configuration and flows for Genkit (if AI features are implemented).
*   `public/`: Static assets.

## 🔥 Deployment

This project is configured for deployment using [Firebase App Hosting](https://firebase.google.com/docs/app-hosting). The `apphosting.yaml` file in the root directory contains the basic configuration.

---

Happy Tasking with TaskTango!
