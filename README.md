# BrickMMO Control Panel App

This is a **BrickMMO Control Panel** application built using **React**, **Vite**, and **TailwindCSS**. The app fetches data from the BrickMMO API and displays control panel information for different cities. Users can interact with various motors and switches for each city and select different cartridges to change motor and switch states.

## Features
- Fetches panel data for different cities using the city ID.
- Displays motor values, switch statuses, and power lever status.
- Allows users to select cartridges, reflecting motor and switch data accordingly.
- Dynamic UI with TailwindCSS for styling and responsive design.

## Prerequisites

To run this project, ensure you have the following installed on your system:
- **Node.js** (v21.6.0)
- **npm**

## Installation

1. Clone the repository:

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root of the project and add the following API URLs:

     ```
     VITE_FETCH_CITIES_API=<API_LINK>
     VITE_FETCH_PANEL_API=<API_LINK>
     ```

4. Run the application:
   ```
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:1003
   ```