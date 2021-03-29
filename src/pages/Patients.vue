<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Patients' :description="'my patients'">
            <div>
                <div class="row pl-4 pr-4">
                    <Search />
                </div>
                <div>
                    Sort by:
                    <Button type="button" @click="sortPatients('firstName')">First name</Button>
                    <Button type="button" @click="sortPatients('lastName')">Last name</Button>
                    <Button type="button" @click="sortPatients('appointmentDate')">Appointment date</Button>
                </div>
                <Table>
                    <TableHead :columnNames="['First name', 'Last name', 'Birth date', 'Phone', 'Address', 'Appointment date', '']"></TableHead>
                    <TableBody>
                    <TableRow
                        v-for="p in patients" 
                        :key="p.id" 
                        :values="[p.firstName, p.lastName, formatDate(p.dateOfBirth), 
                                p.phoneNumber, formatAddress(p.address), formatDateTime(p.appointmentDate)]"
                    >
                    </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    </div> 
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import Card from '../components/Card/Card.vue'
import Search from '../components/Search/Search.vue'
import Table from '../components/Table/Table.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableRow from '../components/Table/TableRow.vue'
import Button from '../components/Form/Button.vue'

export default {
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        Search,
        Card,
        Button
    },
    
    data: function() {
        return { }
    },

    computed: {
        ...mapGetters({
            patients: 'dermatologist/getPatients'
        })
    },

    watch: {
    },

    methods: {
        ...mapActions({
            fetchPatients: 'dermatologist/fetchDermatologistsPatients',
            sortPatients: 'dermatologist/sortPatients'
        }),
        formatAddress(address) {
            const {state, city, streetName, streetNumber} = address;
            return `${state}, ${city}, ${streetName} - ${streetNumber}`
        },
        formatDate(date) {
            return moment(date).format("DD-MMM-YYYY");
        },
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        }
    },

    mounted() {
        const dermatologistId = "47e70b60-8d7f-4931-a120-07da93d62085"; // for testing
        this.fetchPatients(dermatologistId);
    }
}

</script>

<style>

</style>