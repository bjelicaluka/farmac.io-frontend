<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`Filter pharmacists in the system.`">
                <MedicalStaffSearch @search="handleSearch" />
            </Card>
            <Card title='Pharmacists' :description="`All pharmacists in the system.`">
                <PharmacistsTable :searchField="false" :pagination="true" @pageChange="handlePageChange($event)" :pharmacists="pharmacists" :adminPharmacyId="pharmacyAdmin && pharmacyAdmin.user.pharmacyId" :isAdminOfPharmacy="isAdminOfPharmacy" />
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

import { Roles } from '../constants'
import { getRoleFromToken, getAccountIdFromToken } from '../utils/token'

export default {
    components: { Card, PharmacistsTable, MedicalStaffSearch },
    data: () => {
        return {
            searchParams: {
                number: 1
            },
            isAdminOfPharmacy: false
        }
    },
    computed: {
        ...mapGetters({
            pharmacists: 'pharmacist/getPharmacists',
            result: 'pharmacist/getResult',
            pharmacyAdmin: 'pharmacyAdmins/getPharmacyAdmin'
        }),
    },
    watch: {
        pharmacyAdmin() {
            this.isAdminOfPharmacy = true;
        },

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
            filterPharmacists: 'pharmacist/filterPharmacistsPage',
            fetchPharmacyAdminById: 'pharmacyAdmins/fetchPharmacyAdminById'
        }), 

        handleSearch(params) {
            this.searchParams = {...this.searchParams, ...params};
            this.filterPharmacists(params);
        },

        handlePageChange(page) {
            this.searchParams.number = page;
            this.handleSearch(this.searchParams);
        }
    },
    mounted() {
        if(getRoleFromToken() === Roles.PharmacyAdmin) {
            this.fetchPharmacyAdminById(getAccountIdFromToken());
        } 

        this.handleSearch({});
    }
}
</script>