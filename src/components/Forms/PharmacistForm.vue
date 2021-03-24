<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Account Info'">
      <form-row>
        <div class="col-6">
          <text-input
            label="Username"
            v-model="username"
            :isValid="!!username"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid username."
          />
        </div>
        <div class="col-6">
          <text-input
            label="Email"
            v-model="email"
            :isValid="!!email"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid email."
          />
        </div>
      </form-row>
      <form-row>
        <div class="col-6">
          <text-input
            label="Password"
            v-model="password"
            :isValid="!!password"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid password."
          />
        </div>
        <div class="col-6">
          <text-input
            label="Confirm Password"
            v-model="confirmPassword"
            :isValid="confirmPassword === password"
            :showErrorMessage="showErrorMessage"
            errorMessage="Passwords don't match."
          />
        </div>
      </form-row>
    </form-group>
    <form-group :title="'Personal Info'">
      <form-row>
        <div class="col-4">
          <text-input
            label="First Name"
            v-model="firstName"
            :isValid="!!firstName"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid name."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Last Name"
            v-model="lastName"
            :isValid="!!lastName"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid surname."
          />
        </div>
        <div class="col-4">
          <date-time-picker
            v-model="dateOfBirth"
            :isValid="!!dateOfBirth"
            :showErrorMessage="showErrorMessage"
            label="Date of Birth"
            errorMessage="Invalid date."
            type="date"
          />
        </div>
      </form-row>
      <form-row>
        <div class="col-7">
          <text-input
            label="PID"
            v-model="pid"
            :isValid="!!pid"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid PID."
          />
        </div>
        <div class="col-5">
          <text-input
            label="Phone Number"
            v-model="phoneNumber"
            :isValid="!!phoneNumber"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid phone number."
          />
        </div>
      </form-row>
    </form-group>
    <form-group :title="'Address'">
      <form-row>
        <div class="col-3">
          <text-input
            label="State"
            v-model="state"
            :isValid="!!state"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid state."
          />
        </div>
        <div class="col-3">
          <text-input
            label="City"
            v-model="city"
            :isValid="!!city"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid city."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Street Name"
            v-model="streetName"
            :isValid="!!streetName"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid street name."
          />
        </div>
        <div class="col-2">
          <text-input
            label="Number"
            v-model="streetNumber"
            :isValid="!!streetNumber"
            :showErrorMessage="showErrorMessage"
            errorMessage="Invalid street number."
          />
        </div>
      </form-row>
      <Map :height="250" @click="onMapClick($event)" :modalBoxId="'pharmacistModal'">
        <div slot="markers">
          <MapMarker :v-if="lat !== null && lng !== null" :lat="lat" :lng="lng">
            <div>
              <p cl ass="text-dark">{{state}}</p>
              <p class="text-dark">{{city}}</p>
              <p class="text-dark">{{streetName}}</p>
              <p class="text-dark">{{streetNumber}}</p>
            </div>
          </MapMarker>
        </div>
      </Map>
    </form-group>
    <button class="btn btn-primary pull-right" type="submit">Register</button>
  </Form>
</template>

<script>
import DateTimePicker from '../Form/DateTimePicker.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import Map from '../Map/Map.vue'
import MapMarker from '../Map/MapMarker.vue'

export default {
  components: { FormGroup, FormRow, DateTimePicker, TextInput, Map, MapMarker },
  data: () => {
    return {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      firstName: null,
      lastName: null,
      dateOfBirth: null,
      pid: null,
      phoneNumber: null,
      lat: null,
      lng: null,
      state: null,
      city: null,
      streetName: null,
      streetNumber: null,
      
      showErrorMessage: false,
      mounted: false,
    }
  },
  methods: {
    onMapClick(e) {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
    },
    onSubmit(e) {
      e.preventDefault();
      this.showErrorMessage = true;
    }
  }
}
</script>

<style>

</style>