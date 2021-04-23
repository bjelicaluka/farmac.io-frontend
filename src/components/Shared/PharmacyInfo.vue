<template>
  <div>
    <div class="row">
      <ModalOpener class="ml-auto mr-1 mb-2" modalBoxId="pharmacyModal">
        <Button>Edit Pharmacy General Info</Button>
      </ModalOpener>
      <div class="mr-3 mb-2">
        <Button @click="changeRoutePriceList" class="pull-right">Edit prices</Button>
      </div>
    </div>
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

    <Modal
      modalBoxId="pharmacyModal"
      title="Edit Pharmacy General Info"
    >
      <div slot="body">
        <PharmacyForm :isEdit="true" :existingPharmacy="pharmacy" />
      </div>
    </Modal>
  </div>
</template>

<script>
import Button from '../Form/Button.vue'
import PharmacyForm from '../Forms/PharmacyForm.vue'
import Map from '../Map/Map.vue'
import MapMarker from '../Map/MapMarker.vue'
import Modal from '../Modal/Modal.vue'
import ModalOpener from '../Modal/ModalOpener.vue'

export default {
  components: { Map, MapMarker, Button, PharmacyForm, Modal, ModalOpener },
  props: {
    pharmacy: {
      type: Object,
    }
  },
  methods: {
    changeRoutePriceList(e) {
      e.preventDefault();
      this.$router.push(`/pharmacy-price-list/${this.pharmacy.id}`);
    }
  }
}
</script>

<style>

</style>