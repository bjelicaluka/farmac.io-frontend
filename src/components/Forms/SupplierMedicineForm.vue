<template>
  <Form @submit="onSubmit($event)">
    <FormRow>

      <SelectOptionInput
        label="Select Medicine"
        v-model="supplierMedicine.medicineId"
        :options="medicines"
        class="col-8"
        :isValid="!!supplierMedicine.medicineId"
        :showErrorMessage="showErrorMessage"
        errorMessage="Please select a medicine."
        :disabled="isEdit"
      />

      <NumberInput
        label="Quantity"
        v-model="supplierMedicine.quantity"
        :min="0"
        :max="9999"
        class="col-4"
        :isValid="supplierMedicine.quantity >= 0 && supplierMedicine.quantity <= 9999"
        :showErrorMessage="showErrorMessage"
        errorMessage="Please pick a number between 0 and 9999."
      />
    </FormRow>

    <Button @click="showErrorMessage = true" class="btn btn-small btn-sm pull-right" type="submit">Add To Stock</Button>
  </Form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Form from '../Form/Form.vue'
import Button from '../Form/Button.vue';
import SelectOptionInput from '../Form/SelectOptionInput.vue';
import NumberInput from '../Form/NumberInput.vue';
import FormRow from '../Form/FormRow.vue';

import toastr from 'toastr'
import { getAccountIdFromToken } from '../../utils/token'

const initialSupplierMedicine = {
    medicineId: null,
    quantity: 0
}

export default {
  components: { Form, Button, SelectOptionInput, NumberInput, FormRow },

  props: {
      isEdit: {
          type: Boolean,
          default: false
      },

      existingSupplierMedicine: {
          type:Object
      }
  },

  data: () => {
    return {
      supplierMedicine: {...initialSupplierMedicine},
      supplierId: null,
      medicines: [],
      showErrorMessage: false,
    }
  },

  computed: {
    ...mapGetters({
      getMedicines: 'medicines/getMedicineOptions',
      result: 'supplierStock/getResult'
    })
  },

  watch: {
    getMedicines(medicines) {
      this.medicines = medicines.map(m => { return { value: m.id, label: m.name} });
    },

    result({label, ok, message}) {
      if(label !== 'add' && label != 'update') {
        return;
      }

      if(ok) {
        toastr.success(message);
      } else {
        toastr.error(message);
      }
    },

    isEdit() {
      this.setEdit();
    },

    existingSupplierMedicine() {
      this.setEdit();
    },
  },

  methods: {
    ...mapActions({
      addMedicineToStock: 'supplierStock/addMedicineToSupplierStock',
      updateMedicineFromStock: 'supplierStock/updateMedicineFromSupplierStock',
      fetchMedicines: 'medicines/fetchMedicineOptions'
    }),

     setEdit() {
      if(!this.isEdit) {
        this.supplierMedicine = {...initialSupplierMedicine};
        return;
      }
      
      if(this.existingSupplierMedicine) {
        this.supplierMedicine = this.existingSupplierMedicine;
      }
    },

    onSubmit(e) {
      e.preventDefault();

      if(!this.isEdit) {
        this.addMedicineToStock({
            medicineId: this.supplierMedicine.medicineId,
            supplierId: this.supplierId,
            quantity: this.supplierMedicine.quantity
        });
      } else {
        this.updateMedicineFromStock({
            id: this.supplierMedicine.id,
            supplierId: this.supplierId,
            quantity: this.supplierMedicine.quantity
        })
      }
    },
  },

  mounted() {
    this.supplierId = getAccountIdFromToken();
    this.fetchMedicines();
  }
}
</script>

<style>

</style>