<template>
  <Form @submit="onSubmit">
    <form-group :title="'Account Info'">
      <form-row>
        <div class="col-6">
          <text-input
            label="Username"
            v-model="account.username"
            :isValid="validateText(account.username)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid username."
            :disabled="isEdit"
          />
        </div>
        <div class="col-6">
          <text-input
            label="Email"
            v-model="account.email"
            :isValid="validateEmail(account.email)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid email."
            :disabled="isEdit"
          />
        </div>
      </form-row>
      <form-row v-if="!isEdit">
        <div class="col-6">
          <text-input
            label="Password"
            v-model="account.password"
            :isValid="validatePassword(account.password)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Password must have at least 8 characters, special character and a number."
            type="password"
          />
        </div>
        <div class="col-6">
          <text-input
            label="Confirm Password"
            v-model="account.confirmPassword"
            :isValid="account.confirmPassword === account.password"
            :showErrorMessage="showErrorMessage"
            errorMessage="Passwords don't match."
            type="password"
          />
        </div>
      </form-row>
    </form-group>
    <form-group :title="'Personal Info'">
      <form-row>
        <div class="col-4">
          <text-input
            label="First Name"
            v-model="user.firstName"
            :isValid="validateText(user.firstName)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid name."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Last Name"
            v-model="user.lastName"
            :isValid="validateText(user.lastName)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid surname."
          />
        </div>
        <div class="col-4">
          <date-time-picker
            v-model="user.dateOfBirth"
            :isValid="validateDateOfBirth()"
            :showErrorMessage="showErrorMessage"
            label="Date of Birth"
            errorMessage="You must be at least 13 years old."
            type="date"
            id="patientDateOfBirth"
          />
        </div>
      </form-row>
      <form-row>
        <div class="col-7">
          <text-input
            label="PID"
            v-model="user.pid"
            :isValid="!!user.pid && user.pid.length === 13 && !isNaN(user.pid)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid PID."
          />
        </div>
        <div class="col-5">
          <text-input
            label="Phone Number"
            v-model="user.phoneNumber"
            :isValid="!!(user.phoneNumber) && !isNaN(user.phoneNumber)"
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
            v-model="user.address.state"
            :isValid="validateText(user.address.state)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid state."
          />
        </div>
        <div class="col-3">
          <text-input
            label="City"
            v-model="user.address.city"
            :isValid="validateText(user.address.city)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid city."
          />
        </div>
        <div class="col-4">
          <text-input
            label="Street Name"
            v-model="user.address.streetName"
            :isValid="validateText(user.address.streetName)"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid street name."
          />
        </div>
        <div class="col-2">
          <text-input
            label="Number"
            v-model="user.address.streetNumber"
            :isValid="!!user.address.streetNumber"
            :showErrorMessage="showErrorMessage"
            errorMessage="Invalid street number."
          />
        </div>
      </form-row>
      <Map :height="250" @click="onMapClick($event)">
        <div slot="markers">
          <MapMarker :v-if="user.address.lat !== null && user.address.lng !== null" :lat="user.address.lat" :lng="user.address.lng">
            <div>
              <p class="text-dark">{{user.address.state}}</p>
              <p class="text-dark">{{user.address.city}}</p>
              <p class="text-dark">{{user.address.streetName}}</p>
              <p class="text-dark">{{user.address.streetNumber}}</p>
            </div>
          </MapMarker>
        </div>
      </Map>
      <InputErrorMessage
        :isValid="showErrorMessage ? !!user.address.lat && !!user.address.lng : true"
      >
        Please pick a location on the map.
      </InputErrorMessage>
    </form-group>
    <Button @click="showErrorMessage = true" type="submit">{{isEdit ? 'Update' : 'Register'}}</Button>

    <p v-if="!isEdit" class="text-right">
        <router-link to="/auth">Login page</router-link>
    </p>

  </Form>
</template>

<script>
import moment from 'moment';
import {mapActions} from 'vuex';
import DateTimePicker from '../Form/DateTimePicker.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import Form from '../Form/Form.vue'
import TextInput from '../Form/TextInput.vue'
import Map from '../Map/Map.vue'
import MapMarker from '../Map/MapMarker.vue'
import InputErrorMessage from '../Form/InputErrorMessage.vue'
import { validateText, validateEmail, validatePassword } from '../../utils/validation'
import Button from '../Form/Button.vue';

export default {
  components: { Form, FormGroup, FormRow, DateTimePicker, TextInput, Map, MapMarker, InputErrorMessage, Button },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    existingAccount: {
      type: Object
    },
    existingUser: {
      type: Object
    },
  },

  data: () => {
    return {
      account: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      user: {
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        pid: null,
        phoneNumber: null,
        address: {
          lat: null,
          lng: null,
          state: null,
          city: null,
          streetName: null,
          streetNumber: null,
        }
      },
      
      showErrorMessage: false,
    }
  },

  methods: {
    ...mapActions({
      addPatient: 'patient/addPatient',
      updatePatient: 'patient/updatePatient',
    }),
    onSubmit(e) {
      e.preventDefault();
      const patientObject = {
        account: {
          ...this.account
        },
        user: {
          ...this.user
        }
      };
      if(!this.isEdit) {
        this.addPatient(patientObject);
      } else {
        this.updatePatient({patientObject, id: this.existingAccount.id});
      }
    },
    onMapClick(e) {
      this.user.address.lat = e.latlng.lat;
      this.user.address.lng = e.latlng.lng;
    },
    validateText(text) {
      return validateText(text);
    },
    validateEmail(email) {
      return validateEmail(email);
    },
    validatePassword(password) {
      return validatePassword(password);
    },
    validateDateOfBirth() {
      return !!this.user.dateOfBirth && moment().diff(this.user.dateOfBirth, 'years', false) >= 13;
    }
  },

  mounted() {
    if(this.isEdit) {
      this.account = this.existingAccount;
      this.account.confirmPassword = this.existingAccount.password;
      this.user = this.existingUser;
      this.user.dateOfBirth = moment(this.existingUser.dateOfBirth).toDate();
    }
  }
}
</script>

<style>
</style>