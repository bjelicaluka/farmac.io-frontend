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
                    <div style="display: flex; flex-direction: row; "> 
                        <NumberInput 
                                v-model="grade"
                                :min=0
                                :max=5
                            />
                        <RoundButton :v-if="canRate" title="Rate" iconName="thumb_up_off_alt"  @click="rateMedicalStaff(staff)"></RoundButton>
                    </div>
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
import NumberInput from '../Form/NumberInput'
import { mapActions, mapGetters} from 'vuex'
import { getAccountIdFromToken, getUserIdFromToken } from '../../utils/token'
import toastr from 'toastr'

export default {
    props: ['medicalStaff', 'columnNames', 'canRate'],

    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton,
        NumberInput
    },

    data: function() {
        return {
            grade: 0
        }
    },

    computed: {
        ...mapGetters({
            getResult: 'dermatologist/getResult'
        })
    },

    methods: {
        ...mapActions({
            rateDermatologist: 'dermatologist/rateDermatologist'
        }),
        rateMedicalStaff(staff) {
            let dermatologistId = staff.userId;
            console.log(dermatologistId);
            let grade = this.grade;
            let patientId = getAccountIdFromToken();
            this.rateDermatologist({patientId, dermatologistId, grade});
        },
        getValues(staff){
            return [`${staff.user.firstName} ${staff.user.lastName}`, parseFloat(staff.user.averageGrade).toFixed(2)];
        }
    },

    watch: {
        getResult({label, ok, message}){
            if(label == 'grades') {
                if(ok) {
                    toastr.success(message);
                }
                else{
                    toastr.error(message);
                }
            }
        }
    }
}
</script>
