<template>
    <Form @submit="onSubmit($event)">
        <FormGroup title="Order">
            <PharmacyOrderForm
                :isEdit=true
                :disabled=true
                :existingPharmacyOrder="existingPharmacyOrder"
            />
        </FormGroup>

        <FormGroup>
            <FormRow>
                <div class="col-12">
                    <DateTimePicker
                        label="Delivery date"
                        v-model="offer.deliveryDeadline"
                        :isValid="validateDeliveryDate()"
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

        <Button @click="showErrorMessage = true" class="pull-right" type="submit">{{ isEdit ? 'Update' : 'Create' }}</Button>
    </Form>

</template>

<script>
import PharmacyOrderForm from '../Forms/PharmacyOrderForm'
import Form from '../Form/Form.vue'
import FormGroup from '../Form/FormGroup.vue'
import FormRow from '../Form/FormRow.vue'
import NumberInput from '../Form/NumberInput.vue'
import Button from '../Form/Button.vue'
import DateTimePicker from '../Form/DateTimePicker.vue'

import { mapActions, mapGetters } from 'vuex'
import { getAccountIdFromToken } from '../../utils/token'
import toastr from 'toastr'
import moment from 'moment'

const initialOffer = {
    deliveryDeadline: null,
    totalPrice: 0
}

export default {
    components: {
        PharmacyOrderForm,
        Form,
        FormGroup,
        FormRow,
        NumberInput,
        DateTimePicker,
        Button
    },

    props: {
        isEdit: {
            type: Boolean,
            default: false
        },

        existingSupplierOffer: {
           type: Object
        },

        existingPharmacyOrder: {
           type: Object,
           default: null
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

        isEdit() {
            this.setEdit();
        },

        existingSupplierOffer() {
            this.setEdit();
        }
    },

  methods: {
    ...mapActions({
        updateOfferFromSupplier: 'supplierOffers/updateOfferFromSupplier',
        addOfferFromSupplier: 'supplierOffers/addOfferFromSupplier'
    }),

    setEdit() {
        if(!this.isEdit) {
            this.offer = {...initialOffer};
            return;
        }

        if(this.existingSupplierOffer) {
            this.offer = {...this.existingSupplierOffer};
            this.offer.deliveryDeadline = moment(this.existingSupplierOffer.deliveryDeadline).toDate()
        }

    },

    onSubmit(e) {
        e.preventDefault();

        if(!this.isEdit) {
            this.addOfferFromSupplier({
                supplierId: getAccountIdFromToken(),
                totalPrice: this.offer.totalPrice,
                deliveryDeadline: this.offer.deliveryDeadline.format(),
                pharmacyOrderId: this.existingPharmacyOrder.id
            });
        } else {
            this.updateOfferFromSupplier({
                id: this.offer.id,
                supplierId: this.offer.supplierId,
                totalPrice: this.offer.totalPrice,
                deliveryDeadline: this.offer.deliveryDeadline.format()
            });
        }
    },

    validateDeliveryDate() {
        const oneHourFromNow = moment().add(moment.duration(1, 'hours'));

        return this.offer.deliveryDeadline > oneHourFromNow;
    }

  }

}
</script>

<style>

</style>