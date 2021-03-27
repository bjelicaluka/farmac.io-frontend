<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Work Time'">
      <form-row>
        <div class="col-6">
          <date-time-picker
            v-model="from"
            :isValid="!!from"
            :showErrorMessage="showErrorMessage"
            label="From"
            errorMessage="Please choose start of working hours."
            type="time"
            id="dermatologistWorkTimeFrom"
          />
        </div>
        <div class="col-6">
          <date-time-picker
            v-model="to"
            :isValid="!!to"
            :showErrorMessage="showErrorMessage"
            label="To"
            errorMessage="Please choose end of working hours."
            type="time"
            id="dermatologistWorkTimeTo"
          />
        </div>
      </form-row>
      <InputErrorMessage
        :isValid="showErrorMessage ? validateDates() : true"
      >
        Maximum number of working hours is 8 and minimum is 1.
      </InputErrorMessage>
    </form-group>
    <Button @click="showErrorMessage = true" type="submit">Add To Pharmacy</Button>
  </Form>
</template>

<script>
import moment from 'moment';
import {mapActions, mapGetters} from 'vuex';
import DateTimePicker from '../Form/DateTimePicker.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import Form from '../Form/Form.vue'
import Button from '../Form/Button.vue';
import toastr from 'toastr';
import InputErrorMessage from '../Form/InputErrorMessage.vue';

export default {
  components: { FormGroup, FormRow, DateTimePicker, Form, Button, InputErrorMessage },
  props: {
    dermatologist: {},
    pharmacyId: {}
  },
  data: () => {
    return {
      from: null,
      to: null,
      
      showErrorMessage: false,
    }
  },
  computed: {
    ...mapGetters({
      result: 'dermatologist/getResult'
    })
  },
  watch: {
    result({ok, message}) {
      if(ok) {
        toastr.success(message);
      } else {
        toastr.error(message);
      }
    },
  },
  methods: {
    ...mapActions({
      addDermatologistToPharmacy: 'dermatologist/addDermatologistToPharmacy',
    }),
    onSubmit(e) {
      e.preventDefault();
      this.showErrorMessage = true;
      this.addDermatologistToPharmacy({dermatologistId: this.dermatologist.id, pharmacyId: this.pharmacyId, workTime: {from: this.from, to: this.to}});
    },
    validateDates() {
      if(!this.from || !this.to) return;
      const duration = moment.duration(this.to.diff(this.from));
      const workHours = duration.asHours();
      return workHours >= 0 && workHours <= 8;
    }
  }
}
</script>

<style>

</style>