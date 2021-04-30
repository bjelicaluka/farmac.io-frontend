<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                    <ComplaintCard :complaint="complaint" :showAnswersButton=false />
                    <div  v-if="complaint">
                        <div v-for="(answer, index) in complaint.answers" :key="index">
                            <ComplaintAnswerCard :answer="answer" />
                        </div>
                    </div>

                    <Form v-if="role === roles.SystemAdmin" @submit="handleSubmit">
                        <FormGroup>
                            <TextArea
                                label="Answer text"
                                placeholder="Write you answer here."
                                v-model="answersText"
                                :isValid="!!answersText"
                                :showErrorMessage="showErrorMessage"
                                errorMessage="Your answer cannot be empty."
                            >
                            </TextArea>
                        </FormGroup>

                        <Button class="pull-right" @click="showErrorMessage = true" type="submit">Answer</Button>

                    </Form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ComplaintCard from '../components/Card/ComplaintCard'
import ComplaintAnswerCard from '../components/Card/ComplaintAnswerCard'
import Form from '../components/Form/Form'
import FormGroup from '../components/Form/FormGroup'
import TextArea from '../components/Form/TextArea'
import Button from '../components/Form/Button'

import { getRoleFromToken, getUserIdFromToken } from '../utils/token'
import { Roles } from '../constants'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {

    components: {
        ComplaintCard,
        ComplaintAnswerCard,
        Form,
        FormGroup,
        TextArea,
        Button
    },

    data: function() {
        return {
            complaintId: null,
            role: null,
            roles: Roles,
            answersText: '',
            showErrorMessage: false
        }
    },

    computed: {
        ...mapGetters({
            complaint: 'complaints/getComplaint',
            result: 'complaints/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchComplaintById: 'complaints/fetchComplaintById',
            createAnswerForComplaint: 'complaints/createAnswerForComplaint'
        }),

        handleSubmit() {
            this.createAnswerForComplaint({
                complaintId: this.complaintId,
                writerId: getUserIdFromToken(),
                text: this.answersText
            });
        }
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'createAnswer')
                return;

            if(ok) {
                toastr.success(message);
                this.showErrorMessage = false;
                this.answersText = '';
                this.fetchComplaintById(this.complaintId);
            } else {
                toastr.error(message);
            }
        }
    },

    mounted() {
        this.role = getRoleFromToken();
        this.complaintId = this.$route.params.id;
        this.fetchComplaintById(this.complaintId);
    }
    
}
</script>