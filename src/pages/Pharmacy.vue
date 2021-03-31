<template>
    <div class="content">
        <div class="container-fluid">
            <Card :title="pharmacy && pharmacy.name" :description="pharmacy && pharmacy.description">
                <PharmacyInfo :pharmacy="pharmacy" />
            </Card>
            <Card title='Pharmacists' :description="`${pharmacy && pharmacy.name}'s pharmacist employees.`">
                <PharmacistsTable @search="handleSearchPharmacists" :pharmacists="pharmacists" :pharmacyId="pharmacyId" />
            </Card>
            <Card title='Dermatologists' :description="`${pharmacy && pharmacy.name}'s dermatologist employees.`">
                <DermatologistsTable @search="handleSearchDermatologists" :dermatologists="dermatologists" :pharmacyId="pharmacyId" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import DermatologistsTable from '../components/Tables/DermatologistsTable.vue';
import PharmacistsTable from '../components/Tables/PharmacistsTable.vue';
import PharmacyInfo from '../components/Shared/PharmacyInfo'
import toastr from 'toastr'

export default {
  components: { PharmacistsTable, Card, DermatologistsTable, PharmacyInfo },
    data: () => {
        return {
            pharmacyId: null,
            dermatologistSearchName: null,
            pharmacistSearchName: null
        }
    },
    computed: {
        ...mapGetters({
            pharmacy: 'pharmacies/getPharmacy',
            pharmacyResult: 'pharmacies/getResult',
            pharmacists: 'pharmacist/getPharmacists',
            pharmacistResult: 'pharmacist/getResult',
            dermatologists: 'dermatologist/getDermatologists',
            dermatologistResult: 'dermatologist/getResult',
        }),
    },
    watch: {
        dermatologistResult({label, ok, message}) {
            if(label === 'removeFromPharmacy') {
                if(ok) {
                    toastr.success(message);
                } else {
                    toastr.error(message);
                }
                this.dermatologistSearchName ? 
                    this.handleSearchDermatologists(this.dermatologistSearchName)
                    :
                    this.fetchPharmacyDermatologists(this.pharmacyId);
            }
        },
        pharmacistResult({label}) {
            if(label === 'delete' || label === 'add') {
                this.pharmacistSearchName ? 
                    this.handleSearchPharmacists(this.pharmacistSearchName)
                    :
                    this.fetchPharmacyPharmacists(this.pharmacyId);
            }
        },
        pharmacyResult({ok, label, message}) {
            if(label === 'update') {
                if(ok) {
                    this.fetchPharmacy(this.pharmacyId);
                }
            }
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacy: 'pharmacies/getPharmacyById',
            fetchPharmacyPharmacists: 'pharmacist/fetchPharmacyPharmacists',
            searchPharmacyPharmacists: 'pharmacist/searchPharmacyPharmacistsByName',
            fetchPharmacyDermatologists: 'dermatologist/fetchPharmacyDermatologists',
            searchPharmacyDermatologists: 'dermatologist/searchPharmacyDermatologistsByName',
        }),
        handleSearchPharmacists(name) {
            this.pharmacistSearchName = name;
            this.searchPharmacyPharmacists({pharmacyId: this.pharmacyId, name});
        },
        handleSearchDermatologists(name) {
            this.dermatologistSearchName = name;
            this.searchPharmacyDermatologists({pharmacyId: this.pharmacyId, name});
        }
    },
    mounted() {
        this.pharmacyId = this.$route.params.id;
        this.fetchPharmacy(this.pharmacyId);
        this.fetchPharmacyPharmacists(this.pharmacyId);
        this.fetchPharmacyDermatologists(this.pharmacyId);
    }
}
</script>
