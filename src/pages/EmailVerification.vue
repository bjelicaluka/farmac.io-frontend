<template>

    <card title="Email verification">
        <EmailValidationForm>
        </EmailValidationForm>
    </card>

</template>

<script>

import Card from '../components/Card/Card.vue'
import EmailValidationForm from '../components/Forms/EmailVerificationForm.vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import toastr from 'toastr'

export default {
    components: {
        Card,
        EmailValidationForm
    },

    methods: {
        ...mapActions({tryToVerifyEmail: 'tryToVerifyEmail'})
    },
    
    computed: {
        ...mapGetters([
            'getGetVerificationEmailResponse',
            'getVerifyEmailResponse'
        ])
    },

    watch: {
        getGetVerificationEmailResponse: ({text, code}) => {
            if(code === 200) {
                toastr.success(text);
            } else {
                toastr.error(text);
            }
        },

        getVerifyEmailResponse({text, code}) {
            if(code === 200) {
                this.$router.push('/auth');
                toastr.success(text);
            } else {
                toastr.error(text);
            }
        }
    },

    created() {
        const token = this.$route.query.token;
        if(token != null) {
            this.tryToVerifyEmail(token);
        }
    }
}

</script>
