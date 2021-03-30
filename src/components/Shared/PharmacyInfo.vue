<template>
  <Map v-if="pharmacy" :center="pharmacy.address">
    <div slot="markers">
      <MapMarker :v-if="pharmacy.address.lat !== null && pharmacy.address.lng !== null" :lat="pharmacy.address.lat" :lng="pharmacy.address.lng">
        <div>
          <p class="text-dark">{{pharmacy.address.state}}, {{pharmacy.address.city}}</p>
          <p class="text-dark">{{pharmacy.address.streetName}}, {{pharmacy.address.streetNumber}}</p>
        </div>
      </MapMarker>
    </div>
  </Map>
</template>

<script>
import Map from '../Map/Map.vue'
import MapMarker from '../Map/MapMarker.vue'
export default {
  components: { Map, MapMarker },
  props: {
    pharmacy: {
      type: Object,
    }
  }
}
</script>

<style>

</style>