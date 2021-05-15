<template>
    <Form @submit="onSubmit($event)">
        <FormGroup>
            <PharmacyOrderForm
                :isEdit=true
                :disabled=true
                :existingPharmacyOrder="existingPharmacyOrder"
            />
        </FormGroup>

        <FormGroup>
            <FormRow>
                <div class="col-12">
                    <NumberInput
                        label="Delivery deadline time"
                        v-model="offer.deliveryDeadline"
                        :isValid="offer.deliveryDeadline > 0"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="Delivery deadline time must be at least 1h."
                        :min=1
                        :max=999
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
                        :max=9999999999
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

import { mapActions, mapGetters } from 'vuex'
import { getAccountIdFromToken } from '../../utils/token'
import toastr from 'toastr'

const initialOffer = {
    deliveryDeadline: 1,
    totalPrice: 0
}

export default {
    components: {
        PharmacyOrderForm,
        Form,
        FormGroup,
        FormRow,
        NumberInput,
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
        }

    },

    onSubmit(e) {
        e.preventDefault();
        if(!this.isEdit) {
            this.addOfferFromSupplier({
                supplierId: getAccountIdFromToken(),
                totalPrice: this.offer.totalPrice,
                deliveryDeadline: this.offer.deliveryDeadline,
                pharmacyOrderId: this.existingPharmacyOrder.id
            });
        } else {
            this.updateOfferFromSupplier({
                id: this.offer.id,
                supplierId: this.offer.supplierId,
                totalPrice: this.offer.totalPrice,
                deliveryDeadline: this.offer.deliveryDeadline
            });
        }
    }

  }

}
</script>

<style>

</style>
