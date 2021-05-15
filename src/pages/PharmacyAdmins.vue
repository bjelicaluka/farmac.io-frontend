<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Pharmacy administrators">
                <PharmacyAdminsTable :pharmacyAdmins="pharmacyAdmins" @pageChange="handlePageChange" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import PharmacyAdminsTable from '../components/Tables/PharmacyAdminsTable'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Card,
        PharmacyAdminsTable
    },

    data: function() {
        return {
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            pharmacyAdmins: 'pharmacyAdmins/getPharmacyAdmins',
            result: 'pharmacyAdmins/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchPharmacyAdminsPage(this.page);
        }
    },

    methods: {
        ...mapActions({
            fetchPharmacyAdminsPage: 'pharmacyAdmins/fetchPharmacyAdminsPage'
        }),

        handlePageChange(page) {
            this.page = page;
            this.fetchPharmacyAdminsPage(this.page);
        }
    },

    mounted() {
        this.fetchPharmacyAdminsPage(this.page);
    }
}
</script>