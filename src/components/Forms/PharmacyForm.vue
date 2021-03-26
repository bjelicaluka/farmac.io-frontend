<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Pharmacy Info'">
      <form-row>
        <div class="col-12">
          <text-input
            label="Name"
            v-model="pharmacy.name"
            :isValid="!!pharmacy.name"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid name."
          />
        </div>
      </form-row>
      <form-row>
        <div class="col-12">
          <text-input
            label="Description"
            v-model="pharmacy.description"
            :isValid="!!pharmacy.description"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid description."
          />
        </div>
      </form-row>
    </form-group>
    <form-group :title="'Address'">
      <form-row>
        <div class="col-3">
          <text-input
            label="State"
            v-model="pharmacy.address.state"
            :isValid="validateText(pharmacy.address.state)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid state."
          />
        </div>
        <div class="col-3">
          <text-input
            label="City"
            v-model="pharmacy.address.city"
            :isValid="validateText(pharmacy.address.city)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid city."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Street Name"
            v-model="pharmacy.address.streetName"
            :isValid="validateText(pharmacy.address.streetName)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid street name."
          />
        </div>
        <div class="col-2">
          <text-input
            label="Number"
            v-model="pharmacy.address.streetNumber"
            :isValid="!!pharmacy.address.streetNumber"
            :showErrorMessage="showErrorMessage"
            errorMessage="Invalid street number."
          />
        </div>
      </form-row>
      <Map :height="250" @click="onMapClick($event)" :modalBoxId="'pharmacyModal'">
        <div slot="markers">
          <MapMarker :v-if="pharmacy.address.lat !== null && pharmacy.address.lng !== null" :lat="pharmacy.address.lat" :lng="pharmacy.address.lng">
            <div>
              <p class="text-dark">{{pharmacy.address.state}}</p>
              <p class="text-dark">{{pharmacy.address.city}}</p>
              <p class="text-dark">{{pharmacy.address.streetName}}</p>
              <p class="text-dark">{{pharmacy.address.streetNumber}}</p>
            </div>
          </MapMarker>
        </div>
      </Map>
      <InputErrorMessage
        :isValid="showErrorMessage ? !!pharmacy.address.lat && !!pharmacy.address.lng : true"
      >
        Please pick a location on the map.
      </InputErrorMessage>
    </form-group>
    <Button @click="showErrorMessage = true" class="btn btn-primary pull-right" type="submit">Create</button>
  </Form>
</template>

<script>
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import Map from '../Map/Map.vue'
import MapMarker from '../Map/MapMarker.vue'
import { validateText } from '../../utils/validation'
import InputErrorMessage from '../Form/InputErrorMessage.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
  components: { Form, FormGroup, FormRow, TextInput, Map, MapMarker, InputErrorMessage },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    existingPharmacy: {
      type: Object
    }
  },
  data: () => {
    return {
      pharmacy: {
        name: null,
        description: null,
        address: {
          lat: null,
          lng: null,
          state: null,
          city: null,
          streetName: null,
          streetNumber: null,
        }
      },
      showErrorMessage: false
    }
  },

  computed: {
      ...mapGetters({result: 'pharmacies/getAddResult'})
  },

  watch: {
      result({text, code}) {
        if(code === 200) {
            toastr.success(text);
        } else {
            toastr.error(text);
        }
      }
  },

  methods: {
    ...mapActions({addPharmacy: 'pharmacies/addPharmacy'}),

    onMapClick(e) {
      this.pharmacy.address.lat = e.latlng.lat;
      this.pharmacy.address.lng = e.latlng.lng;
    },

    onSubmit(e) {
      e.preventDefault();
      this.addPharmacy(this.pharmacy);
    },

    validateText(text) {
      return validateText(text);
    },
  },

  mounted() {
    if(this.isEdit) {
      this.pharmcy = this.existingPharmacy;
    }
  },
  
}
</script>

<style>

</style>