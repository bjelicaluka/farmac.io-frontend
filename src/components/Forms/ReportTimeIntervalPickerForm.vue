<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Pharmacy Reports'">
      <form-row>
        <SelectOptionInput
          label="Interval Type"
          class="ml-auto mr-auto"
          v-model="intervalType"
          :options="intervalTypeOptions"
        />
      </form-row>
      <form-row>
        <div class="col-4">
          <Button 
            class="btn btn-sm pull-right" 
            type="button"
            @click="handlePrevious"
          >
            Previous
          </Button>
        </div>
        <div class="col-4 text-center">
          <h3 class="mt-0">
            <small>
              {{from.format('ll')}} - {{to.format('ll')}}
            </small>
          </h3>
        </div>
        <div class="col-4">
          <Button 
            class="btn btn-sm" 
            type="button"
            @click="handleNext"
          >
            Next
          </Button>
        </div>
      </form-row>
    </form-group>
    <Button class="btn btn-primary pull-right" type="submit">Generate</Button>
  </Form>
</template>

<script>
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import { mapActions } from 'vuex'
import SelectOptionInput from '../Form/SelectOptionInput.vue'
import Button from '../Form/Button.vue'
import moment from 'moment'

export default {

  components: { Form, FormGroup, FormRow, SelectOptionInput, Button, },
  
  props: {
    pharmacyId: {
      type: String
    },
  },
  
  data: () => {
    return {
      from: moment().startOf('month'),
      to: moment().endOf('month'),
      intervalType: 'month',
      intervalTypeOptions: [
        {
          label: 'Monthly',
          value: 'month'
        },
        {
          label: 'Quarterly',
          value: 'quarter'
        },
        {
          label: 'Yearly',
          value: 'year'
        },
      ]
    }
  },

  watch: {
    intervalType() {
      this.from = moment().startOf(this.intervalType);
      this.to = moment().endOf(this.intervalType);
      this.$emit('intervalTypeChange', this.intervalType);
    },
  },

  mounted() {
    this.$emit('intervalTypeChange', this.intervalType);
  },

  methods: {
    ...mapActions({
      fetchExaminationReports: 'pharmacyReports/fetchExaminationReports',
      fetchMedicineConsumptionReports: 'pharmacyReports/fetchMedicineConsumptionReports',
      fetchPharmacyIncomeReports: 'pharmacyReports/fetchPharmacyIncomeReports',
    }),

    onSubmit(e) {
      e.preventDefault();
      this.fetchExaminationReports({pharmacyId: this.pharmacyId, timePeriod: {from: this.from.format(), to: this.to.format()}});
      this.fetchMedicineConsumptionReports({pharmacyId: this.pharmacyId, timePeriod: {from: this.from.format(), to: this.to.format()}});
      this.fetchPharmacyIncomeReports({pharmacyId: this.pharmacyId, timePeriod: {from: this.from.format(), to: this.to.format()}});
    },
    handleNext() {
      this.from = moment(this.from.add(1, this.intervalType));
      this.to = moment(this.to.add(1, this.intervalType));
    },
    handlePrevious() {
      this.from = moment(this.from.subtract(1, this.intervalType));
      this.to = moment(this.to.subtract(1, this.intervalType));
    },
  },

}
</script>

<style>

</style>