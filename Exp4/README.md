# Exp 4: Front-end Testing using Jest and React Testing Library

This directory contains a complete setup for performing front-end testing on React components. It demonstrates various testing strategies, including unit testing, integration/interaction testing, and snapshot testing, to ensure UI components behave as expected under different conditions.

## What This Does

The code fulfills three specific testing objectives:
1. **Unit Testing:** Verifies that a simple React component renders correctly and responds to user events.
2. **Form Interaction Testing:** Simulates a user filling out a web form, submitting it, and checks that appropriate validation or success messages are displayed.
3. **Snapshot Testing:** Captures the HTML-like structure of a complex component in various states (loading, error, empty, and loaded) to ensure the UI does not change unexpectedly over time.

## How It Works

The project is structured inside the `src/components/` directory, with each component paired with its respective test file (`.test.jsx`):

*   **`Button.jsx` & `Button.test.jsx`**: A simple button component. The tests verify that it correctly renders dynamic text passed as props and that it successfully triggers an `onClick` callback when clicked by the user.
*   **`Form.jsx` & `Form.test.jsx`**: A login/submission form. It uses `@testing-library/user-event` to type into the "Email" and "Password" input fields, fires a submit event, and asserts that the DOM correctly displays either "All fields are required" (if empty) or "Form submitted successfully!" (if filled).
*   **`Dashboard.jsx` & `Dashboard.test.jsx`**: A component that accepts a `state` prop. The test uses `react-test-renderer` to generate JSON representations of the DOM for each state (`loading`, `error`, `empty`, `loaded`) and compares them against saved snapshots (located in `__snapshots__`). If the component's UI changes in the future, the test will fail, prompting the developer to either fix the bug or update the snapshot.

## How to Run

This project is a dedicated testing environment, meaning it runs entirely in the terminal via Jest. There is no web server to start.

### Prerequisites
Make sure you have Node.js and NPM installed on your machine.

### 1. Install Dependencies
Open your terminal, navigate to the `Exp4` folder, and install the required packages:

```bash
cd Exp4
npm install
```

### 2. View the Live UI
To see and interact with these components in your browser, run the Vite development server:
```bash
npm run dev
```
Then, click the local link (usually `http://localhost:5173`) in your terminal.

### 3. Run the Tests
To execute the test suite once and see the results:

```bash
npm test
```

### 4. Run Tests in Watch Mode (Recommended for Development)
To keep Jest running in the background so it automatically runs tests whenever you modify a file:

```bash
npm run test:watch
```

*(Press `q` or `Ctrl + C` in the terminal to exit watch mode.)*
