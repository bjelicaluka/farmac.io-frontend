<template>
    <div class="row pl-4 pr-4">
        <Modal
            modalBoxId="displayMedicinesModal"
            title="Reserved medicines">
            <div slot="body">
                <Card title="Quantity and price of reserved medicines" v-if="reservedMedicines.length > 0">
                    <ReservedMedicinesTable :reservedMedicines="reservedMedicines"></ReservedMedicinesTable>
                </Card>
            </div>
        </Modal>
        <ModalOpener id="displayMedicinesModalOpener" class="d-none" modalBoxId="displayMedicinesModal" />
        <Table>
            <TableHead :columnNames="['Name of pharmacy', 'Address of pharmacy', 'Pickup deadline', 'Price', '', ' ']"></TableHead>
            <TableBody v-if="pharmacies.length > 0">
                <TableRow v-for="reservation in futureMedicineReservations" :key="reservation.reservationId"
                    :values="[foundPharmacy(reservation.pharmacyId).name, foundPharmacy(reservation.pharmacyId).address.streetName + ' ' + 
                    foundPharmacy(reservation.pharmacyId).address.streetNumber + ', ' + foundPharmacy(reservation.pharmacyId).address.city, 
                    formatDateTime(reservation.pickupDeadline), reservation.price]">
                    <RoundButton :title="'Cancel reservation'" :iconName="'clear'" @click="handleCancelReservation(reservation.reservationId)"></RoundButton>
                    <RoundButton title="See reserved medicines" @click="displayReservedMedicines(reservation.reservationId)" :iconName="'medical_services'">
                    </RoundButton>
                </TableRow>
            </TableBody>  
        </Table>
    </div>
</template>

<script>
import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import Modal from '../Modal/Modal.vue'
import ModalOpener from '../Modal/ModalOpener.vue'
import Card from '../Card/Card.vue'
import RoundButton from '../Form/RoundButton.vue'
import ReservedMedicinesTable from '../Tables/ReservedMedicinesTable.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'

export default {
    components: {
        Table, 
        TableHead,
        TableBody,
        TableRow,
        Modal,
        ModalOpener,
        Card,
        RoundButton, 
        ReservedMedicinesTable
    },

    data: function() {
    return {
        futureMedicineReservations: [],
        pharmacies: [],
        reservedMedicines: [],
        medicines: []
        }
    },

    computed: {
        ...mapGetters({
            getFutureMedicineReservations: 'medicineReservations/getFutureMedicineReservations',
            result: 'medicineReservations/getResult',
            getPharmacies: 'pharmacies/getPharmacies',
            getReservedMedicines: 'medicineReservations/getReservedMedicines',
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineReservations: 'medicineReservations/fetchFutureMedicineReservations',
            cancelReservation: 'medicineReservations/cancelReservation',
            getAllPharmacies: 'pharmacies/fetchPharmacies',
            fetchReservedMedicines: 'medicineReservations/fetchReservedMedicines',
            fetchMedicines: 'medicines/fetchMedicinesForHomePage'
        }),

        handleCancelReservation(reservationId){
            this.cancelReservation(reservationId);
        },

        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },

        foundPharmacy(pharmacyId){
            for(let i = 0; i < this.pharmacies.length; i++){
                if(this.pharmacies[i].id == pharmacyId){
                    return this.pharmacies[i];
                }
            }
        },

        displayReservedMedicines(reservationId){
            this.reservedMedicines = [];
            this.fetchReservedMedicines(reservationId);
            document.getElementById('displayMedicinesModalOpener').click();
        },
    },

    watch: {
        getFutureMedicineReservations(reservations) {
            this.futureMedicineReservations = reservations;
        },

        result({label, ok, message}) {
            if(label !== 'cancel')
                return;
            
            if(ok) {
                toastr.success(message);
                this.fetchMedicineReservations("08d8f850-724b-4236-8fd9-6cd7d952f120");
            } else {
                toastr.error(message);
            }
        },

        getPharmacies(pharmacies){
            this.pharmacies = pharmacies;
        },

        getReservedMedicines(reservedMedicines){
            this.reservedMedicines = reservedMedicines;
        },

        getMedicines(medicines){
            this.medicines = medicines;
        }
    },

    mounted() {
        this.fetchMedicineReservations("08d8f850-724b-4236-8fd9-6cd7d952f120");
        this.getAllPharmacies();
    }

}
</script>
