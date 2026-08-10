# WeatherWebApp

A clean, highly visual, and responsive weather application built with React. It features a modern **glassmorphism** design combined with Samsung One UI-style dynamic gradients and animated CSS weather effects that adapt smoothly to live forecasts.

**[Check out the Live App](https://weather-app-rib4.vercel.app/)**

---

## Features

* **Real-Time Forecasting:** Search for any city worldwide to instantly fetch current temperatures, "feels like" values, daily highs and lows, humidity, atmospheric pressure, and sunrise/sunset times.
* **US EPA Air Quality Index & Pollutants:** Calculates standard US AQI metrics and displays a detailed breakdown of **PM2.5** and **PM10** microgram measurements right inside the Air Quality card.
* **Samsung-Style Dynamic Gradients:** The app dynamically shifts background themes (sunny, rainy, cloudy, snowy, or hazy) with silky-smooth transitions that scale perfectly without distortion.
* **Lightweight CSS Weather Effects:** Features smooth, high-performance 60 FPS CSS animations for falling rain, drifting snowflakes, sun glows, and atmospheric haze that look great without lagging mobile devices.
* **Responsive Layout & Custom Card Shapes:**
* *Desktop:* Balanced 3x2 grid layout with comfortable top-padding alignment.
* *Mobile:* Tailored mobile layout featuring full-width rectangle cards for Weather and Air Quality, flanked by clean side-by-side rounded squares for secondary metrics.


* **Vercel-Optimized Performance:** Built using high-performance translucent styling and deep layered shadows for robust cross-browser and production reliability.

---

## Tech Stack

* **Frontend:** React.js
* **Styling:** Custom CSS (Glassmorphism, Flexbox, CSS Gradients, and Keyframe Animations)
* **Icons:** Material-UI (MUI)
* **APIs:** OpenWeatherMap Weather & Air Pollution APIs

---

## Running Locally

If you want to download this code and run it on your own computer, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Step 1: Clone the repository

Open your terminal and clone the project:

```bash
git clone https://github.com/aslivashu/WeatherApp.git

```

### Step 2: Navigate to the project folder

```bash
cd WeatherApp

```

### Step 3: Install dependencies

Install the required packages (including Material-UI icons):

```bash
npm install

```

### Step 4: Start the development server

Run the local server:

```bash
npm run dev

```

Your terminal will provide a local link (usually `http://localhost:5173`). Click the link to open the app in your browser!

---

## A Note on the API Key

To make testing easy out of the box, a free-tier OpenWeatherMap API key has been included in `SearchBox.jsx`. If you plan to fork this project or deploy your own version, please sign up for a free key at [OpenWeatherMap](https://openweathermap.org/) and replace the existing key to avoid hitting shared rate limits.

---

Built by **Sarthak**
