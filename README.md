# Clime - Weather Application

A modern weather application built with React that provides current weather conditions and forecasts using the OpenWeather API.

## Project Description

Clime is a feature-rich weather application designed for users to access detailed weather information quickly and efficiently. The application leverages the OpenWeather API to fetch real-time weather data, including current conditions, hourly and daily forecasts, geolocation support, and location search functionality. Clime supports both metric and imperial units, ensuring versatility for users in different regions.

## Features

- **Current Weather Conditions**: Display real-time weather information for any location.
- **5-Day Forecast**: Show detailed hourly predictions for the next five days.
- **Geolocation Support**: Automatically detect your location using your device's geolocation capabilities.
- **Location Search**: Search for locations by city name to quickly access weather data for specific regions.
- **Metric/Imperial Unit Support**: Choose between Celsius and Fahrenheit to view weather information in your preferred unit system.
- **Responsive Design**: Access the application on both desktop and mobile devices with a seamless user experience.

## Tech Stack

- **Frontend**: React
- **TypeScript**: For robust type checking and better code quality
- **OpenWeather API**: For fetching weather data from around the world
- **Shadcn/ui Components**: For modern, clean UI components that enhance the user experience

## Getting Started

### Prerequisites

- **Node.js (v16 or higher)**: To run the application locally.
- **npm or yarn**: To install dependencies and manage project files.
- **OpenWeather API key**: To access weather data via the OpenWeather API.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/michallowkiet/clime.git
   ```
   2. Navigate to the project directory:
   ```bash
   cd clime
   ```
   3. Install dependencies:
   ```bash
   npm install
   ```
   4. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```bash
   touch .env
   ```
   ```bash
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   5. Start the development server:
   ```bash
   npm run dev
   ```
   7. Open your browser and navigate to `http://localhost:5173` to access the application.

## Usage

Once the application is running, you can:

1. **View Current Weather:** Enter a location or allow geolocation to see current conditions.
2. **Search for Locations:** Use the search bar to find specific cities and their weather data.
3. **Toggle Units:** Switch between metric (Celsius) and imperial (Fahrenheit) units using the appropriate buttons.
4. **See Forecasts:** Access detailed hourly and daily forecasts for your location.

## TODO

- [x] Add geolocation support
- [x] Add location search functionality
- [x] Add dark/light mode toggle
- [x] Add favorite locations functionality
- [x] Add location page
- [ ] Add unit system switching (metric/imperial)
- [ ] Add mapping functionality
