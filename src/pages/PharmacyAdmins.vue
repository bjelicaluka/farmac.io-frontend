<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Pharmacy administrators">
                <PharmacyAdminsTable :pharmacyAdmins="pharmacyAdmins" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import PharmacyAdminsTable from '../components/Tables/PharmacyAdminsTable'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        Card,
        PharmacyAdminsTable
    },

    data: function() {
        return {
            pharmacyAdmins: []
        }
    },

    computed: {
        ...mapGetters({
            getPharmacyAdmins: 'pharmacyAdmins/getPharmacyAdmins'
        })
    },

    watch: {
        getPharmacyAdmins(pharmacyAdmins) {
            this.pharmacyAdmins = pharmacyAdmins;
        }
    },

    methods: {
        ...mapActions({
            fetchPharmacyAdmins: 'pharmacyAdmins/getPharmacyAdmins'
        })
    },

    mounted() {
        this.fetchPharmacyAdmins();
    }

    
}
</script>