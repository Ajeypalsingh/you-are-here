"use strict";

const scrollDownButton = document.getElementById("scroll-down-button");
const section = document.getElementById("section");

scrollDownButton.addEventListener("click", () => {
  section.scrollIntoView({
    behavior: "smooth",
  });
});

const trackBtn = document.querySelector(".track");
const mapStructure = document.getElementById("map");

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWpleXBhbHNpbmdoIiwiYSI6ImNsZzVibGNhaTAxcW8zZ3FyZmlnd3o0aHEifQ.2TWpXEgDogiUg7YerQQxzQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  interractive: false,
  center: [0, 0],
  pitch: 40,
  zoom: 16,
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
  color: "#3458ff",
});

function getLocation(position) {
  const { longitude, latitude } = position.coords;

  if (longitude && latitude) {
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
    overlay.style.display = "none";
  }
}

function errorHandler(event) {
  console.log(event.message);
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

function showMap() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
  } else {
    console.log("Geolocation is not supported by your browser");
  }
}

trackBtn.addEventListener("click", showMap);
