<template>
  <div class="l-map-custom">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @click="onClickMap($event)"
    >
      <l-tile-layer
        :url="url"
        :attribution="''"
      />
      <slot name="markers" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 13,
      center: latLng(45.38361, 20.38194),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      currentZoom: 11.5,
      currentCenter: latLng(45.38361, 20.38194),
      mapOptions: {
        zoomSnap: 0.5
      },
    };
  },
  methods: {
    onClickMap(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style>
.l-map-custom {
  height: 400px;
  width: 100%;
}
</style>