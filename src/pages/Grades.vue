<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`You can rate the dermatologist which you visited.`" title="Rate dermatologists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaff="canBeRatedDermatologists" />
            </Card>
            <Card :description="`You can rate the medicine which you reserved and taken or which was prescribed to you.`" title="Rate medicine">
                <RateMedicineTable :medicines="medicinesThatCanBeRated" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import MedicalStaffTable from '../components/Tables/MedicalStaffTable'
import RateMedicineTable from '../components/Tables/RateMedicineTable'
import { getAccountIdFromToken, getUserIdFromToken } from '../utils/token'
import toastr from 'toastr'

export default {
    components: { 
        Card,
        MedicalStaffTable,
        RateMedicineTable
    },
    data: () => {
        return {
            canBeRatedDermatologists: [],
            medicinesThatCanBeRated: [],
            grade: 0
        }
    },
    computed: {
        ...mapGetters({
            getCanBeRatedDermatologists: 'dermatologist/getCanBeRatedDermatologists',
            getMedicinesThatCanBeRated: 'medicines/getSmallMedicines',
            getResultDermatologist: 'dermatologist/getResult',
            getResultMedicine: 'medicines/getResult'
        }),
    },
    watch: {
        getResultDermatologist({label, ok, message}) {
            if(label === 'grade') {
                if(ok) {
                    this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
                }
            }
        },
        getCanBeRatedDermatologists(canBeRatedDermatologists) {
            this.canBeRatedDermatologists = canBeRatedDermatologists;
        },
        getMedicinesThatCanBeRated(medicines) {
            this.medicinesThatCanBeRated = medicines;
            this.medicinesThatCanBeRated.forEach(medicine => {
                medicine['grade'] = 0;
            });
        },
        getResultMedicine({label, ok, message}) {
            if(label === 'grade') {
                if(ok) {
                    toastr.success(message)
                    this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
                }
                else{
                    toastr.error(message);
                }
            }
        }
    },
    methods: {
        ...mapActions({
            fetchCanBeRatedDermatologists: 'dermatologist/fetchCanBeRatedDermatologists',
            fetchMedicinesThatCanBeRated: 'medicines/fetchMedicinesThatCanRate',
        }),
    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
        this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
    }
}
</script>