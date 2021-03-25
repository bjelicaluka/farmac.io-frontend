<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card title="Email verification">
            <EmailValidationForm />
        </card>
    </div>
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
        ...mapActions({tryToVerifyEmail: 'emailVerification/tryToVerifyEmail'})
    },
    
    computed: {
        ...mapGetters({
            getGetVerificationEmailResponse: 'emailVerification/getGetVerificationEmailResponse',
            getVerifyEmailResponse: 'emailVerification/getVerifyEmailResponse'
        })
    },

    watch: {
        getGetVerificationEmailResponse({text, code}) {
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
