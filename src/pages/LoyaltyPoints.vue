<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Loyalty points" description="Define loyalty points for pharmacy services.">
                <LoyaltyPointsForm 
                    :existingLoyaltyPoints="existingLoyaltyPoints" 
                />
            </Card>
        </div>
    </div>
</template>

<script>

import Card from '../components/Card/Card.vue'
import LoyaltyPointsForm from '../components/Forms/LoyaltyPointsForm.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Card,
        LoyaltyPointsForm
    },

    computed: {
        ...mapGetters({
            existingLoyaltyPoints: 'loyaltyPoints/getLoyaltyPoints',
            result: 'loyaltyPoints/getResult'
        })
    },

    watch: {
        result({label, ok}) {
            if(label !== 'update')
                return;
            
            if(ok) {
                this.fetchLoyaltyPoints();
            }
        }
    },

    methods: {
        ...mapActions({
            fetchLoyaltyPoints: 'loyaltyPoints/fetchLoyaltyPoints'
        })
    },

    mounted() {
        this.fetchLoyaltyPoints();
    }
     
}
</script>
