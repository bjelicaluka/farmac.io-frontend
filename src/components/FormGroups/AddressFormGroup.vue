<template>
    <form-group :title="'Address'">
      <form-row>
        <div class="col-3">
          <text-input
            label="State"
            v-model="address.state"
            :isValid="validateText(address.state)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid state."
          />
        </div>
        <div class="col-3">
          <text-input
            label="City"
            v-model="address.city"
            :isValid="validateText(address.city)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid city."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Street Name"
            v-model="address.streetName"
            :isValid="validateText(address.streetName)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid street name."
          />
        </div>
        <div class="col-2">
          <text-input
            label="Number"
            v-model="address.streetNumber"
            :isValid="!!address.streetNumber"
            :showErrorMessage="showErrorMessage"
            errorMessage="Invalid street number."
          />
        </div>
      </form-row>
      <Map :height="250" @click="onMapClick($event)" :center="address || null" :modalBoxId="modalBoxId">
        <div slot="markers">
          <MapMarker :v-if="address.lat !== null && address.lng !== null" :lat="address.lat" :lng="address.lng">
            <div>
              <p class="text-dark">{{address.state}}</p>
              <p class="text-dark">{{address.city}}</p>
              <p class="text-dark">{{address.streetName}}</p>
              <p class="text-dark">{{address.streetNumber}}</p>
            </div>
          </MapMarker>
        </div>
      </Map>
      <InputErrorMessage
        :isValid="showErrorMessage ? !!address.lat && !!address.lng : true"
      >
        Please pick a location on the map.
      </InputErrorMessage>
    </form-group>
</template>

<script>

import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import Map from '../Map/Map.vue'
import MapMarker from '../Map/MapMarker.vue'
import InputErrorMessage from '../Form/InputErrorMessage.vue'
import { validateText } from '../../utils/validation'

export default {
    components: {
        FormGroup,
        FormRow,
        TextInput,
        Map,
        MapMarker,
        InputErrorMessage
    },

    props: {
        address: {
            type: Object,
            default: () => { return {
                lat: '',
                lng: '',
                state: '',
                city: '',
                streetName: '',
                streetNumber: ''
            } }
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        showErrorMessage: {
            type: Boolean,
            default: false
        },
        modalBoxId: {
            type: String,
            default: ''
        }
    },
    watch: {
      address() {
        console.log(this.address.lat)
      }
    },
    methods: {
        onMapClick(e) {
            this.address.lat = e.latlng.lat;
            this.address.lng = e.latlng.lng;
        },

        validateText(text) {
            return validateText(text);
        }
    }
}
</script>
