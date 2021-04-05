<template>
    <div>
        <div class="row pl-4 pr-4">
            <Search @search="handleSearch($event)" />
        </div>
        <div>
            Sort by:
            <Button type="button" @click="handleSort('firstName')">First name</Button>
            <Button type="button" @click="handleSort('lastName')">Last name</Button>
            <Button type="button" @click="handleSort('appointmentDate')">Appointment date</Button>
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
</template>

<script>
import moment from 'moment'
import Search from '../Search/Search.vue'
import Table from '../Table/Table.vue'
import TableBody from '../Table/TableBody.vue'
import TableHead from '../Table/TableHead.vue'
import TableRow from '../Table/TableRow.vue'
import Button from '../Form/Button.vue'

export default {
    props: ['patients'],
    components: {
        Search,
        Table,
        TableBody,
        TableHead,
        TableRow,
        Button
    },

    methods: {
        formatAddress(address) {
            const {state, city, streetName, streetNumber} = address;
            return `${state}, ${city}, ${streetName} - ${streetNumber}`
        },
        formatDate(date) {
            return moment(date).format("DD-MMM-YYYY");
        },
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },
        handleSort(crit) {
            this.$emit('sort', crit);
        },
        handleSearch(value) {
            this.$emit('search', value);
        }
    }
}
</script>