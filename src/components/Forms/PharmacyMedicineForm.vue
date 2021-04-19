<template>
  <Form @submit="onSubmit($event)">
    <FormRow>
      <SelectOptionInput
        label="Select Medicine"
        :showLabel="false"
        v-model="selectedMedicine"
        :options="medicines"
        class="col-8"
        :isValid="!!selectedMedicine"
        :showErrorMessage="showErrorMessage"
        errorMessage="Please select a medicine."
      />
      <NumberInput
        v-model="quantity"
        :min="0"
        :max="9999"
        class="col-4"
        :isValid="quantity > 0 && quantity <= 9999"
        :showErrorMessage="showErrorMessage"
        errorMessage="Please pick a number between 0 and 9999."
      />
    </FormRow>
    <Button @click="showErrorMessage = true" type="submit">Add To Pharmacy</Button>
  </Form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Form from '../Form/Form.vue'
import Button from '../Form/Button.vue';
import SelectOptionInput from '../Form/SelectOptionInput.vue';
import NumberInput from '../Form/NumberInput.vue';
import FormRow from '../Form/FormRow.vue';
import toastr from 'toastr'

export default {
  components: { Form, Button, SelectOptionInput, NumberInput, FormRow },
  props: {
    pharmacyId: {}
  },
  data: () => {
    return {
      selectedMedicine: null,
      quantity: 0,
      medicines: [],
      showErrorMessage: false,
    }
  },
  computed: {
    ...mapGetters({
      getMedicines: 'medicines/getMedicineOptions',
      result: 'pharmacies/getResult'
    })
  },
  watch: {
    getMedicines(medicines) {
      this.medicines = medicines.map(m => { return { value: m.id, label: m.name} });
    },
    result({label, ok, message}) {
      if(label !== 'addMedicineToPharmacy') {
        return;
      }
      if(ok) {
        toastr.success(message);
      } else {
        toastr.error(message);
      }
    },
  },
  methods: {
    ...mapActions({
      addMedicineToPharmacy: 'pharmacies/addMedicineToPharmacy',
      fetchMedicines: 'medicines/fetchMedicineOptions'
    }),
    onSubmit(e) {
      e.preventDefault();
      this.showErrorMessage = true;
      this.addMedicineToPharmacy({medicineId: this.selectedMedicine, pharmacyId: this.pharmacyId, quantity: this.quantity});
    },
  },
  mounted() {
    this.fetchMedicines();
  }
}
</script>

<style>

</style>