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

            <Button @click="handleLoadMore" class="pull-right">Load more</Button>
        </div>
    </div>

</template>

<script>

import ComplaintAnswerCard from '../components/Card/ComplaintAnswerCard'
import Button from '../components/Form/Button'

import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../utils/token'

export default {
    components: {
        ComplaintAnswerCard,
        Button
    },

    data: function() {
        return {
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            answers: 'complaints/getAnswers'
        })
    },

    methods: {
        ...mapActions({
            fetchAnswersByWriterPagesTo: 'complaints/fetchAnswersByWriterPagesTo'
        }),

        handleLoadMore() {
            this.page++;
            const userId = getUserIdFromToken();
            this.fetchAnswersByWriterPagesTo({ writerId: userId, page: this.page });
        }
    },

    mounted() {
        const userId = getUserIdFromToken();
        this.fetchAnswersByWriterPagesTo({ writerId: userId, page: this.page });
        
    }


}
</script>