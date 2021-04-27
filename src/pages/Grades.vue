<template>
    <div class="content">
        <div class="container-fluid">
            <Card :description="`You can rate the dermatologist which you visited.`" title="Rate dermatologists">
                <MedicalStaffTable :columnNames="['Medical stuff', 'Average grade', 'Rate']" :canRate=true :medicalStaff="canBeRatedDermatologists" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import MedicalStaffTable from '../components/Tables/MedicalStaffTable'
import { getAccountIdFromToken } from '../utils/token'

export default {
    components: { 
        Card,
        MedicalStaffTable 
    },
    data: () => {
        return {
            canBeRatedDermatologists: []
        }
    },
    computed: {
        ...mapGetters({
            getCanBeRatedDermatologists: 'dermatologist/getCanBeRatedDermatologists',
            getResult: 'dermatologist/getResult'
        }),
    },
    watch: {
        getResult({label, ok, message}) {
            if(label == 'grades') {
                if(ok) {
                    this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
                }
            }
        },
        getCanBeRatedDermatologists(canBeRatedDermatologists){
            this.canBeRatedDermatologists = canBeRatedDermatologists;
        }
    },
    methods: {
        ...mapActions({
            fetchCanBeRatedDermatologists: 'dermatologist/fetchCanBeRatedDermatologists'
        }), 


    },
    mounted() {
        this.fetchCanBeRatedDermatologists(getAccountIdFromToken());
    }
}
</script>