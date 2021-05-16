<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Loyalty Programs">
                <LoyaltyProgramsTable :loyaltyPrograms="loyaltyPrograms" @pageChange="handlePageChange" />
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

    data: function() {
        return {
            page: 1
        }
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
                this.fetchLoyaltyProgramsPage(this.page);
        }
    },

    methods: {
        ...mapActions({
            fetchLoyaltyProgramsPage: 'loyaltyPrograms/fetchLoyaltyProgramsPage'
        }),

        handlePageChange(page) {
            this.page = page;
            this.fetchLoyaltyProgramsPage(this.page);
        }
    },

    mounted() {
        this.fetchLoyaltyProgramsPage(this.page);
    }

    
}
</script>