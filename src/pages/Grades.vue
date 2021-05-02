<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`You can rate the dermatologist which you visited.`" title="Rate dermatologists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaff="canBeRatedDermatologists" />
            </Card>
            <Card :description="`You can rate the medicine which you reserved and taken or which was prescribed to you.`" title="Rate medicine">
                <MedicinesTable :buttonOrRating="2" :medicines="medicinesThatCanBeRated" title="Rate medicines" @selectedGrade="selectedGrade"/>
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import MedicalStaffTable from '../components/Tables/MedicalStaffTable'
import MedicinesTable from '../components/Tables/MedicinesTable'
import { getAccountIdFromToken } from '../utils/token'
import toastr from 'toastr'

export default {
    components: { 
        Card,
        MedicalStaffTable,
        MedicinesTable
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
            if(label ==- 'grade') {
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
                    this.fetchMedicinesThatCanBeRated(getAccountIdFromToken());
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
            rateMedicine: 'medicines/rateMedicine'
        }), 
        selectedGrade(medicine) {
            let requestObject = {
                value: medicine.grade,
                patientId: getAccountIdFromToken(),
                medicineId: medicine.id
            };
            this.rateMedicine(requestObject);
        }
    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
        this.fetchMedicinesThatCanBeRated(getAccountIdFromToken());
    }
}
</script>