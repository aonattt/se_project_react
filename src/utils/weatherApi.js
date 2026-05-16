const nowInSeconds = Date.now() / 1000;
export const getWeather = ({ latitude, longitude, apiKey }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const getWeatherCondition = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp > 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

export const processWeatherData = (data) => {
  const isDay =
    nowInSeconds >= data.sys.sunrise && nowInSeconds < data.sys.sunset;
  const result = {
    city: data.name,
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
    type: getWeatherCondition(Math.round(data.main.temp)),
    condition: data.weather[0].main.toLowerCase(),
    dayOrNight: isDay ? "day" : "night",
  };
  return result;
};
