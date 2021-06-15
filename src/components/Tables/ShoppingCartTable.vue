<template>
    <div>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Quantity', 'Price', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.medicineId" :values="[medicine.medicineName, medicine.quantity, medicine.quantity * medicine.price + ' RSD']">
                    <RoundButton title="Remove from cart" @click="removeItemFromCart(pharmacyId, medicine.medicineId, medicine.quantity)" :iconName="'clear'"></RoundButton>
                </TableRow>
        </TableBody>
    </Table>
    <ModalOpener id="reserveMedicine" :modalBoxId="'enterDateModal' + pharmacyId">
        <Button class="pull-right" @click="openingModal">Reserve medicines</Button>
    </ModalOpener>
    <Modal :modalBoxId="'enterDateModal' + pharmacyId" title="Reservation">
        <div slot="body"> 
            <Card title="Enter the date by which you will take the medicine">
                <Form @submit="reserveMedicinesForPharmacy">
                    <DateTimePicker type="datetime" :id="pharmacyId"/>
                    <Button @click="showErrorMessage = true; " type="submit" class="pull-right">Reserve medicines</Button>
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
import moment from 'moment'
import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../../utils/token'

const $ = window.$;

export default {
    props: ['medicines', 'pharmacyId'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton,
        Button,
        Card,
        Modal,
        Form,
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
            this.removeItem({pharmacyId, medicineId, quantity});
        },
        reserveMedicinesForPharmacy() {
            $('#enterDateModal' + this.pharmacyId).modal('hide');
            this.selectedDate =  $('#' + this.pharmacyId).val();
            if(this.selectedDate === "" || this.selectedDate === null){
                toastr.error("You have to select date.");
            }
            else {
                this.reserveMedicines({pharmacyId: this.pharmacyId, pickupDeadline: moment(this.selectedDate).format(), patientId: getUserIdFromToken()})
            }
        },
        openingModal() {
            $('.datetimepicker').datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove'
                }
            });
        }
    }
}
</script>
