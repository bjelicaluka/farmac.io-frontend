<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Suppliers">
                <SuppliersTable :suppliers="suppliers" />
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

    computed: {
        ...mapGetters({
            suppliers: 'suppliers/getSuppliers',
            result: 'suppliers/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchSuppliers();
        }
    },

    methods: {
        ...mapActions({
            fetchSuppliers: 'suppliers/fetchSuppliers'
        })
    },

    mounted() {
        this.fetchSuppliers();
    }

    
}
</script>