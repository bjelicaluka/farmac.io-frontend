<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="System administrators">
                <SystemAdminsTable :systemAdmins="systemAdmins" @pageChange="handlePageChange" />
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

    data: function() {
        return {
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            systemAdmins: 'systemAdmins/getSystemAdmins',
            result: 'systemAdmins/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchSystemAdminsPage(this.page);
        }
    },

    methods: {
        ...mapActions({
            fetchSystemAdminsPage: 'systemAdmins/fetchSystemAdminsPage'
        }),

        handlePageChange(page) {
            this.page = page;
            this.fetchSystemAdminsPage(this.page);
        }
    },

    mounted() {
        this.fetchSystemAdminsPage(this.page);
    }

    
}
</script>