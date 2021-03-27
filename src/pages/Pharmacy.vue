<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Pharmacists' :description="`${pharmacy && pharmacy.name}'s pharmacists employees.`">
                <PharmacistsTable @search="handleSearch" :pharmacists="pharmacists" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import PharmacistsTable from '../components/Tables/PharmacistsTable.vue';

export default {
  components: { PharmacistsTable, Card },
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            pharmacy: 'pharmacies/getPharmacy',
            pharmacists: 'pharmacist/getPharmacists'
        }),
    },
    methods: {
        ...mapActions({
            fetchPharmacy: 'pharmacies/getPharmacyById',
            fetchPharmacyPharmacists: 'pharmacist/fetchPharmacyPharmacists',
            searchPharmacyPharmacists: 'pharmacist/searchPharmacyPharmacistsByName',
        }),
        handleSearch(name) {
            const pharmacyId = this.$route.params.id;
            this.searchPharmacyPharmacists({pharmacyId, name});
        }
    },
    mounted() {
        const id = this.$route.params.id;
        this.fetchPharmacy(id);
        this.fetchPharmacyPharmacists(id);
    }
}
</script>
