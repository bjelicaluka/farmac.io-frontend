<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                    <div v-for="(answer, index) in answers" :key="index">
                        <ComplaintAnswerCard :answer="answer" :showComplaintButton=true />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import ComplaintAnswerCard from '../components/Card/ComplaintAnswerCard'

import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../utils/token'

export default {
    components: {
        ComplaintAnswerCard
    },

    computed: {
        ...mapGetters({
            answers: 'complaints/getAnswers'
        })
    },

    methods: {
        ...mapActions({
            fetchAnswersByWriter: 'complaints/fetchAnswersByWriter'
        })
    },

    mounted() {
        const userId = getUserIdFromToken();
        this.fetchAnswersByWriter(userId);
        
    }


}
</script>