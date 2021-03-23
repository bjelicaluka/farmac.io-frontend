<template>
  <l-marker :lat-lng="latlng">
    <l-popup>
      <slot />
    </l-popup>
  </l-marker>
</template>

<script>
import { latLng } from "leaflet";
import { LMarker, LPopup } from "vue2-leaflet";

export default {
  data: () => {
    return {
      latlng: latLng(0, 0)
    }
  },
  props: {
    position: {}
  },
  components: {
    LMarker,
    LPopup,
  },
  mounted() {
    this.latlng = latLng(this.position[0], this.position[1]);
  }
}
</script>

<style>

</style>