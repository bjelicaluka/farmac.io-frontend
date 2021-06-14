<template>
    <div class="content">
        <div class="container-fluid">
            <Card :title="'Medicine reservations'" :description="'You can cancel your reservation 24 hours before pickup.'">
                <FutureMedicineReservationsTable :canCancel="true"/>
            </Card>
            <Card :title="'Medicine reservations that you picked up.'">
                <FutureMedicineReservationsTable :canCancel="false"/>
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
