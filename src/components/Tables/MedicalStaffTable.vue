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
                    <StarRating v-model="staff.grade" @rating-selected="rateMedicalStaff(staff)" :star-size="20"></StarRating>
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
            getResultDermatologist: 'dermatologist/getResult',
            getResultPharmacist: 'pharmacist/getResult'
        })
    },

    methods: {
        ...mapActions({
            rateDermatologist: 'dermatologist/rateDermatologist',
            ratePharmacist: 'pharmacist/ratePharmacist'
        }),
        rateMedicalStaff(staff) {
            let medicalStaffId = staff.userId;
            let grade = staff.grade;
            let patientId = getAccountIdFromToken();
            if(this.medicalStaffType  == 'Dermatologist'){
                this.rateDermatologist({patientId, medicalStaffId, grade});
            }
            else{
                this.ratePharmacist({patientId, medicalStaffId, grade});
            }
        },
        getValues(staff){
            return [`${staff.user.firstName} ${staff.user.lastName}`, staff.user.averageGrade];
        },
        handleUpdateMessage(label, ok, message){
            if(label === 'grade') {
                if(ok) {
                    toastr.success(message);
                }
                else{
                    toastr.error(message);
                }
            }
        }
    },

    watch: {
        getResultDermatologist({label, ok, message}){
            this.handleUpdateMessage(label, ok, message);
        },
        getResultPharmacist({label, ok, message}){
            this.handleUpdateMessage(label, ok, message);
        }
    }
}
</script>
