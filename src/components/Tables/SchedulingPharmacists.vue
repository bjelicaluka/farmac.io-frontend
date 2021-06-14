<template>
    <div>
        <Table>
            <TableHead :columnNames="['First name', 'Last name', 'Average grade', '']"></TableHead>
                <TableBody>
                    <TableRow
                        v-for="(pharmacist, index) in pharmacists"
                        :key="index"
                        :values="[pharmacist.firstName, pharmacist.lastName, parseFloat(pharmacist.averageGrade).toFixed(2) + ' / 5.00']"
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
            this.$emit("makeAppointment", pharmacistId);
        }
    }
}
</script>
