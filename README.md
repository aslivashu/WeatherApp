
# WeatherWebApp

A clean, highly visual, and responsive weather application built with React. It features a modern **glassmorphism** ("frosted glass") design that dynamically changes its look and feel based on the live weather forecast.

 **[Check out the Live ] - ((https://weather-app-rib4.vercel.app/))**

---

##  Features

* **Real-Time Forecasting:** Search for any city worldwide to instantly fetch current temperatures, "feels like" values, daily highs and lows, humidity, atmospheric pressure, and sunrise/sunset times.
* **Dynamic Weather Themes:** The app automatically adapts its background and icons to match real-world conditions (rain, snow, fog, clouds, or clear skies).
* **Mobile-First Design:** Fully responsive layout that scales smoothly from large desktop monitors down to mobile phones, transforming stats into clean, stackable widgets.

---
 Tech Stack

* **Frontend:** React.js
* **Styling:** Custom CSS (Glassmorphism effects, Flexbox, and responsive grid layouts)
* **Icons:** Material-UI (MUI)
* **API:** OpenWeatherMap API

---

 Running Locally

If you want to download this code and run it on your own computer, follow these steps:
 Prerequisites
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

*(Note: If you are using an older setup with Create React App, you may need to use `npm start` instead).*

Your terminal will provide a local link (usually `http://localhost:5173`). Ctrl+Click the link to open the app in your browser!

---

##  A Note on the API Key

To make testing easy out of the box, a free-tier OpenWeatherMap API key has been included in `SearchBox.jsx`. If you plan to fork this project or deploy your own version, please sign up for a free key at [OpenWeatherMap](https://openweathermap.org/) and replace the existing key to avoid hitting shared rate limits.

---

Built by **Sarthak**

```

```
