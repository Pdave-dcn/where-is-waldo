# 🎨 Frontend – Where's Waldo?

This folder contains the backend for the **Where's Waldo?** game.

---

## 🚀 Features

- Built with React + TypeScript + Vite
- Responsive UI styled with Tailwind CSS
- Smooth animations with Motion
- Light/Dark mode toggle
- Client-side routing using React Router
- Data validation with Zod for safe API interactions
- State management via React Context API

---

## 📁 Project Structure

```bash
frontend/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   └── index.css
│   ├── main.tsx
│
└── .env

```

---

## ⚙️ Structure & Core Components

### `GameDataProvider` (located in `src/contexts/GameDataProvider.tsx`)

This React Context Provider handles all game-related data fetching and state management:

- **Role:**  
  Fetches and stores game images, character locations, leaderboard entries, and handles game completion submissions.

- **Key Features:**

  - Loads the list of available images from the backend on initialization
  - Manages image selection and fetches detailed character data per image
  - Tracks loading and error states for better UI feedback
  - Sends game completion data (player name, time taken) to backend
  - Retrieves leaderboard information for the selected image

- **Data Safety:**  
  Validates all API responses using [Zod schemas](https://github.com/colinhacks/zod) to ensure correct data shape and catch errors early.

- **Context Exposure:**  
  Provides state variables and functions like `selectImage()`, `createGameCompletion()`, and leaderboard data to all components wrapped in this provider.

---

### `GameProgressProvider` (located in `src/contexts/GameProgressProvider.tsx`)

This provider manages the **in-game progress state** during gameplay:

- **Role:**  
  Tracks which characters have been found in the currently selected image and whether the game is completed.

- **Key Features:**

  - Maintains a set of found characters and total characters count based on the current image data
  - Automatically detects when all characters are found and marks the game as completed
  - Provides functions to mark characters as found, check if a character is found, and reset game progress
  - Resets progress whenever a new image is selected
  - Exposes the list of available characters for the current image for UI rendering and game logic

- **Usage:**  
  Wraps components that need to track or display game progress, enabling consistent state and logic throughout the gameplay session.
