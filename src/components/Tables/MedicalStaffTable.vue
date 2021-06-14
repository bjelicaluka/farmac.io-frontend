<template>
    <div>
        <Table>
            <TableHead :columnNames="columnNames"></TableHead>
            <TableBody v-if="!isRated">
                <TableRow
                    v-for="(staff, index) in medicalStaffs"
                    :key="index"
                    :values="[`${staff.user.firstName} ${staff.user.lastName}`, parseFloat(staff.user.averageGrade).toFixed(2)]"
                >
                <StarRating v-model="staff.grade" @rating-selected="rate(staff)" :star-size="20"></StarRating>
                </TableRow>
            </TableBody>
            <TableBody v-else>
                    <TableRow
                        v-for="(staff, index) in medicalStaffs"
                        :key="index"
                        :values="[`${staff.medicalStaff.firstName} ${staff.medicalStaff.lastName}`, parseFloat(staff.medicalStaff.averageGrade).toFixed(2) + ' / 5.00']"
                    >
                        <StarRating v-model="staff.grade" @rating-selected="changeGrade(staff)" :star-size="20"></StarRating>
                    </TableRow>
                    <Pagination @pageChange="$emit('pageChange', $event)" />
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
import Pagination from '../Table/Pagination'
import { getAccountIdFromToken, getUserIdFromToken } from '../../utils/token'
import toastr from 'toastr'

export default {
    props: ['medicalStaffs', 'columnNames', 'isRated', 'medicalStaffType'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        StarRating,
        Pagination
    },

    computed: {
        ...mapGetters({
            getResult: 'grade/getResult',
        })
    },

    methods: {
        ...mapActions({
            rateMedicalStaff: 'grade/rateMedicalStaff',
            changeGradeForMedicalStaff: 'grade/changeGradeForMedicalStaff'
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

        handleUpdateMessage(label, ok, message) {
            if(label === 'gradeDermatologist' || label === 'gradePharmacist' || label === 'changeGradeMedicalStaff') {
                if(ok) {
                    toastr.success(message);
                }
                else {
                    toastr.error(message);
                }
            }
        },

        changeGrade(staff) {
            let gradeId = staff.gradeId;
            let value = staff.grade;
            this.changeGradeForMedicalStaff({gradeId, value});
        }
    },

    watch: {
        getResult({label, ok, message}) {
            this.handleUpdateMessage(label, ok, message);
        }
    },
}
</script>
