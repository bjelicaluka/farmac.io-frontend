<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`Filter dermatologists in the system.`">
                <MedicalStaffSearch @search="handleSearch" />
            </Card>
            <Card title='Dermatologists' :description="`All dermatologists in the system.`">
                <DermatologistsTable :searchField="false" :pagination="true" @pageChange="handlePageChange($event)" :dermatologists="dermatologists" :adminPharmacyId="'08d8f514-5790-438f-88f7-09089846f3d2'" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import DermatologistsTable from '../components/Tables/DermatologistsTable.vue';
import toastr from 'toastr';
import MedicalStaffSearch from '../components/Searchs/MedicalStaffSearch.vue';

export default {
    components: { Card, DermatologistsTable, MedicalStaffSearch },
    data: () => {
        return {
            searchParams: {
                number: 1
            }
        }
    },
    computed: {
        ...mapGetters({
            dermatologists: 'dermatologist/getDermatologists',
            result: 'dermatologist/getResult',
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
            filterDermatologists: 'dermatologist/filterDermatologistsWithWorkPlacesPage',
        }), 

        handleSearch(params) {
            this.searchParams = {...this.searchParams, ...params};
            this.filterDermatologists(params);
        },

        handlePageChange(page) {
            this.searchParams.number = page;
            this.handleSearch(this.searchParams);
        }
    },
    mounted() {
        this.handleSearch({});
    }
}
</script>