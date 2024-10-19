import { API_KEY, LATITUDE, LONGITUDE } from "./constants";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async () => {
  const url = `${BASE_URL}?lat=${LATITUDE}&lon=${LONGITUDE}&units=imperial&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data fetching failed");
    
    const data = await response.json();
    
    // Return the relevant weather data
    return { 
      cityName: data.name, 
      temperature: data.main.temp 
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    
    // Return an error object so the UI can handle it
    return { error: true, message: error.message };
  }
};

// Utility function to determine the weather type based on temperature
export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

