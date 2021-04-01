<template>
    <div class="content">
        <div class="container-fluid">
            <Card :title="'Future medicine reservations'" :description="'You can cancel your reservation 24 hours before pickup.'">
                <FutureMedicineReservationsTable />
            </Card>
        </div>
    </div>
</template>

<script>

import Card from '../components/Card/Card.vue'
import FutureMedicineReservationsTable from '../components/Tables/FutureMedicineReservationsTable.vue'
export default {
    components: {
        Card,
        FutureMedicineReservationsTable
    }
}
</script>
