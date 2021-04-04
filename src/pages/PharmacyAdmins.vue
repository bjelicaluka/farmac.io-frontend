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

    computed: {
        ...mapGetters({
            pharmacyAdmins: 'pharmacyAdmins/getPharmacyAdmins',
            result: 'pharmacyAdmins/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchPharmacyAdmins();
        }
    },

    methods: {
        ...mapActions({
            fetchPharmacyAdmins: 'pharmacyAdmins/fetchPharmacyAdmins'
        })
    },

    mounted() {
        this.fetchPharmacyAdmins();
    }

    
}
</script>