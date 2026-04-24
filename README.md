# Portfolio
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Xenio29/portfolio-app)

This is a personal portfolio application developed with Angular, designed to showcase a collection of projects in a dynamic and visually appealing manner. The main feature is an interactive 3D project carousel that users can navigate via mouse wheel, drag, or touch gestures.

## Key Features

*   **Interactive 3D Carousel**: Navigate through projects with smooth transitions and a 3D perspective effect.
*   **Multiple Control Methods**: Interact with the carousel using the mouse wheel, click-and-drag, or touch gestures on mobile devices.
*   **Responsive Design**: A fully responsive layout that adapts to various screen sizes, from mobile to desktop.
*   **Collapsible Menu Bar**: A sticky navigation bar that automatically collapses into a compact logo on scroll and can be toggled manually.
*   **System-Aware Theme**: Automatically switches between light and dark modes based on the user's system preferences.
*   **Animated SVG Icons**: The menu bar features animated SVG icons for a modern and engaging feel.

## Core Components

*   **`MenuBar`**: A sticky navigation bar at the top. It handles its own collapse/expand state based on user scroll and direct interaction, providing a clean UI.
*   **`Projets`**: This component manages the main content—the interactive project carousel. It listens for user input (wheel, mouse drag, touch) to update the carousel's state and position.
*   **`CarouselCards`**: A reusable component that represents a single project card in the carousel. It receives project data like title, description, and image as inputs to display.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and the Angular CLI installed.

*   [Node.js](https://nodejs.org/)
*   Install Angular CLI globally:
    ```sh
    npm install -g @angular/cli
    ```

### Installation & Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/xenio29/portfolio-app.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd portfolio-app
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

## Available Scripts

The `package.json` file includes the following scripts:

### `npm start`

Runs the app in development mode. Open [http://localhost:4200](http://localhost:4200) to view it in the browser. The page will reload if you make edits.

### `npm run build`

Builds the app for production. It correctly bundles Angular in production mode and optimizes the build for the best performance. The build artifacts are stored in the `docs/` directory, configured for deployment to GitHub Pages.

### `npm test`

Launches the test runner in interactive watch mode using Vitest.