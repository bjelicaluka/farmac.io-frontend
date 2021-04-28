<template>
    <div class="content">
        <div class="container-fluid">
            <Card
                title="Chart"
                class="col-6"
            >
                <Chart
                    :seriesData="[{y: 10, x: 'Jan'}, {y: 41, x: 'Feb'}, {y: 31, x: 'Mar'}]"
                />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import { getRoleFromToken, getAccountIdFromToken } from '../utils/token'
import { Roles } from '../constants'
import Card from '../components/Card/Card.vue'
import Chart from '../components/Chart/Chart.vue'


export default {
     components: {
          Card,
          Chart
    },

    data: () => {
        return {
            pharmacyId: null,
            user: {},
            roles: Roles
        }
    },
    computed: {
        ...mapGetters({
            pharmacyAdmin: 'pharmacyAdmins/getPharmacyAdmin'
        })
    },
    watch: {
        pharmacyAdmin() {
            this.pharmacyId = this.pharmacyAdmin.user.pharmacyId;
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacyAdminById: 'pharmacyAdmins/fetchPharmacyAdminById',
        }),
    },
    mounted() {
        this.user = {
            id: getAccountIdFromToken(),
            role: getRoleFromToken()
        };
        this.fetchPharmacyAdminById(this.user.id);
    }
}
</script>
