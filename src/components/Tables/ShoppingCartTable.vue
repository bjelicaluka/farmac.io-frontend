<template>
    <div>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Quantity', 'Price', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.medicineId" :values="[medicine.medicineName, medicine.quantity, medicine.quantity * medicine.price + ' RSD']">
                    <RoundButton title="Remove from cart" @click="removeItemFromCart(pharmacy, medicine.medicineId, medicine.quantity)" :iconName="'clear'"></RoundButton>
                </TableRow>
        </TableBody>
    </Table>
    <ModalOpener id="reserveMedicine" modalBoxId="enterDateModal">
        <Button class="pull-right">Reserve medicines</Button>
    </ModalOpener>
    <Modal modalBoxId="enterDateModal" title="Reservation">
        <div slot="body">
            <Card title="Enter the date by which you will take the medicine">
                <Form @submit="reserveMedicinesForPharmacy">
                    <DateTimePicker
                        v-model="selectedDate"
                        :isValid="!!selectedDate"
                        :showErrorMessage="showErrorMessage"
                        errorMessage="You have to select date."
                        type="datetime"
                    />
                    <Button @click="showErrorMessage = true" type="submit" class="pull-right">Reserve medicines</Button>
                </Form>
            </Card>
        </div>
    </Modal>
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import RoundButton from '../Form/RoundButton.vue'
import Form from '../Form/Form.vue'
import Button from '../Form/Button.vue'
import Card from '../Card/Card.vue'
import Modal from '../Modal/Modal.vue'
import ModalOpener from '../Modal/ModalOpener'
import DateTimePicker from '../Form/DateTimePicker.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

const $ = window.$;

export default {
    props: ['medicines', 'pharmacy'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton,
        Button,
        Form,
        Card,
        Modal,
        ModalOpener,
        DateTimePicker
    },

    data: function(){
        return{
            selectedDate: null,
            showErrorMessage: false
        }
    },

    computed: {
        ...mapGetters({
            result: 'shoppingCart/getResult'
        })
    },

    methods: {
        ...mapActions({
            removeItem: 'shoppingCart/removeItem',
            reserveMedicines: 'shoppingCart/reserveMedicines'
        }),
        removeItemFromCart(pharmacyId, medicineId, quantity){
            let removeObject = {
                'pharmacyId' : pharmacyId,
                'medicineId' : medicineId,
                'quantity' : quantity 
            };
            this.removeItem(removeObject);
        },
        reserveMedicinesForPharmacy() {
            this.reserveMedicines({pharmacyId: this.pharmacy, pickupDeadline: this.selectedDate})
        }
    },

    watch: {
    },

    mounted() {

    }

}
</script>
