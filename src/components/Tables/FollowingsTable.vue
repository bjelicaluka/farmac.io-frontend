<template>
    <div>
    <div v-if="followings && !followings.length">
        You are not following any pharmacy yet.
    </div>
    <Table v-else>
        <TableHead :columnNames="['Pharmacy', 'Since', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(pharmacyFollow, index) in followings" :key="index" :values="[pharmacyFollow.pharmacy.name, formatDate(pharmacyFollow.pharmacy.createdAt)]">
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
import moment from 'moment'

export default {
    props: ['followings'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
    },

    methods: {
        formatDate(d) {
            return moment(d).format('ll');
        }
    }
}
</script>
