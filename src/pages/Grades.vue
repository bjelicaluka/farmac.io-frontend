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
                <MedicinesTable :buttonOrRating="2" :medicines="medicinesThatCanBeRated" title="Rate medicines" @selectedGrade="selectedGrade"/>
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
import MedicinesTable from '../components/Tables/MedicinesTable'
import RatePharmacyTable from '../components/Tables/RatePharmacyTable'
import { getAccountIdFromToken, getUserIdFromToken } from '../utils/token'
import toastr from 'toastr'

export default {
    components: { 
        Card,
        MedicalStaffTable,
        MedicinesTable,
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
            getCanBeRatedDermatologists: 'dermatologist/getCanBeRatedDermatologists',
            getMedicinesThatCanBeRated: 'medicines/getSmallMedicines',
            getResultDermatologist: 'dermatologist/getResult',
            getResultMedicine: 'medicines/getResult',
            getResultPharmacy: 'pharmacies/getResult',
            getPharmaciesThatCanBeRated: 'pharmacies/getPharmacies',
            getResultPharmacist: 'pharmacist/getResult',
            getPharmacistsThatCanBeRated: 'pharmacist/getPharmacists'
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
                else {
                    toastr.error(message);
                }
            }
        },
        getPharmaciesThatCanBeRated(pharmacies) {
            this.pharmaciesThatCanBeRated = pharmacies;
            this.pharmaciesThatCanBeRated.forEach(pharmacy => {
                pharmacy['grade'] = 0;
            });
        },
        getResultPharmacy({label, ok, message}) {
            if(label === 'grade') {
                if(ok) {
                    this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
        },
        getPharmacistsThatCanBeRated(pharmacists) {
            this.pharmacistsThatCanBeRated = pharmacists;
            this.pharmacistsThatCanBeRated.forEach(pharmacist => {
                pharmacist['grade'] = 0;
            });
        },
        getResultPharmacist({label, ok, message}) {
            if(label === 'grade') {
                if(ok) {
                    this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
                }
            }
        }
    },
    methods: {
        ...mapActions({
            fetchCanBeRatedDermatologists: 'dermatologist/fetchCanBeRatedDermatologists',
            fetchMedicinesThatCanBeRated: 'medicines/fetchMedicinesThatCanRate',
            rateMedicine: 'medicines/rateMedicine',
            fetchPharmaciesThatCanBeRated: 'pharmacies/fetchPharmaciesThatCanRate',
            fetchPharmacistsThatPatientCanRate: 'pharmacist/fetchPharmacistsThatPatientCanRate',
        }), 
        selectedGrade(medicine) {
            let requestObject = {
                value: medicine.grade,
                patientId: getUserIdFromToken(),
                medicineId: medicine.id
            };
            this.rateMedicine(requestObject);
        }
    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
        this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
    }
}
</script>