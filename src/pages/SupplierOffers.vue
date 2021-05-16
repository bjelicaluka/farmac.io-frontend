<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Your offers for pharmacy orders">
                <SupplierOffersTable :supplierOffers="supplierOffers" @filterChanged="handleFiltering" @pageChange="handleChangePage" />
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
            supplierId: null,
            page: 1,
            status: ''
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
            if(['add', 'update', 'delete', 'cancel'].indexOf(label) !== -1 && ok)
                this.fetchPageOfFilteredOffersFor({
                supplierId: this.supplierId,
                filterBy: this.status,
                page: this.page
            });
        }
    },

    methods: {
        ...mapActions({
            fetchOffersFor: 'supplierOffers/fetchOffersForSupplier',
            fetchPageOfFilteredOffersFor: 'supplierOffers/fetchFilteredOffersForSupplierPage'
        }),

        handleFiltering(filterOption) {
            this.status = filterOption;

            this.fetchPageOfFilteredOffersFor({
                supplierId: this.supplierId,
                filterBy: this.status,
                page: this.page
            });
        },

        handleChangePage(page) {
            this.page = page;

            this.fetchPageOfFilteredOffersFor({
                supplierId: this.supplierId,
                filterBy: this.status,
                page: this.page
            });
        }
    },

    mounted() {
        this.supplierId = getAccountIdFromToken();

        this.fetchPageOfFilteredOffersFor({
                supplierId: this.supplierId,
                filterBy: this.status,
                page: this.page
            });
    }

    
}
</script>