<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Your medicines from the stock">
                <SupplierMedicinesTable :supplierMedicines="supplierMedicines" @pageChange="handlePageChange" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import SupplierMedicinesTable from '../components/Tables/SupplierMedicinesTable'

import { mapGetters, mapActions } from 'vuex'
import { getAccountIdFromToken } from '../utils/token'

export default {
    components: {
        Card,
        SupplierMedicinesTable
    },

    data: function() {
        return {
            supplierId: null,
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            supplierMedicines: 'supplierStock/getSupplierMedicines',
            result: 'supplierStock/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchPageOfMedicinesForSupplier({ supplierId: this.supplierId, page: this.page });
        }
    },

    methods: {
        ...mapActions({
            fetchPageOfMedicinesForSupplier: 'supplierStock/fetchPageOfMedicinesForSupplier'
        }),

        handlePageChange(page) {
            this.page = page;
            this.fetchPageOfMedicinesForSupplier({ supplierId: this.supplierId, page: this.page });
        }
    },

    mounted() {
        this.supplierId = getAccountIdFromToken();

        this.fetchPageOfMedicinesForSupplier({ supplierId: this.supplierId, page: this.page });
    }

    
}
</script>