<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="System administrators">
                <SystemAdminsTable :systemAdmins="systemAdmins" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import SystemAdminsTable from '../components/Tables/SystemAdminsTable'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        Card,
        SystemAdminsTable
    },

    computed: {
        ...mapGetters({
            systemAdmins: 'systemAdmins/getSystemAdmins'
        })
    },

    methods: {
        ...mapActions({
            fetchSystemAdmins: 'systemAdmins/fetchSystemAdmins'
        })
    },

    mounted() {
        this.fetchSystemAdmins();
    }

    
}
</script>