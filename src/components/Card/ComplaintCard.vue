<template>

    <div class="card">
        <div class="card-body ">
            <h6 class="card-category text-danger">
                <i class="material-icons">feedback</i> For {{!!complaint && getComplaintFor()}}
            </h6>
            <h4 class="card-title">
                {{!!complaint && complaint.text}}
            </h4>
        </div>
        <div class="card-footer ">
            <div class="author">
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" rel="nofollow" alt="..." class="avatar img-raised">
                <span>{{formatName(!!complaint && complaint.writer)}}</span>
            </div>
            <div v-if="showAnswersButton" @click="goToAnswersPage" class="stats ml-auto">
                <i class="material-icons">chat_bubble</i> Answers
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