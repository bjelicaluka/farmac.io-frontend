<template>
    <form-group :title="'Address'">
      <form-row>
        <div class="col-3">
          <text-input
            label="State"
            v-model="address.state"
            :isValid="!!address.state"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid state."
          />
        </div>
        <div class="col-3">
          <text-input
            label="City"
            v-model="address.city"
            :isValid="!!address.city"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid city."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Street Name"
            v-model="address.streetName"
            :isValid="!!address.streetName"
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
      <div>
        <button-with-icon iconName="location_on" class="btn-round btn-sm" @click="findOnMap"> Find on map</button-with-icon>
      </div>
      <Map :height="250" :center="address || null" :modalBoxId="modalBoxId">
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
        Please find location on the map.
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
import toastr from 'toastr'
import ButtonWithIcon from '../Form/ButtonWithIcon.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        FormGroup,
        FormRow,
        TextInput,
        Map,
        MapMarker,
        InputErrorMessage,
        ButtonWithIcon
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
    computed: {
        ...mapGetters({
            locationData: 'address/getLocationData',
            result: 'address/getResult'
        })
    },
    watch: {
      locationData(data) {
          this.address.lat = parseFloat(data.lat);
          this.address.lng = parseFloat(data.lon);
          this.address.streetNumber = data.address.house_number || this.address.streetNumber;
          this.address.streetName = data.address.road;
          this.address.city = data.address.city;
          this.address.state = data.address.country;
      },
      result({label, ok, message}) {
          if(label === 'addressWarn')
              toastr.warning(message);
          else
              toastr.error(message);
      },
    },
    methods: {
        ...mapActions({ 
            fetchLocationData: 'address/fetchLocationData'
        }),
        findOnMap() {
            this.fetchLocationData(`${this.address.state} ${this.address.city} ${this.address.streetName} ${this.address.streetNumber}`);
        }
    }
}
</script>
