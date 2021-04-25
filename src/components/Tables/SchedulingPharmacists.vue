<template>
    <div>
        <Table>
            <TableHead :columnNames="['Name', 'Last name', 'Average grade', '']"></TableHead>
                <TableBody>
                    <TableRow
                        v-for="(pharmacist, index) in pharmacists"
                        :key="index"
                        :values="[pharmacist.firstName, pharmacist.lastName, pharmacist.averageGrade]"
                    >
                        <RoundButton title="Book appointment" iconName="schedule"  @click="handleBookAppointment(pharmacist.id)"></RoundButton>
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
import RoundButton from '../Form/RoundButton'

import moment from 'moment'

export default {
    props: ['pharmacists'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton
    },

    methods: {
        handleBookAppointment(pharmacistId) {
 
        }
    }
}
</script>
