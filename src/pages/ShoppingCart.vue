<template>
    <div class="content">
        <div class="container-fluid">
            <Card v-for="(medicines, pharmacy) in reservations" :key="pharmacy" :title="medicines[0].pharmacyName + ', ' + medicines[0].street + ', ' + medicines[0].city">
                <Table>
                    <TableHead :columnNames="['Medicine name', 'Quantity', 'Price', '']"></TableHead>
                        <TableBody>
                            <TableRow v-for="(medicine, index) in medicines" :key="index + medicine.medicineId" :id="medicine.medicineId" :values="[medicine.medicineName, medicine.quantity, medicine.quantity * medicine.price + ' RSD']">
                                <a class="btn btn-primary btn-sm btn-just-icon btn-round btn" rel="tooltip" title="Remove from cart" @click="removeItemFromCart(pharmacy, medicine.medicineId, medicine.quantity)">
                                    <i class="material-icons">clear</i>
                                </a>
                            </TableRow>
                    </TableBody>
                </Table>
                <ModalOpener id="reserveMedicine" modalBoxId="enterDateModal">
                    <Button @click="selectedPharmacy = pharmacy" class="pull-right">Reserve medicines</Button>
                </ModalOpener>
            </Card>

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
    </div>

    
</template>

<script>
import Card from '../components/Card/Card.vue'
import Table from '../components/Table/Table.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableRow from '../components/Table/TableRow.vue'
import Form from '../components/Form/Form.vue'
import Button from '../components/Form/Button.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import DateTimePicker from '../components/Form/DateTimePicker.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

const $ = window.$;

export default {
    components: {
        Card,
        Table,
        TableHead,
        TableBody,
        TableRow,
        Form,
        Button,
        Modal,
        ModalOpener,
        DateTimePicker
    },

    data: function(){
        return {
            selectedDate: null,
            selectedPharmacy: null,
            showErrorMessage: false
        }
    },

    computed: {
        ...mapGetters({
            reservations: 'shoppingCart/getReservations',
            result: 'shoppingCart/getResult'
        })
    },

    watch: {
      result({text, code}) {
        if(code === 200) {
            $('#enterDateModal').modal('hide');
            toastr.success(text);
        } else {
            toastr.error(text);
        }
      }
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
            this.reserveMedicines({pharmacyId: this.selectedPharmacy, pickupDeadline: this.selectedDate})
        }
    },

}

</script>
