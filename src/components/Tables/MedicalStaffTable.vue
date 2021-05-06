<template>
    <div>
        <Table>
            <TableHead :columnNames="columnNames"></TableHead>
                <TableBody>
                    <TableRow
                        v-for="(staff, index) in medicalStaff"
                        :key="index"
                        :values="getValues(staff)"
                    >
                    <StarRating v-model="staff.grade" @rating-selected="rate(staff)" :star-size="20"></StarRating>
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
import { mapActions, mapGetters} from 'vuex'
import StarRating from 'vue-star-rating'
import { getAccountIdFromToken, getUserIdFromToken } from '../../utils/token'
import toastr from 'toastr'

export default {
    props: ['medicalStaff', 'columnNames', 'canRate', 'medicalStaffType'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        StarRating
    },

    computed: {
        ...mapGetters({
            getResult: 'grade/getResult',
        })
    },

    methods: {
        ...mapActions({
            rateMedicalStaff: 'grade/rateMedicalStaff',
        }),
        rate(staff) {
            let medicalStaffId = staff.userId;
            let grade = staff.grade;
            let patientId = getAccountIdFromToken();
            if(this.medicalStaffType  === 'Dermatologist') {
                let medicalStaffType = 'Dermatologist';
                this.rateMedicalStaff({patientId, medicalStaffId, grade, medicalStaffType});
            }
            else {
                let medicalStaffType = 'Pharmacist';
                this.rateMedicalStaff({patientId, medicalStaffId, grade, medicalStaffType});
            }
        },

        getValues(staff){
            return [`${staff.user.firstName} ${staff.user.lastName}`, parseFloat(staff.user.averageGrade).toFixed(2)];
        },

        handleUpdateMessage(label, ok, message) {
            if(label === 'gradeDermatologist' || label === 'gradePharmacist') {
                if(ok) {
                    toastr.success(message);
                }
                else {
                    toastr.error(message);
                }
            }
        }
    },

    watch: {
        getResult({label, ok, message}) {
            this.handleUpdateMessage(label, ok, message);
        }
    }
}
</script>
