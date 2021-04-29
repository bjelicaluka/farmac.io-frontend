<template>
  <Form @submit="onSubmit($event)">
    <form-group :title="'Promotion Info'">
      <form-row>
        <div class="col-6">
          <date-time-picker
            v-model="promotion.from"
            :isValid="!!promotion.from"
            :showErrorMessage="showErrorMessage"
            label="Promotion Start Date"
            errorMessage="Invalid start date."
            type="date"
            id="promotionStartDate"
          />
        </div>
        <div class="col-6">
          <date-time-picker
            v-model="promotion.to"
            :isValid="!!promotion.to"
            :showErrorMessage="showErrorMessage"
            label="Promotion End Date"
            errorMessage="Invalid end date."
            type="date"
            id="promotionEndDate"
          />
        </div>
      </form-row>
      <InputErrorMessage
        :isValid="showErrorMessage ? validateDates() : true"
      >
        Please provide valid time period.
      </InputErrorMessage>
      <form-row>
        <div class="col-12">
          <number-input
            label="Discount in Percents"
            v-model="promotion.discount"
            :min="0"
            :max="100"
            :isValid="validateDiscount()"
            :showErrorMessage="showErrorMessage"
            errorMessage="Discount must be a whole number between 1 and 100."
          />
        </div>
      </form-row>
    </form-group>
    <Button @click="showErrorMessage = true" class="btn btn-primary pull-right" type="submit">{{isEdit ? 'Update' : 'Create'}}</button>
  </Form>
</template>

<script>
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import DateTimePicker from '../Form/DateTimePicker.vue'
import NumberInput from '../Form/NumberInput.vue'

import moment from 'moment'
import InputErrorMessage from '../Form/InputErrorMessage.vue'

const initialPromotion = {
  from: null,
  to: null,
  discount: null,
};

export default {
  components: { Form, FormGroup, FormRow, DateTimePicker, NumberInput, InputErrorMessage, },
  props: {
    pharmacyId: {
      type: String
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    existingPromotion: {}
  },
  data: () => {
    return {
      promotion: {...initialPromotion},
      showErrorMessage: false
    }
  },

  computed: {
      ...mapGetters({result: 'pharmacyPromotions/getResult'})
  },

  watch: {
      isEdit() {
        this.setEdit();
      },
      existingPromotion() {
        this.setEdit();
      },
      result({ok, label, message}) {
        if(label !== 'add' && label !== 'update'){
          return;
        }
        if(ok) {
            toastr.success(message);
        } else {
            toastr.error(message);
        }
      }
  },

  methods: {
    ...mapActions({
      addPharmacyPromotion: 'pharmacyPromotions/addPharmacyPromotion',
      updatePharmacyPromotion: 'pharmacyPromotions/updatePharmacyPromotion'
    }),

    onSubmit(e) {
      e.preventDefault();
      if(this.isEdit) {
        this.updatePharmacyPromotion({
          ...this.promotion,
          from: moment(this.promotion.from).format(),
          to: moment(this.promotion.to).format(),
          pharmacyId: this.pharmacyId,
          id: this.existingPromotion.id
        });
      } else {
        this.addPharmacyPromotion({
          ...this.promotion,
          from: moment(this.promotion.from).format(),
          to: moment(this.promotion.to).format(),
          pharmacyId: this.pharmacyId,
        });
      }
    },

    setEdit() {
      if(this.isEdit && this.existingPromotion) {
        this.promotion = {...this.existingPromotion};
        this.promotion.to = moment(this.existingPromotion.to);
        this.promotion.from = moment(this.existingPromotion.from);
      } else {
        this.promotion = {...initialPromotion};
      }
    },

    validateDiscount() {
      const d = this.promotion.discount;
      return !isNaN(d) && d <= 100 && d >= 1;
    },

    validateDates() {
      return moment(this.promotion.to).isAfter(this.promotion.from);
    }
  },

}
</script>

<style>

</style>