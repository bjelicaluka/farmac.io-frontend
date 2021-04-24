<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Your medicines from the stock">
                <SupplierMedicinesTable :supplierMedicines="supplierMedicines" />
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
            supplierId: null
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
                this.fetchMedicinesFor(this.supplierId);
        }
    },

    methods: {
        ...mapActions({
            fetchMedicinesFor: 'supplierStock/fetchMedicinesForSupplier'
        })
    },

    mounted() {
        this.supplierId = getAccountIdFromToken();

        this.fetchMedicinesFor(this.supplierId);
    }

    
}
</script>