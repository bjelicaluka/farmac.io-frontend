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
import toastr from 'toastr'

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
            getPharmacyAdmins: 'pharmacyAdmins/getPharmacyAdmins',
            getAddResult: 'pharmacyAdmins/getAddResult',
            getUpdateResult: 'pharmacyAdmins/getUpdateResult',
            getDeleteResult: 'pharmacyAdmins/getDeleteResult'
        })
    },

    watch: {
        getPharmacyAdmins(pharmacyAdmins) {
            this.pharmacyAdmins = pharmacyAdmins;
        },
        getAddResult({text, code}) {
            if(code === 200) {
                toastr.success(text);
            } else {
                toastr.error(text);
            }
        },
        getUpdateResult({text, code}) {
            if(code === 200) {
                toastr.success(text);
            } else {
                toastr.error(text);
            }
        },
        getDeleteResult({text, code}) {
            if(code === 200) {
                toastr.success(text);
            } else {
                toastr.error(text);
            }
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