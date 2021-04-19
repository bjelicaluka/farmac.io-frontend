<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`Filter pharmacists in the system.`">
                <MedicalStaffSearch @search="handleSearch" />
            </Card>
            <Card title='Pharmacists' :description="`All pharmacists in the system.`">
                <PharmacistsTable :searchField="false" @search="handleSearchPharmacists" :pharmacists="pharmacists" :adminPharmacyId="'08d8f514-5790-438f-88f7-09089846f3d2'" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import PharmacistsTable from '../components/Tables/PharmacistsTable.vue';
import toastr from 'toastr';
import MedicalStaffSearch from '../components/Searchs/MedicalStaffSearch.vue';

export default {
    components: { Card, PharmacistsTable, MedicalStaffSearch },
    data: () => {
        return {
            searchParams: {}
        }
    },
    computed: {
        ...mapGetters({
            pharmacists: 'pharmacist/getPharmacists',
            result: 'pharmacist/getResult',
        }),
    },
    watch: {
        result({label, ok, message}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.handleSearch(this.searchParams);


            if(label !== 'removeFromPharmacy' && label !== 'addToPharmacy')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
            this.handleSearch(this.searchParams);
        }
    },
    methods: {
        ...mapActions({
            filterPharmacists: 'pharmacist/filterPharmacists',
        }), 

        handleSearch(params) {
            this.searchParams = params;
            this.filterPharmacists(params);
        },
    },
    mounted() {
        this.handleSearch();
    }
}
</script>