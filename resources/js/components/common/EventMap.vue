<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { token } from "../../api/request";

export default {
  name: "EventMap",

  data: () => ({
    accessToken: "",
  }),

  props: {
    venueLatLng: {
      type: Object,
    },
  },

  created: function () {
    this.accessToken = process.env.MIX_MAPBOX_ACCESS_TOKEN;
  },

  mounted() {
    this.setupLeafletMap();
  },

  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map("map").setView(
        [this.venueLatLng.lat, this.venueLatLng.lng],
        13
      );

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1,
          id: "mapbox/streets-v11",
          accessToken: this.accessToken,
        }
      ).addTo(mapDiv);

      L.marker([this.venueLatLng.lat, this.venueLatLng.lng]).addTo(mapDiv);
    },
  },
};
</script>

<style scoped>
  #map {
    /* width: 400px; */
    /* width: 100%; */
    height: 300px;
    z-index: 0;
    object-fit: cover;
  }
</style>
