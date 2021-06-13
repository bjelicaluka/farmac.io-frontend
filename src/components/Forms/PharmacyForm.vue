<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Pharmacy Info'">
      <form-row>
        <div class="col-12">
          <text-input
            label="Name"
            v-model="pharmacy.name"
            :isValid="!!pharmacy.name"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid name."
          />
        </div>
      </form-row>
      <form-row>
        <div class="col-12">
          <text-input
            label="Description"
            v-model="pharmacy.description"
            :isValid="!!pharmacy.description"
            :showErrorMessage="showErrorMessage"
            errorMessage="Please insert valid description."
          />
        </div>
      </form-row>
    </form-group>

    <AddressFormGroup
      :address="pharmacy.address"
      :isEdit="isEdit"
      :showErrorMessage="showErrorMessage"
      :modalBoxId="'pharmacyModal'"
    />

    <Button @click="showErrorMessage = true" class="btn btn-primary pull-right" type="submit">{{isEdit ? 'Update' : 'Create'}}</button>
  </Form>
</template>

<script>
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import { validateText } from '../../utils/validation'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import AddressFormGroup from '../FormGroups/AddressFormGroup.vue'

const initialPharmacy = {
  name: null,
  description: null,
  address: {
    lat: null,
    lng: null,
    state: null,
    city: null,
    streetName: null,
    streetNumber: null,
  }
}

export default {
  components: { Form, FormGroup, FormRow, TextInput, AddressFormGroup },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    existingPharmacy: {
      type: Object
    }
  },
  data: () => {
    return {
      pharmacy: {...initialPharmacy},
      showErrorMessage: false
    }
  },

  computed: {
      ...mapGetters({result: 'pharmacies/getResult'})
  },

  watch: {
    result({label, ok, message}) {
      if(label !== 'add' && label !== 'update') {
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
    existingPharmacy() {
      this.setEdit();
    }
  },

  methods: {
    ...mapActions({
      addPharmacy: 'pharmacies/addPharmacy',
      updatePharmacy: 'pharmacies/updatePharmacy'
    }),

    onSubmit(e) {
      e.preventDefault();
      this.isEdit ? this.updatePharmacy(this.pharmacy) : this.addPharmacy(this.pharmacy);
    },

    validateText(text) {
      return validateText(text);
    },
    setEdit() {
      if(!this.isEdit) {
        this.pharmacy = {...initialPharmacy};
        this.pharmacy.address = {...initialPharmacy.address}
        return;
      }

      if(this.existingPharmacy) {
        this.pharmacy = {...this.existingPharmacy};
        this.pharmacy.address = {...this.existingPharmacy.address}
      }
    },
  },

  mounted() {
    this.setEdit();
  },
  
}
</script>

<style>

</style>