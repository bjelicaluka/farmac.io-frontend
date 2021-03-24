<template>
  <card :title="'Edit profile'" :description="'Uptade profile information'">
    <Form @submit="submitTest($event)">
      <form-group :title="'Test form group'">
        <form-row>
          <div class="col-6">
            <date-time-picker
              v-model="date"
              :isValid="!!date"
              :showErrorMessage="showErrorMessage"
              label="Date Time Picker Example"
              errorMessage="Invalid date time."
              type="datetime"
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
        </form-row>
        <form-row>
          <div class="col-lg-3 col-md-6 col-sm-3">
            <select-option-input
              label="Select you favourite food"
              v-model="value"
              :isValid="!!value"
              :options="options"
              :showErrorMessage="showErrorMessage"
              errorMessage="NESTOO"
            />
          </div>
        </form-row>
      </form-group>
      <button class="btn btn-primary pull-right" type="submit"> Register </button>
    </Form>
  </card>
  
</template>

<script>
import DateTimePicker from '../Form/DateTimePicker.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import SelectOptionInput from '../Form/SelectOptionInput.vue'
import TextInput from '../Form/TextInput.vue'
export default {
  components: { FormGroup, FormRow, DateTimePicker, TextInput, SelectOptionInput },

}
</script>

<style>

</style>