<template>
    <div class="row pl-4 pr-4">
        <Modal
            modalBoxId="displayMedicinesModal"
            title="Reserved medicines">
            <div slot="body">
                <Card title="Quantity and price of reserved medicines">
                    <Table>
                        <TableHead :columnNames="['Medicine name', 'Quantity', 'Price']"></TableHead>
                        <TableBody v-if="reservedMedicines.length > 0">
                            <TableRow v-for="(medicine, index) in reservedMedicines" :key="index" :values="[getMedicineName(medicine.medicineId), 
                            medicine.quantity, medicine.price*medicine.quantity]"></TableRow>
                        </TableBody>
                    </Table>
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
                    <a class="btn btn-primary btn-sm btn-just-icon btn-round btn" rel="tooltip" title="Cancel reservation" @click="handleCancelReservation(reservation.reservationId)">
                        <i class="material-icons">clear</i>
                    </a>
                    <a class="btn btn-primary btn-sm btn-just-icon btn-round btn" rel="tooltip" title="See reserved medicines" @click="displayReservedMedicines(reservation.reservationId)">
                        <i class="material-icons">medical_services</i>
                    </a>
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
import {mapActions, mapGetters} from 'vuex'
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
        Card
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
            result: 'medicineReservations/getCancelResult',
            getPharmacies: 'pharmacies/getPharmacies',
            getReservedMedicines: 'medicineReservations/getReservedMedicines',
            getMedicines: 'medicines/getMedicines'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineReservations: 'medicineReservations/getFutureMedicineReservations',
            cancelReservation: 'medicineReservations/cancelReservation',
            getAllPharmacies: 'pharmacies/getPharmacies',
            fetchReservedMedicines: 'medicineReservations/getReservedMedicines',
            fetchMedicines: 'medicines/getMedicines'
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
        getMedicineName(medicineId){
            for(let i = 0; i < this.medicines.length; i++){
                if(this.medicines[i].id == medicineId){
                    return this.medicines[i].name;
                }
            }
        }
    },

    watch: {
        getFutureMedicineReservations(reservations){
            this.futureMedicineReservations = reservations;
            this.check = true;
        },
        result({text, code}) {
            if(code === 200) {
                toastr.success(text);  
            } else {
                toastr.error(text);
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
        this.fetchMedicineReservations("2133bc63-1505-4835-9a40-124993d53be2");
        this.getAllPharmacies();
        this.fetchMedicines();
    }

}
</script>
