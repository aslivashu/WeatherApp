
# WeatherWebApp

A clean, highly visual, and responsive weather application built with React. It features a modern **glassmorphism** design combined with Samsung One UI-style dynamic gradients, automated night-mode detection, and smooth responsive layouts that adapt live to global forecasts.

**[Check out the Live App](https://weather-app-rib4.vercel.app/)**

---

## Features

* **Real-Time Forecasting:** Search for any city worldwide to instantly fetch current temperatures, "feels like" values, daily highs and lows, humidity, atmospheric pressure, and sunrise/sunset times.
* **Smart Day & Night Theme Engine:** Automatically detects night-time conditions (via OpenWeatherMap API icon codes and local device time) to switch from bright daytime palettes to comfortable, eye-friendly dark gradients.
* **Specialized Night Gradients:** Features distinct, high-end dark backgrounds optimized for various evening conditions:
  * *Clear Night:* Deep navy gradients (`night-clear`)
  * *Cloudy/Overcast Night:* Dark charcoal palettes (`night-cloudy`)
  * *Rainy Night:* Deep slate storm tones (`night-rainy`)
  * *Snowy & Hazy Nights:* Tailored winter and atmospheric night tones (`night-snowy`, `night-haze`)
* **US EPA Air Quality Index & Pollutants:** Calculates standard US AQI metrics and displays a detailed breakdown of **PM2.5** and **PM10** microgram measurements.
* **Lightweight CSS Weather Effects:** Features smooth 60 FPS CSS animations for falling rain, drifting snowflakes, sun glows, and atmospheric elements.
* **Responsive Layout & Custom Card Shapes:** 
  * *Desktop:* Balanced 3x2 grid layout with comfortable top-padding alignment.
  * *Mobile:* Tailored mobile layout featuring full-width rectangle cards for Weather and Air Quality, flanked by clean side-by-side metrics.
* **Vercel-Optimized Performance:** Built using robust translucent styling and deep layered shadows to ensure cross-browser stability and zero rendering bugs on production servers.

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
git clone [https://github.com/aslivashu/WeatherApp.git](https://github.com/aslivashu/WeatherApp.git)

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

```

```