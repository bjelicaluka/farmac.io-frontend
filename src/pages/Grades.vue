<template>
    <div class="content">
        <div class="container-fluid">
            <div class="center align-items-center col-4">
                <SelectOptionInput
                label="Select entity to rate"
                v-model="selectedValue"
                :show-label="false"
                :options="selectOptions"
                >
                    </SelectOptionInput>
            </div>
            <Card v-if="selectedValue===0" :description="`You can rate the dermatologist which you visited.`" title="Rate dermatologists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaffs="canBeRatedDermatologists" 
                            :medicalStaffType ="'Dermatologist'" :isRated="false"/>
            </Card>
            <Card v-if="selectedValue===0"  title="Change your grade for dermatologist">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Change your grade']" :medicalStaffs="ratedDermatologists" :medicalStaffType="'Dermatologist'" :isRated="true"/>
            </Card>
            <Card v-if="selectedValue===1"  :description="`You can rate the pharmacists which you visited.`" title="Rate pharmacists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaffs="pharmacistsThatCanBeRated" 
                                            :medicalStaffType ="'Pharmacist'" :isRated="false"/>
            </Card>
            <Card v-if="selectedValue===1"  title="Change your grade for pharmacist">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Change your grade']" :medicalStaffs="ratedPharmacists" :medicalStaffType="'Pharmacist'" :isRated="true"/>
            </Card>
            <Card v-if="selectedValue===2"  :description="`You can rate the medicine which you reserved and taken or which was prescribed to you.`" title="Rate medicine">
                <RateMedicineTable :medicines="medicinesThatCanBeRated" :isRated="false"/>
            </Card>
            <Card v-if="selectedValue===2"  title="Change your grade for medicine">
                <RateMedicineTable :medicines="ratedMedicines" :isRated="true"/>
            </Card>
            <Card v-if="selectedValue===3"  :description="`You can rate the pharmacy which services you consumed in the past.`" title="Rate pharmacy">
                <RatePharmacyTable :pharmacies="pharmaciesThatCanBeRated" :isRated="false"/>
            </Card>
            <Card v-if="selectedValue===3"  title="Change your grade for pharmacy">
                <RatePharmacyTable :pharmacies="ratedPharmacies" :isRated="true"/>
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
import SelectOptionInput from '../components/Form/SelectOptionInput'
import { getAccountIdFromToken, getUserIdFromToken } from '../utils/token'
import toastr from 'toastr'

let selectOptions = [
  {
    value:  0,
    label: 'Rate dermatologists'
  },
  {
    value: 1,
    label: 'Rate pharmacists'
  },
  {
    value: 2,
    label: 'Rate medicines'
  },
  {
    value: 3,
    label: 'Rate pharmacies'
  }
];

export default {
    components: { 
        Card,
        MedicalStaffTable,
        RateMedicineTable,
        RatePharmacyTable,
        SelectOptionInput
    },
    data: () => {
        return {
            canBeRatedDermatologists: [],
            medicinesThatCanBeRated: [],
            pharmaciesThatCanBeRated: [],
            pharmacistsThatCanBeRated: [],
            ratedDermatologists: [],
            ratedPharmacists: [],
            ratedMedicines: [],
            ratedPharmacies: [],
            selectOptions: selectOptions,
            selectedValue: null
        }
    },
    computed: {
        ...mapGetters({
            getCanBeRatedDermatologists: 'grade/getDermatologistsToRate',
            getMedicinesThatCanBeRated: 'grade/getMedicinesToRate',
            getResult: 'grade/getResult',
            getPharmaciesThatCanBeRated: 'grade/getPharmaciesToRate',
            getPharmacistsThatCanBeRated: 'grade/getPharmacistsToRate',
            getRatedDermatologists: 'grade/getRatedDermatologists',
            getRatedPharmacists: 'grade/getRatedPharmacists',
            getRatedMedicines: 'grade/getRatedMedicines',
            getRatedPharmacies: 'grade/getRatedPharmacies'
        }),
    },
    watch: {
        getResult({label, ok, message}) {
            if(label === 'gradeDermatologist') {
                if(ok) {
                    this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
                    this.fetchRatedDermatilogists(getAccountIdFromToken());
                }
            }
            else if(label === 'gradePharmacist') {
                if(ok) {
                    this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
                    this.fetchRatedPharmacists(getAccountIdFromToken());
                }
            }
            else if(label === 'gradeMedicine' || label === 'changeGradeMedicine') {
                if(ok) {
                    this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
                    this.fetchRatedMedicines(getUserIdFromToken());
                }
            }
            else if(label === 'gradePharmacy' || label === 'changeGradePharmacy') {
                if(ok) {
                    this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
                    this.fetchRatedPharmacies(getUserIdFromToken());
                }
            }
            else if(label === 'changeGradeMedicalStaff') {
                this.fetchRatedDermatilogists(getAccountIdFromToken());
                this.fetchRatedPharmacists(getAccountIdFromToken());
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
        },
        getRatedDermatologists(dermatologists) {
            this.ratedDermatologists = dermatologists;
        },
        getRatedPharmacists(pharmacists) {
            this.ratedPharmacists = pharmacists;
        },
        getRatedMedicines(medicines) {
            this.ratedMedicines = medicines;
        },
        getRatedPharmacies(pharmacies) {
            this.ratedPharmacies = pharmacies;
        }
    },
    methods: {
        ...mapActions({
            fetchCanBeRatedDermatologists: 'grade/fetchCanBeRatedDermatologists',
            fetchMedicinesThatCanBeRated: 'grade/fetchMedicinesThatCanRate',
            fetchPharmaciesThatCanBeRated: 'grade/fetchPharmaciesThatCanRate',
            fetchPharmacistsThatPatientCanRate: 'grade/fetchPharmacistsThatPatientCanRate',
            fetchRatedDermatilogists: 'grade/fetchRatedDermatologists',
            fetchRatedPharmacists: 'grade/fetchRatedPharmacists',
            fetchRatedMedicines: 'grade/fetchRatedMedicines',
            fetchRatedPharmacies: 'grade/fetchRatedPharmacies'
        }), 
    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
        this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
        this.fetchRatedDermatilogists(getAccountIdFromToken());
        this.fetchRatedPharmacists(getAccountIdFromToken());
        this.fetchRatedMedicines(getUserIdFromToken());
        this.fetchRatedPharmacies(getUserIdFromToken());
    }
}
</script>