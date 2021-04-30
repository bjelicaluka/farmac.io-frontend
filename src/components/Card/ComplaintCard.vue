<template>

    <div class="card">
        <div class="card-body ">
            <h6 class="card-category text-danger">
                <i class="material-icons">feedback</i> Complaint for {{!!complaint && getComplaintFor()}}
            </h6>
            <h4 class="card-title">
                {{!!complaint && complaint.text}}
            </h4>
        </div>
        <div class="card-footer ">
            <div class="author">
                <i class="material-icons md-light">account_circle</i>
                <span>{{formatName(!!complaint && complaint.writer)}}</span>
            </div>
            <div v-if="showAnswersButton" @click="goToAnswersPage" class="stats ml-auto">
                <i class="material-icons">question_answer</i> Answers
            </div>
        </div>
    </div>

</template>

<script>


export default {
 
    props: {
        complaint: {
            type: Object
        },
        showAnswersButton: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            complaintFor: ''
        }
    },

    methods: {
        getComplaintFor() {
            if(this.complaint.dermatologist) {
                return `Dermatologist ${this.formatName(this.complaint.dermatologist)}`
            }

            if(this.complaint.pharmacist) {
                return `Pharmacist ${this.formatName(this.complaint.pharmacist)}`
            }

            if(this.complaint.pharmacy) {
                return `Pharmacy ${this.complaint.pharmacy.name}`
            }
        },

        formatName(user) {
            return `${user.firstName} ${user.lastName}`
        },

        goToAnswersPage() {
            this.$router.push(`/complaints/${this.complaint.id}/answers`);
        }
    }
}
</script>

<style scoped>

.material-icons.md-light { color: rgba(153, 153, 153, 1); }

</style>