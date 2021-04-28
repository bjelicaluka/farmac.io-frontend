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
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" rel="nofollow" alt="..." class="avatar img-raised">
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