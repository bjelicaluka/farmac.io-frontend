<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Appointment Info'">
      <form-row>
        <div class="col-12">
          <date-time-picker
            v-model="appointment.dateTime"
            :isValid="!!appointment.dateTime"
            :showErrorMessage="showErrorMessage"
            label="Appointment Date"
            errorMessage="Invalid appointment date-time."
            type="datetime"
            id="dermatologistAppointmentDefinitionDate"
          />
        </div>
      </form-row>
      <form-row>
        <div class="col-6">
          <text-input
            label="Duration in Minutes"
            v-model="appointment.duration"
            :isValid="validateDuration()"
            :showErrorMessage="showErrorMessage"
            errorMessage="Duration must be a whole number between 1 and 480."
          />
        </div>
        <div class="col-6">
          <text-input
            label="Price (optional)"
            v-model="appointment.price"
            :isValid="validatePrice()"
            :showErrorMessage="showErrorMessage"
            errorMessage="Price must be a valid number between 0 and 999999."
          />
        </div>
      </form-row>
    </form-group>
    <Button @click="showErrorMessage = true" class="btn btn-primary pull-right" type="submit">Create</button>
  </Form>
</template>

<script>
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import DateTimePicker from '../Form/DateTimePicker.vue'

export default {
  components: { Form, FormGroup, FormRow, TextInput, DateTimePicker, },
  props: {
    dermatologistId: {
      type: String
    },
    pharmacistId: {
      type: String
    },
    pharmacyId: {
      type: String
    }
  },
  data: () => {
    return {
      appointment: {
        dateTime: null,
        duration: null,
        price: null,
      },
      showErrorMessage: false
    }
  },

  computed: {
      ...mapGetters({result: 'appointments/getResult'})
  },

  watch: {
      result({ok, label, message}) {
        if(label !== 'addDermatologist'){
          return;
        }
        if(ok && label === 'addDermatologist') {
            toastr.success(message);
        } else {
            toastr.error(message);
        }
      }
  },

  methods: {
    ...mapActions({addDermatologistAppointment: 'appointments/addDermatologistAppointment'}),

    onSubmit(e) {
      e.preventDefault();
      if(this.dermatologistId) {
        this.addDermatologistAppointment({
          ...this.appointment,
          medicalStaffId: this.dermatologistId,
          pharmacyId: this.pharmacyId,
        })
      }
      if(this.pharmacistId) {
        // Joksilon
      }
    },
    validateDuration() {
      const d = this.appointment.duration;
      return !isNaN(d) && d <= 480 && d >= 1;
    },
    validatePrice() {
      const p = this.appointment.price;
      if(p !== null) {
        return !isNaN(p) && p > 0 && p <= 999999;
      }
      return true;
    }
  },

}
</script>

<style>

</style>