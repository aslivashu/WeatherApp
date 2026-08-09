Hi there! Welcome to my Weather App repository.

I built this project because I wanted a clean, highly visual way to check the weather. Instead of just giving you a boring list of numbers, this app actually changes its entire look and feel based on the forecast. It uses a modern "frosted glass" design (glassmorphism) that looks great on both a large desktop monitor and your phone.

What it does
Real-time forecasting: You can type in any city in the world, and it will fetch the current weather, "feels like" temperature, daily highs/lows, humidity, atmospheric pressure, and sunrise/sunset times.

It reacts to the weather: If you search for a city where it's raining, the background image and the icons will automatically swap to a rainy theme. It does the same for snow, fog, clouds, and clear skies.

Mobile-first design: If you open this on a phone, the layout completely changes. The weather stats turn into clean, square widgets that stack perfectly on smaller screens.

What I used to build it
React.js for the frontend framework.

Custom CSS for the glassmorphism effects, flexbox, and mobile grid layouts.

Material-UI (MUI) for the crisp, scalable icons.

OpenWeatherMap API to fetch all the live weather data.

How to run this on your own computer
If you want to download this code and play around with it locally, here is exactly how to set it up.

Before you start: Make sure you have Node.js installed on your machine.

Step 1: Clone the code

Open your computer's terminal and run this command to download the repository:

Bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
Step 2: Open the folder

Navigate into the project folder you just downloaded:

Bash
cd YOUR-REPO-NAME
Step 3: Install the dependencies

This app needs a few extra packages to run (like the Material-UI icons). Tell your terminal to install them by running:

Bash
npm install
Step 4: Start the app!

Once everything is installed, you can start the local development server:

Bash
npm run dev 
(Note: If you used Create React App instead of Vite, you might need to run npm start instead).

Your terminal will give you a local link (usually http://localhost:5173 or http://localhost:3000). Just Ctrl+Click that link, and the app will open in your web browser!

A quick note on the API Key
To make it easy to test, I left a free-tier OpenWeatherMap API key in the SearchBox.jsx file. If you are going to fork this project or deploy it for your own use, please go to OpenWeatherMap, sign up for your own free API key, and swap it out so we don't share the same rate limits.

Thanks for checking out my project!

— Sarthak
