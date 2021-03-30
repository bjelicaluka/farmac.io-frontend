<template>
  <div class="l-map-custom" :style="`height: ${height || 400}px`">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="latLng(center.lat, center.lng)"
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

const $ = window.$;
const defaultCenter = {lat: 45.38361, lng: 20.38194};

export default {
  components: {
    LMap,
    LTileLayer,
  },
  props: {
    center: {
      default: () => defaultCenter
    },
    height: {
      type: Number,
      default: 300
    },
    modalBoxId: {
      type: String
    }
  },
  data() {
    return {
      zoom: 13,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      currentZoom: 11.5,
      mapOptions: {
        zoomSnap: 0.5
      },
    };
  },
  mounted() {
    const this_ = this;
    this.modalBoxId && $(`#${this.modalBoxId}`).on('show.bs.modal', function(){
      setTimeout(() => {
        this_.$refs.map?.mapObject.invalidateSize();
      }, 1000);
    });
  },
  methods: {
    onClickMap(e) {
      this.$emit('click', e);
      this.$refs.map.mapObject.invalidateSize();
    },
    latLng() {
      const c = (!!this.center.lat && !!this.center.lng) ? this.center : {...defaultCenter};
      return latLng(c.lat, c.lng);
    }
  }
}
</script>

<style>
.l-map-custom {
  width: 100%;
}
</style>