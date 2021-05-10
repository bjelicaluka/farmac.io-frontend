<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Loyalty Programs">
                <LoyaltyProgramsTable :loyaltyPrograms="loyaltyPrograms" />
            </Card>
        </div>
    </div>
</template>

<script>


import Card from '../components/Card/Card'
import LoyaltyProgramsTable from '../components/Tables/LoyaltyProgramsTable'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        Card,
        LoyaltyProgramsTable
    },

    computed: {
        ...mapGetters({
            loyaltyPrograms: 'loyaltyPrograms/getLoyaltyPrograms',
            result: 'loyaltyPrograms/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchLoyaltyPrograms();
        }
    },

    methods: {
        ...mapActions({
            fetchLoyaltyPrograms: 'loyaltyPrograms/fetchLoyaltyPrograms'
        })
    },

    mounted() {
        this.fetchLoyaltyPrograms();
    }

    
}
</script>