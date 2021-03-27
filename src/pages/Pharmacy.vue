<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Pharmacists' :description="`${pharmacy && pharmacy.name}'s pharmacist employees.`">
                <PharmacistsTable @search="handleSearchPharmacists" :pharmacists="pharmacists" />
            </Card>
            <Card title='Dermatologists' :description="`${pharmacy && pharmacy.name}'s dermatologist employees.`">
                <DermatologistsTable @search="handleSearchDermatologists" :dermatologists="dermatologists" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import DermatologistsTable from '../components/Tables/DermatologistsTable.vue';
import PharmacistsTable from '../components/Tables/PharmacistsTable.vue';

export default {
  components: { PharmacistsTable, Card, DermatologistsTable },
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            pharmacy: 'pharmacies/getPharmacy',
            pharmacists: 'pharmacist/getPharmacists',
            dermatologists: 'dermatologist/getDermatologists'
        }),
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
            const pharmacyId = this.$route.params.id;
            this.searchPharmacyPharmacists({pharmacyId, name});
        },
        handleSearchDermatologists(name) {
            const pharmacyId = this.$route.params.id;
            this.searchPharmacyDermatologists({pharmacyId, name});
        }
    },
    mounted() {
        const id = this.$route.params.id;
        this.fetchPharmacy(id);
        this.fetchPharmacyPharmacists(id);
        this.fetchPharmacyDermatologists(id);
    }
}
</script>
