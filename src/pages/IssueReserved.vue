<template>
<div class="content">
    <div class="container-fluid">
        <Card :title="`Issuing reserved medicine [${pharmacy?pharmacy.name:''}]`" :description="'Type in reservation code'">
            <Search @search="handleSearch"></Search>
        </Card>
        <Card :title="`${reservation? 'Reservation '+reservation.uniqueId : message}`">
            <div v-if="!!reservation">
                <Table>
                    <TableRow :values="['Patient', `${reservation.patient.firstName} ${reservation.patient.lastName}`]"></TableRow>
                    <TableRow :values="['Pickup deadline', formatDateTime(reservation.pickupDeadline)]"></TableRow>
                </Table>
                <reserved-medicines-table :reservedMedicines="reservation.medicines"/>
                <Button @click="handleIssueReservation">Issue medicines</Button>
            </div>
        </Card>
    </div> 
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { getUserIdFromToken } from '../utils/token'
import Search from '../components/Search/Search.vue'
import Card from '../components/Card/Card.vue'
import Table from '../components/Table/Table.vue'
import TableRow from '../components/Table/TableRow.vue'
import ReservedMedicinesTable from '../components/Tables/ReservedMedicinesTable.vue'
import Button from '../components/Form/Button.vue'

export default {
    data: function() {
        return {
            message: '',
            reservation: null
        }
    },
    components: {
        Search,
        Card,
        Table,
        TableRow,
        ReservedMedicinesTable,
        Button,
    },
    computed: {
        ...mapGetters({
            getReservation: 'medicineReservations/getReservation',
            result: 'medicineReservations/getResult',
            pharmacy: 'pharmacist/getPharmacy'
        })
    },
    methods: {
        ...mapActions({
            fetchReservationInPharmacy: 'medicineReservations/fetchReservationInPharmacy',
            issueReserved: 'medicineReservations/issueReserved',
            fetchPharmacistWorkPlace: 'pharmacist/fetchPharmacistWorkPlace'
        }),
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },
        handleSearch(code) {
            if (!this.pharmacy) return;
            this.fetchReservationInPharmacy({uniqueId: code, pharmacyId: this.pharmacy.id});
        },
        handleIssueReservation() {
            this.issueReserved(this.reservation.id);
            this.message = '';
            this.reservation = null;
        }
    },
    watch: {
        result({label, ok, message}) {
            if (label !== 'fetch' && label !== 'issue')
                return;
            if (!ok)
                this.reservation = null;
            this.message = message;
        },
        getReservation(res) {
            this.reservation = res;
        }
    },
    mounted() {
        this.fetchPharmacistWorkPlace(getUserIdFromToken());
    },
}

</script>

<style>

</style>