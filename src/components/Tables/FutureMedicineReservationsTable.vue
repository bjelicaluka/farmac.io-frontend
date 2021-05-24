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
            <TableHead :columnNames="['Code', 'Name of pharmacy', 'Address of pharmacy', 'Pickup deadline', 'Price', '', ' ']"></TableHead>
            <TableBody v-if="pharmacies.length > 0">
                <TableRow v-for="reservation in futureMedicineReservations" :key="reservation.reservationId"
                    :values="[reservation.uniqueId, ...formatPharmacy(reservation.pharmacyId),
                            formatDateTime(reservation.pickupDeadline), reservation.price + ' RSD']">
                    <ModalOpener modalBoxId="cancelModal">
                        <RoundButton :title="'Cancel reservation'" @click="reservationId=reservation.reservationId" :iconName="'clear'"/>
                    </ModalOpener>
                    <RoundButton title="See reserved medicines" @click="displayReservedMedicines(reservation.reservationId)" :iconName="'medical_services'"/>
                </TableRow>
            </TableBody>  
        </Table>
        <Modal title="Cancel reservation" modalBoxId="cancelModal">
            <div slot="body">
                Are you sure that you want to cancel this reservation?
            </div>
            <div slot="buttons">
                <OptionModalButtons @yes="handleCancelReservation"/>
            </div>
        </Modal>
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

import { getUserIdFromToken } from '../../utils/token'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'
import moment from 'moment'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'

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
        ReservedMedicinesTable,
        OptionModalButtons
    },

    data: function() {
        return {
            futureMedicineReservations: [],
            pharmacies: [],
            reservedMedicines: [],
            medicines: [],
            reservationId: null
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
            getAllPharmacies: 'pharmacies/fetchAllPharmacies',
            fetchReservedMedicines: 'medicineReservations/fetchReservedMedicines',
            fetchMedicines: 'medicines/fetchMedicinesForHomePage'
        }),

        handleCancelReservation(){
            this.cancelReservation(this.reservationId);
        },

        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },

        formatPharmacy(pharmacyId){
            for(let i = 0; i < this.pharmacies.length; i++) {
                if(this.pharmacies[i].id == pharmacyId) {
                    let pharmacy = this.pharmacies[i]
                    return [pharmacy.name, `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`];
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
                this.fetchMedicineReservations(getUserIdFromToken());
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
        this.fetchMedicineReservations(getUserIdFromToken());
        this.getAllPharmacies();
    }

}
</script>
