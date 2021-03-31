<template>
  <div class="content">
    <div class="container-fluid">
      <card title="Map Test">
        <Map @click="onMapClick($event)">
          <div slot="markers">
            <MapMarker :position="[45.38361, 20.38194]">Hello</MapMarker>
          </div>
        </Map>
      </card>
      <card :title="'Edit profile'" :description="'Uptade profile information'">
        <Form @submit="submitTest($event)">
          <form-group :title="'Test form group'">
            <form-row>
              <div class="col-6">
                <DateTimePicker
                  v-model="date"
                  :isValid="!!date"
                  :showErrorMessage="showErrorMessage"
                  label="Date Time Picker Example"
                  errorMessage="Invalid date time."
                  type="datetime"
                  id="testDatePicker"
                />
              </div>
            </form-row>
            <form-row>
              <div class="col-5">
                <text-input 
                  label="Company"
                  v-model="company"
                  :isValid="!!company"
                  :showErrorMessage="showErrorMessage"
                  errorMessage="Lalapo error message."
                  type="text"
                />
              </div>
              <div class="col-7">
                <div class="form-group">
                  <label class="bmd-label-floating">Username</label>
                  <input type="text" class="form-control">
                </div>
              </div>
            </form-row>
            <form-row>
              <div class="col-12">
              <div class="form-group">
                <label class="bmd-label-floating">Email address</label>
                <input type="email" class="form-control">
              </div>
            </div>
            </form-row>
            <form-row>
              <div class="col-lg-3 col-md-6 col-sm-3">
                <SelectOptionInput
                  label="Select you favourite food"
                  v-model="value"
                  :isValid="!!value"
                  :options="options"
                  :showErrorMessage="showErrorMessage"
                  errorMessage="NESTOO"
                >
                </SelectOptionInput>
                Current value: {{value}}
              </div>
            </form-row>
          </form-group>
          <button class="btn btn-primary pull-right" type="submit"> Test </button>
        </Form>

        <Button
        type="button"
        className="btn btn-info"
        @click="toggleError"
        >
          Toggle showErrorMessage! .{{showErrorMessage}}
        </Button>

        <ButtonWithIcon
          type="button"
          className="btn btn-primary btn-round"
          iconName="favorite"
          @click="toggleIsValid"
        >
          Toggle isValid! {{isValid}}
        </ButtonWithIcon>
          </card>
        </div>

    <div class="container-fluid">
      <Card>
        <example/>
      </Card>
    </div>

    
    <Modal
      modalBoxId="addLocationModal"
      title="Add location modal"
    >
      <div slot="body">
        <p>Do you want add location {{location}}?</p>
      </div>

      <div slot="buttons">
        <OptionModalButtons @yes="onYes"/>
      </div>
    </Modal>

    <ModalOpener id="addLocationModalOpener" class="d-none" modalBoxId="addLocationModal" />

    <ButtonWithIcon
      type="button"
      className="btn btn-primary btn-round"
      iconName="favorite"
      @click="testJwt"
    >
      Test token
    </ButtonWithIcon>

  </div>
</template>

<script>
import Card from '../components/Card/Card.vue'
import Form from '../components/Form/Form.vue'
import FormGroup from '../components/Form/FormGroup.vue';
import FormRow from '../components/Form/FormRow.vue'
import Example from '../components/Table/Example.vue'
import Button from '../components/Form/Button.vue'
import ButtonWithIcon from '../components/Form/ButtonWithIcon.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import OptionModalButtons from '../components/Modal/OptionModalButtons.vue'
import TextInput from '../components/Form/TextInput.vue';
import DateTimePicker from '../components/Form/DateTimePicker.vue';
import Map from '../components/Map/Map.vue';
import MapMarker from '../components/Map/MapMarker.vue';
import {getRoleFromToken} from '../utils/localStorage'
import axios from "axios";

let selectOptions = [
  {
    value: 1,
    label: 'Palacinke'
  },
  {
    value: 2,
    label: 'Rostilj iz leskovac'
  },
  {
    value: 3,
    label: 'Pica'
  }
];

export default {
  data: function() {
    return {
      isValid: false,
      showErrorMessage: false,
      options: selectOptions,
      value: '',
      company: "",
      date: null,
      location: null
    }
  },
  name: 'Home',
  components: {
    Form,
    Card,
    FormRow,
    FormGroup,
    Example,
    Button,
    ButtonWithIcon,
    SelectOptionInput,
    Modal,
    ModalOpener,
    OptionModalButtons,
    TextInput,
    DateTimePicker,
    Map,
    MapMarker,
  },
  methods: {
    submitTest(e) {
      console.log(e);
      console.log(this.company)
      this.showErrorMessage = true;
      console.log("LALA " + this.date.format('lll'))
    },

    toggleError(e) {
      e.preventDefault();
      this.showErrorMessage = !this.showErrorMessage;
    },

    toggleIsValid(e) {
      e.preventDefault();
      this.isValid = !this.isValid;
    },
    
    onYes(e) {
      console.log("CAOOO");
    },
    onMapClick(e) {
      console.log(`Location coordinates: lat=${e.latlng.lat},lng=${e.latlng.lng}`);
      this.location = {lat: e.latlng.lat, lng: e.latlng.lng};
      // toggle modal
      document.getElementById('addLocationModalOpener').click();
    },

    testJwt() {
      const token = getRoleFromToken();
      axios.get('/weatherforecast/patientOnly')
      .then(r => console.log('dobro'))
      .catch(e => console.log('lose'));
    }
  },
  watch: {
    date(v) {
      console.log(v.format('lll'));
    }
  }
}
</script>
