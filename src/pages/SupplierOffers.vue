<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Your offers for pharmacy orders">
                <SupplierOffersTable :supplierOffers="supplierOffers" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import SupplierOffersTable from '../components/Tables/SupplierOffersTable'

import { mapGetters, mapActions } from 'vuex'
import { getAccountIdFromToken } from '../utils/token'

export default {
    components: {
        Card,
        SupplierOffersTable
    },

    data: function() {
        return {
            supplierId: null
        }
    },

    computed: {
        ...mapGetters({
            supplierOffers: 'supplierOffers/getSupplierOffers',
            result: 'supplierOffers/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchOffersFor(this.supplierId);
        }
    },

    methods: {
        ...mapActions({
            fetchOffersFor: 'supplierOffers/fetchOffersForSupplier'
        })
    },

    mounted() {
        this.supplierId = getAccountIdFromToken();

        this.fetchOffersFor(this.supplierId);
    }

    
}
</script>