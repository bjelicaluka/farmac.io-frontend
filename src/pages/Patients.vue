<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Patients' :description="'my patients'">
            <div>
                <div class="row pl-4 pr-4">
                    <Search />
                </div>
                <Table>
                    <TableHead :columnNames="['First name', 'Last name', 'Birth date', 'Phone', 'Address', 'Appointment date', '']"></TableHead>
                    <TableBody>
                    <TableRow
                        v-for="p in patients" 
                        :key="p.id" 
                        :values="[p.firstName, p.lastName, p.dateOfBirth, p.phoneNumber, formatAddress(p.address), p.appointmentDate]"
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
import Card from '../components/Card/Card.vue'
import Search from '../components/Search/Search.vue'
import Table from '../components/Table/Table.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableRow from '../components/Table/TableRow.vue'

export default {
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        Search,
        Card
    },
    
    data: function() {
        return { }
    },

    computed: {
        ...mapGetters({
            patients: 'dermatologist/getPatients'
        }),
    },

    watch: {
    },

    methods: {
        ...mapActions({
            fetchPatients: 'dermatologist/fetchDermatologistsPatients'
        }),
        formatAddress(address) {
            const {state, city, streetName, streetNumber} = address;
            return `${state}, ${city}, ${streetName} - ${streetNumber}`
        },
    },

    mounted() {
        const dermatologistId = "";
        this.fetchPatients(dermatologistId);
    }
}

</script>

<style>

</style>