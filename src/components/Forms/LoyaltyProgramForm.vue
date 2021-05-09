<template>
    <Form @submit="onSubmit">
        <FormGroup>

            <FormRow>
                <div class='col-12'>
                    <TextInput
                        label="Name"
                        v-model="loyaltyProgram.name"
                        :isValid="!!loyaltyProgram.name"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Please insert loyalty program name."
                    />
                </div>
            </FormRow>

            <FormRow>
                <div class='col-6'>
                    <NumberInput
                        label="Minimum points"
                        v-model="loyaltyProgram.minPoints"
                        :isValid="!isNaN(loyaltyProgram.minPoints)"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Minimum points must be greater or equal to 0."
                        :min="0"
                        :max="99999"
                    />
                </div>

                <div class='col-6'>
                    <NumberInput
                        label="Discount"
                        v-model="loyaltyProgram.discount"
                        :isValid="!isNaN(loyaltyProgram.discount)"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Discount must be between 0 and 100."
                        :min="0"
                        :max="100"
                    />
                </div>
            </FormRow>

        </FormGroup>

    <Button class="pull-right" @click="showErrorMessage = true" type="submit">{{isEdit ? 'Update' : 'Register'}}</Button>

  </Form>
</template>

<script>

import Form from '../Form/Form'
import FormGroup from '../Form/FormGroup'
import FormRow from '../Form/FormRow'
import TextInput from '../Form/TextInput'
import NumberInput from '../Form/NumberInput'
import Button from '../Form/Button.vue';

import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex';

const initialLoyaltyProgram = {
  name: null,
  minPoints: 0,
  discount: 0
};

export default {
  components: {
      Form,
      FormGroup,
      FormRow,
      TextInput,
      NumberInput,
      Button
    },
  
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    existingLoyaltyProgram: {
      type: Object
    }
  },

  data: () => {
    return {
      loyaltyProgram: {...initialLoyaltyProgram},
      
      showErrorMessage: false,
    }
  },

  computed: {
    ...mapGetters({
        result: 'loyaltyPrograms/getResult'
      }),
  },

  watch: {
    result({label, ok, message}) {
      if(label !== 'add' && label !== 'update')
        return;

      if(ok) {
        toastr.success(message);
      } else {
        toastr.error(message);
      }
    },

    isEdit() {
      this.setEdit();
    },
    existingLoyaltyProgram() {
      this.setEdit();
    }
  },

  methods: {
    ...mapActions({
      addLoyaltyProgram: 'loyaltyPrograms/addLoyaltyProgram',
      updateLoyaltyProgram: 'loyaltyPrograms/updateLoyaltyProgram'
    }),

    setEdit() {
      if(!this.isEdit) {
        this.loyaltyProgram = {...initialLoyaltyProgram};
        return;
      }
      
      if(this.existingLoyaltyProgram) {
        this.loyaltyProgram = this.existingLoyaltyProgram;
      }
    },

    onSubmit(e) {
      e.preventDefault();

      if(!this.isEdit) {
        this.addLoyaltyProgram(this.loyaltyProgram);
      } else {
        this.updateLoyaltyProgram(this.loyaltyProgram);
      }
    }
  }
}
</script>

<style>
</style>