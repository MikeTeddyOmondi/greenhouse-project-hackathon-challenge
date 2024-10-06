const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

window.onscroll = function () {
  const header = document.querySelector("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled"); // Add class when scrolled down
  } else {
    header.classList.remove("scrolled"); // Remove class when at the top
  }
};

require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function (Map, MapView) {

  // Create a new map instance
  const map = new Map({
    basemap: "streets-navigation-vector" // Choose a basemap
  });

  // Create a new MapView instance
  const view = new MapView({
    container: "viewDiv", // Reference to the DOM node that will contain the view
    map: map,
    zoom: 4, // Set the zoom level
    center: [27.5, -13.5] // Center the map on Zambia (Longitude, Latitude)
  });
});
