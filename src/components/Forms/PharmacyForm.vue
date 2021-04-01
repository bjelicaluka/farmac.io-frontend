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
      <Map :height="250" @click="onMapClick($event)" :center="pharmacy.address || null" :modalBoxId="'pharmacyModal'">
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
    <Button @click="showErrorMessage = true" class="btn btn-primary pull-right" type="submit">{{isEdit ? 'Update' : 'Create'}}</button>
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

const initialPharmacy = {
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
}

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
      pharmacy: {...initialPharmacy},
      showErrorMessage: false
    }
  },

  computed: {
      ...mapGetters({result: 'pharmacies/getResult'})
  },

  watch: {
    result({label, ok, message}) {
      if(label !== 'add' && label !== 'update') {
        return;
      }
      
      if(ok) {
        toastr.success(message);
        this.fetchPharmacies();
      } else {
        toastr.error(message);
      }
    },
    isEdit() {
      this.setEdit();
    },
    existingPharmacy() {
      this.setEdit();
    }
  },

  methods: {
    ...mapActions({
      addPharmacy: 'pharmacies/addPharmacy',
      updatePharmacy: 'pharmacies/updatePharmacy',
      fetchPharmacies: 'pharmacies/fetchPharmacies'
    }),

    onMapClick(e) {
      this.pharmacy.address.lat = e.latlng.lat;
      this.pharmacy.address.lng = e.latlng.lng;
    },

    onSubmit(e) {
      e.preventDefault();
      this.isEdit ? this.updatePharmacy(this.pharmacy) : this.addPharmacy(this.pharmacy);
    },

    validateText(text) {
      return validateText(text);
    },
    setEdit() {
      if(!this.isEdit) {
        this.pharmacy = {...initialPharmacy};
        this.pharmacy.address = {...initialPharmacy.address}
        return;
      }

      if(this.existingPharmacy) {
        this.pharmacy = {...this.existingPharmacy};
        this.pharmacy.address = {...this.existingPharmacy.address}
      }
    },
  },

  mounted() {
    this.setEdit();
  },
  
}
</script>

<style>

</style>