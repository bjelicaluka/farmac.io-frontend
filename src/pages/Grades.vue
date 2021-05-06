<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`You can rate the dermatologist which you visited.`" title="Rate dermatologists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaff="canBeRatedDermatologists" :medicalStaffType ="'Dermatologist'"/>
            </Card>
             <Card :description="`You can rate the pharmacists which you visited.`" title="Rate pharmacists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaff="pharmacistsThatCanBeRated" :medicalStaffType ="'Pharmacist'" />
            </Card>
            <Card :description="`You can rate the medicine which you reserved and taken or which was prescribed to you.`" title="Rate medicine">
                <RateMedicineTable :medicines="medicinesThatCanBeRated" />
            </Card>
            <Card :description="`You can rate the pharmacy which services you consumed in the past.`" title="Rate pharmacy">
                <RatePharmacyTable :pharmacies="pharmaciesThatCanBeRated" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import MedicalStaffTable from '../components/Tables/MedicalStaffTable'
import RateMedicineTable from '../components/Tables/RateMedicineTable'
import RatePharmacyTable from '../components/Tables/RatePharmacyTable'
import { getAccountIdFromToken, getUserIdFromToken } from '../utils/token'
import toastr from 'toastr'

export default {
    components: { 
        Card,
        MedicalStaffTable,
        RateMedicineTable,
        RatePharmacyTable
    },
    data: () => {
        return {
            canBeRatedDermatologists: [],
            medicinesThatCanBeRated: [],
            pharmaciesThatCanBeRated: [],
            pharmacistsThatCanBeRated: []
        }
    },
    computed: {
        ...mapGetters({
            getCanBeRatedDermatologists: 'grade/getDermatologistsToRate',
            getMedicinesThatCanBeRated: 'grade/getMedicinesToRate',
            getResult: 'grade/getResult',
            getPharmaciesThatCanBeRated: 'grade/getPharmaciesToRate',
            getPharmacistsThatCanBeRated: 'grade/getPharmacistsToRate'
        }),
    },
    watch: {
        getResult({label, ok, message}) {
            if(label === 'gradeDermatologist') {
                if(ok) {
                    this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
                }
            }
            else if(label === 'gradePharmacist') {
                if(ok) {
                    this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
                }
            }
            else if(label === 'gradeMedicine') {
                if(ok) {
                    this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
                }
            }
            else if(label === 'gradePharmacy') {
                if(ok) {
                    this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
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
        getPharmaciesThatCanBeRated(pharmacies) {
            this.pharmaciesThatCanBeRated = pharmacies;
            this.pharmaciesThatCanBeRated.forEach(pharmacy => {
                pharmacy['grade'] = 0;
            });
        },
        getPharmacistsThatCanBeRated(pharmacists) {
            this.pharmacistsThatCanBeRated = pharmacists;
            this.pharmacistsThatCanBeRated.forEach(pharmacist => {
                pharmacist['grade'] = 0;
            });
        }
    },
    methods: {
        ...mapActions({
            fetchCanBeRatedDermatologists: 'grade/fetchCanBeRatedDermatologists',
            fetchMedicinesThatCanBeRated: 'grade/fetchMedicinesThatCanRate',
            fetchPharmaciesThatCanBeRated: 'grade/fetchPharmaciesThatCanRate',
            fetchPharmacistsThatPatientCanRate: 'grade/fetchPharmacistsThatPatientCanRate',
        }), 
    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
        this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
    }
}
</script>