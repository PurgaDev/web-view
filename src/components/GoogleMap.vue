<template>
  <div id="map" style="height: 500px; width: 100%"></div>
</template>

<script>
export default {
  name: "MapComponent",
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Création de la carte
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 3.848, lng: 11.502}, // Exemple : Latitude et Longitude
        zoom: 10, // Niveau de zoom
      });

      // Ajout d'un marqueur
      new google.maps.Marker({
        position: {lat: 3.848, lng: 11.502},
        map: map,
        title: "Ma Position",
      });
    },
  },
};
</script>

<style scoped>
#map {
  border: 1px solid #ccc;
}
</style>
