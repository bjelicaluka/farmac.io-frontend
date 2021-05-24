<template>
    <div class="content">
        <div class="container-fluid">
            <div class="center align-items-center col-4">
                <SelectOptionInput
                label="Select what you will rate"
                v-model="selectedValue"
                :show-label="false"
                :options="selectOptions"
                >
                    </SelectOptionInput>
            </div>
            <div v-if="selectedValue===0">
                <Card :description="`You can rate the dermatologist which you visited.`" title="Rate dermatologists">
                    <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaffs="canBeRatedDermatologists" 
                                :medicalStaffType ="'Dermatologist'" :isRated="false" />
                </Card>
                <Card  title="Change your grade for dermatologist">
                    <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Change your grade']" :medicalStaffs="ratedDermatologists" 
                    :medicalStaffType="'Dermatologist'" :isRated="true" @pageChange="loadOtherPageForRatedDermatologists" />
                </Card>
            </div>
            <div v-if="selectedValue===1">
                <Card :description="`You can rate the pharmacists which you visited.`" title="Rate pharmacists">
                    <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaffs="pharmacistsThatCanBeRated" 
                                                :medicalStaffType ="'Pharmacist'" :isRated="false"/>
                </Card>
                <Card title="Change your grade for pharmacist">
                    <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Change your grade']" :medicalStaffs="ratedPharmacists" 
                    :medicalStaffType="'Pharmacist'" :isRated="true" @pageChange="loadOtherPageForRatedPharmacists" />
                </Card>
            </div>
            <div v-if="selectedValue===2">
                <Card :description="`You can rate the medicine which you reserved and taken or which was prescribed to you.`" title="Rate medicine">
                    <RateMedicineTable :medicines="medicinesThatCanBeRated" :isRated="false"/>
                </Card>
                <Card title="Change your grade for medicine">
                    <RateMedicineTable :medicines="ratedMedicines" :isRated="true" @pageChange="loadOtherPageForRatedMedicines"/>
                </Card>
            </div>
            <div v-if="selectedValue===3">
                <Card :description="`You can rate the pharmacy which services you consumed in the past.`" title="Rate pharmacy">
                    <RatePharmacyTable :pharmacies="pharmaciesThatCanBeRated" :isRated="false"/>
                </Card>
                <Card title="Change your grade for pharmacy">
                    <RatePharmacyTable :pharmacies="ratedPharmacies" :isRated="true" @pageChange="loadOtherPageForRatedPharmacies"/>
                </Card>
            </div>
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
            selectedValue: null,
            pageDermatologist: 1,
            pagePharmacist: 1,
            pageMedicine: 1,
            pagePharmacy: 1
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
                    this.fetchRatedDermatilogists({ patientId: getAccountIdFromToken(), pageNumber: this.pageDermatologist});
                }
            }
            else if(label === 'gradePharmacist') {
                if(ok) {
                    this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
                    this.fetchRatedPharmacists({ patientId: getAccountIdFromToken(), pageNumber: this.pagePharmacist});
                }
            }
            else if(label === 'gradeMedicine' || label === 'changeGradeMedicine') {
                if(ok) {
                    this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
                    this.fetchRatedMedicines({ patientId: getUserIdFromToken(), pageNumber: this.pageMedicine });
                }
            }
            else if(label === 'gradePharmacy' || label === 'changeGradePharmacy') {
                if(ok) {
                    this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
                    this.fetchRatedPharmacies({ patientId: getUserIdFromToken(), pageNumber: this.pagePharmacy });
                }
            }
            else if(label === 'changeGradeMedicalStaff') {
                this.fetchRatedDermatilogists({ patientId: getAccountIdFromToken(), pageNumber: this.pageDermatologist});
                this.fetchRatedPharmacists({ patientId: getAccountIdFromToken(), pageNumber: this.pagePharmacist});
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
            fetchRatedDermatilogists: 'grade/fetchRatedDermatologistsToPage',
            fetchRatedPharmacists: 'grade/fetchRatedPharmacistsToPage',
            fetchRatedMedicines: 'grade/fetchRatedMedicinesToPage',
            fetchRatedPharmacies: 'grade/fetchRatedPharmaciesToPage'
        }), 
        loadOtherPageForRatedDermatologists(page) {
            this.pageDermatologist = page;
            this.fetchRatedDermatilogists({ patientId: getAccountIdFromToken(), pageNumber: this.pageDermatologist});
        },
        loadOtherPageForRatedPharmacists(page) {
            this.pagePharmacist = page;
            this.fetchRatedPharmacists({ patientId: getAccountIdFromToken(), pageNumber: this.pagePharmacist});
        },
        loadOtherPageForRatedMedicines(page) {
            this.pageMedicine = page;
            this.fetchRatedMedicines({ patientId: getUserIdFromToken(), pageNumber: this.pageMedicine});
        },
        loadOtherPageForRatedPharmacies(page) {
            this.pagePharmacy = page;
            this.fetchRatedPharmacies({ patientId: getUserIdFromToken(), pageNumber: this.pagePharmacy});
        }
    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
        this.fetchMedicinesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmaciesThatCanBeRated(getUserIdFromToken());
        this.fetchPharmacistsThatPatientCanRate(getAccountIdFromToken());
        this.fetchRatedDermatilogists({ patientId: getAccountIdFromToken(), pageNumber: 1} );
        this.fetchRatedPharmacists({ patientId: getAccountIdFromToken(), pageNumber: 1} );
        this.fetchRatedMedicines({ patientId: getUserIdFromToken(), pageNumber: 1} );
        this.fetchRatedPharmacies({ patientId: getUserIdFromToken(), pageNumber: 1} );
    }
}
</script>