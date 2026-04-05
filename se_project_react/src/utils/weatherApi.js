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
  const result = {};
  const isDay =
    nowInSeconds >= data.sys.sunrise && nowInSeconds < data.sys.sunset;
  result.city = data.name;
  result.temp = { F: Math.round(data.main.temp) };
  result.type = getWeatherCondition(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.dayOrNight = isDay ? "day" : "night";
  return result;
};
