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
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  components: {
    LMarker,
    LPopup,
  },
  mounted() {
    this.latlng = latLng(this.lat, this.lng);
  },
  updated() {
    if(this.lat !== this.latlng?.lat || this.lng !== this.latlng?.lng)
      this.latlng = latLng(this.lat, this.lng);
  }
}
</script>

<style>

</style>