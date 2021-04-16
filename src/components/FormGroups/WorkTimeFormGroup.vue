<template>
  <form-group :title="'Work Time'">
    <form-row>
      <div class="col-6">
        <date-time-picker
          v-model="workTime.from"
          :isValid="!!workTime.from"
          :showErrorMessage="showErrorMessage"
          label="From"
          errorMessage="Please choose start of working hours."
          type="time"
          id="workTimeFrom"
        />
      </div>
      <div class="col-6">
        <date-time-picker
          v-model="workTime.to"
          :isValid="!!workTime.to"
          :showErrorMessage="showErrorMessage"
          label="To"
          errorMessage="Please choose end of working hours."
          type="time"
          id="workTimeTo"
        />
      </div>
    </form-row>
    <InputErrorMessage
      :isValid="showErrorMessage ? validateWorkHours() : true"
    >
      Maximum number of working hours is 8 and minimum is 1.
    </InputErrorMessage>
  </form-group>
</template>

<script>
import moment from 'moment';
import DateTimePicker from '../Form/DateTimePicker.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import InputErrorMessage from '../Form/InputErrorMessage.vue';

export default {
  components: { FormGroup, FormRow, DateTimePicker, InputErrorMessage },
  props: {
    workTime: {
      type: Object,
      default: () => {
        return {
          from: null,
          to: null
        }
      }
    },
    showErrorMessage: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    validateWorkHours() {
      if(!this.workTime.from || !this.workTime.to) return false;
      const duration = moment.duration(this.workTime.to.diff(this.workTime.from));
      const workHours = duration.asHours();
      return workHours >= 1 && workHours <= 8;
    }
  }
}
</script>

<style>

</style>