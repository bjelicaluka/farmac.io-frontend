<template>
    <div class="content">
        <div class="container-fluid">
            <h3>Shopping cart</h3>
            <Card v-for="(medicines, pharmacy) in reservations" :key="pharmacy" :title="medicines[0].pharmacyName + ', ' + medicines[0].street
                + ', ' + medicines[0].city">
                <div>
                    <Table>
                        <TableHead :columnNames="['Medicine name', 'Quantity', 'Price', '']"></TableHead>
                            <TableBody>
                                <TableRow v-for="(medicine, index) in medicines" :key="index + medicine.medicineId" :id="medicine.medicineId" :values="[medicine.medicineName, medicine.quantity, medicine.price]">
                                    <a class="btn btn-just-icon btn-round btn-wd" rel="tooltip" title="Remove from cart" @click="removeItemFromCart(pharmacy, medicine.medicineId, medicine.quantity)">
                                        <i class="material-icons">clear</i>
                                    </a>
                                </TableRow>
                        </TableBody>
                    </Table>
                    <Modal modalBoxId="enterDateModal" title="Reservation">
                        <div slot="body">
                            <Card title="Enter the date by which you will take the medicine">
                                <DateTimePicker type="date"/>
                                <Button  class="pull-right">Reserve medicines</Button>
                            </Card>
                        </div>
                    </Modal>
                    <ModalOpener id="reserveMedicine" class="d-none" modalBoxId="enterDateModal" />
                    <Button @click="openModalReservation" class="pull-right">Reserve medicines</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card/Card.vue'
import Table from '../components/Table/Table.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableRow from '../components/Table/TableRow.vue'
import Button from '../components/Form/Button.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import DateTimePicker from '../components/Form/DateTimePicker.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        Card,
        Table,
        TableHead,
        TableBody,
        TableRow,
        Button,
        Modal,
        ModalOpener,
        DateTimePicker
    },

    data: function(){
        return {
            pharmacies: {},
            pharmacy: null,
        }
    },

    computed: {
        ...mapGetters({
            reservations: 'shoppingCart/getReservations',
        })
    },

    methods:{
        ...mapActions({
            removeItem: 'shoppingCart/removeItem',
        }),
        removeItemFromCart(pharmacyId, medicineId, quantity){
            let removeObject = {
                'pharmacyId' : pharmacyId,
                'medicineId' : medicineId,
                'quantity' : quantity 
            };
            this.removeItem(removeObject);
        },
        openModalReservation(){
            document.getElementById('reserveMedicine').click();
        }
    },

    watch: {
      reservations(reservations) {
        this.reservations = reservations;
      },
    }
}

</script>
