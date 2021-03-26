<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Pharmacists' :description="`${pharmacy && pharmacy.name}'s pharmacists employees.`">
                <PharmacistsTable :pharmacists="pharmacists" />
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
    watch: {
        pharmacists(v) {
            console.log(v)
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacy: 'pharmacies/getPharmacyById',
            fetchPharmacyPharmacists: 'pharmacist/fetchPharmacyPharmacists',
            searchPharmacyPharmacists: 'pharmacist/searchPharmacyPharmacistsByName',
        }),
    },
    mounted() {
        const id = this.$route.params.id;
        this.fetchPharmacy(id);
        // this.fetchPharmacyPharmacists(id);
        this.searchPharmacyPharmacists({pharmacyId: id, name: 'lu'})
    }
}
</script>
