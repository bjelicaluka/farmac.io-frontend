<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Suppliers">
                <SuppliersTable :suppliers="suppliers" @pageChange="handlePageChange" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import SuppliersTable from '../components/Tables/SuppliersTable'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        Card,
        SuppliersTable
    },

    data: function() {
        return {
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            suppliers: 'suppliers/getSuppliers',
            result: 'suppliers/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchSuppliersPage(this.page);
        }
    },

    methods: {
        ...mapActions({
            fetchSuppliersPage: 'suppliers/fetchSuppliersPage'
        }),

        handlePageChange(page) {
            this.page = page;
            this.fetchSuppliersPage(this.page);
        }
    },

    mounted() {
        this.fetchSuppliersPage(this.page);
    }

    
}
</script>