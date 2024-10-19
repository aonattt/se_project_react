// utils/constants.js
const API_KEY = "3b48f91a734a9adb5386c8b545ae0b16";
const LATITUDE = "40.668963";
const LONGITUDE = "-74.109928";

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const weatherOptions = [
  {
    url: require("../images/conditions/night/clearNight.svg").default,
    day: false,
    type: "clear",
  },
  {
    url: require("../images/conditions/day/cloudyDay.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/conditions/night/cloudyNight.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../images/conditions/day/foggyDay.svg").default,
    day: true,
    type: "foggy",
  },
  {
    url: require("../images/conditions/night/foggyNight.svg").default,
    day: false,
    type: "foggy",
  },
  {
    url: require("../images/conditions/day/rainyDay.svg").default,
    day: true,
    type: "rainy",
  },
  {
    url: require("../images/conditions/night/rainyNight.svg").default,
    day: false,
    type: "rainy",
  },
  {
    url: require("../images/conditions/day/snowyDay.svg").default,
    day: true,
    type: "snowy",
  },
  {
    url: require("../images/conditions/night/snowyNight.svg").default,
    day: false,
    type: "snowy",
  },
  {
    url: require("../images/conditions/day/stormyDay.svg").default,
    day: true,
    type: "stormy",
  },
  {
    url: require("../images/conditions/night/stormyNight.svg").default,
    day: false,
    type: "stormy",
  },
  {
    url: require("../images/conditions/day/sunnyDay.svg").default,
    day: true,
    type: "sunny",
  },
];

// Export all constants
export { API_KEY, LATITUDE, LONGITUDE, defaultClothingItems, weatherOptions };
