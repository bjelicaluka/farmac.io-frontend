<template>
    <div>
        <div class="row pl-4 pr-4">
            <Search @search="handleSearch($event)" />
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
                <Pagination @pageChange="$emit('pageChange', $event)" />
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
import Pagination from '../Table/Pagination.vue'

export default {
    props: ['patients'],
    components: {
        Search,
        Table,
        TableBody,
        TableHead,
        TableRow,
        Pagination,
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
        handleSearch(value) {
            this.$emit('search', value);
        }
    }
}
</script>