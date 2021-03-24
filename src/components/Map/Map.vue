<template>
  <div class="l-map-custom" :style="`height: ${height || 400}px`">
    <l-map
      ref="map"
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

const $ = window.$;

export default {
  components: {
    LMap,
    LTileLayer,
  },
  props: {
    center: {
      default: () => latLng(45.38361, 20.38194)
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
        this_.$refs.map.mapObject.invalidateSize();
      }, 1000);
    });
  },
  methods: {
    onClickMap(e) {
      this.$emit('click', e);
      this.$refs.map.mapObject.invalidateSize();
    }
  }
}
</script>

<style>
.l-map-custom {
  width: 100%;
}
</style>