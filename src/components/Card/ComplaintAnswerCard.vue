<template>

    <div class="card">
        <div class="card-body ">
            <h6 class="card-category text-success">
                <i class="material-icons">question_answer</i> Answer for complaint
            </h6>
            <h4 class="card-title">
                {{!!answer && answer.text}}
            </h4>
        </div>
        <div class="card-footer ">
            <div class="author">
                <i class="material-icons md-light">account_circle</i>
                <span>{{formatName(!!answer && answer.writer)}}</span>
            </div>
            <div v-if="showComplaintButton" @click="goToComplaintPage" class="stats ml-auto">
                <i class="material-icons">feedback</i> Complaint
            </div>
        </div>
    </div>

</template>

<script>


export default {
 
    props: {
        answer: {
            type: Object
        },
        showComplaintButton: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        formatName(user) {
            return `${user.firstName} ${user.lastName}`
        },

        goToComplaintPage() {
            this.$router.push(`/complaints/${this.answer.complaintId}/answers`);
        }
    }
}
</script>

<style scoped>

.material-icons.md-light { color: rgba(153, 153, 153, 1); }

</style>