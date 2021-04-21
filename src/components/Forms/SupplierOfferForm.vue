<template>
    <Form @submit="onSubmit($event)">
        <FormGroup>
            <FormRow>
                <div class="col-12">
                    <DateTimePicker
                        label="Delivery date"
                        v-model="offer.deliveryDeadline"
                        :isValid="validateDeliveryDate(offer.deliveryDeadline)"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Delivery date must be provided and at least 1 hour from now."
                        type="datetime"
                        id="deliveryDate"
                    />
                </div>
            </FormRow>

            <FormRow>
                <div class="col-12">
                    <NumberInput
                        label="Total price"
                        v-model="offer.totalPrice"
                        :isValid="offer.totalPrice > 0"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Total price must be greater than 0."
                        :min=1
                        :max=99999999999999
                    />
                </div>
            </FormRow>
        </FormGroup>

        <Button @click="showErrorMessage = true" class="pull-right" type="submit">Update</Button>
    </Form>

</template>

<script>
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import NumberInput from '../Form/NumberInput.vue'
import Button from '../Form/Button.vue'
import DateTimePicker from '../Form/DateTimePicker.vue'

import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'

const initialOffer = {
    deliveryDeadline: null,
    totalPrice: 0
}

export default {
    components: {
        Form,
        FormGroup,
        FormRow,
        NumberInput,
        DateTimePicker,
        Button
    },

    props: {
       existingSupplierOffer: {
           type: Object
       }
    },
    data: () => {
        return {
            offer: {...initialOffer},
            showErrorMessage: false
        }
    },

    computed: {
        ...mapGetters({result: 'supplierOffers/getResult'})
    },

    watch: {
        result({ok, label, message}) {
            if(label !== 'add' && label !== 'update')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        },

        existingSupplierOffer() {
            this.offer = {...this.existingSupplierOffer};
            this.offer.deliveryDeadline = moment(this.existingSupplierOffer.deliveryDeadline).toDate()
        }
    },

  methods: {
    ...mapActions({
        updateOfferFromSupplier: 'supplierOffers/updateOfferFromSupplier'
    }),

    onSubmit(e) {
        e.preventDefault();

        this.updateOfferFromSupplier({
            id: this.offer.id,
            supplierId: this.offer.supplierId,
            totalPrice: this.offer.totalPrice,
            deliveryDeadline: this.offer.deliveryDeadline.format()
        });
    },

    validateDeliveryDate(delivery) {
        const oneHourFromNow = moment().add(moment.duration(1, 'hours'));

        return delivery > oneHourFromNow;
    }

  }

}
</script>

<style>

</style>