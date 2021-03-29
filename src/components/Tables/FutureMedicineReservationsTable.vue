<template>
    <div class="row pl-4 pr-4">
        <Table>
            <TableHead :columnNames="['Reservation id', 'Pickup deadline', '']"></TableHead>
            <TableBody>
                <TableRow v-for="reservation in futureMedicineReservations" :key="reservation.reservationId" :values="[reservation.reservationId, formatDateTime(reservation.pickupDeadline)]">
                    <a class="btn btn-primary btn-sm btn-just-icon btn-round btn" rel="tooltip" title="Cancel reservation" @click="handleCancelReservation(reservation.reservationId)">
                        <i class="material-icons">clear</i>
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
import {mapActions, mapGetters} from 'vuex'
import toastr from 'toastr'
import moment from 'moment'

export default {
    components: {
        Table, 
        TableHead,
        TableBody,
        TableRow
    },

    data: function() {
    return {
        futureMedicineReservations: []
        }
    },

    computed: {
        ...mapGetters({
            getFutureMedicineReservations: 'medicineReservations/getFutureMedicineReservations',
            result: 'medicineReservations/getCancelResult'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineReservations: 'medicineReservations/getFutureMedicineReservations',
            cancelReservation: 'medicineReservations/cancelReservation'
        }), 
        handleCancelReservation(reservationId){
            this.cancelReservation(reservationId);
        },
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        }
    },

    watch: {
        getFutureMedicineReservations(reservations){
            this.futureMedicineReservations = reservations;
        },
        result({text, code}) {
            if(code === 200) {
                toastr.success(text);  
            } else {
                toastr.error(text);
            }
      }
    },

    mounted() {
        this.fetchMedicineReservations("2133bc63-1505-4835-9a40-124993d53be2");
    }

}
</script>
