<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card title="Email verification">
            <EmailValidationForm />
        </card>
        <div>
            <p class="text-center">
                <router-link to="/">Back to home page</router-link>
            </p>
        </div>

    </div>
</template>

<script>

import Card from '../components/Card/Card.vue'
import EmailValidationForm from '../components/Forms/EmailVerificationForm.vue'
import { mapActions, mapGetters} from 'vuex'
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
            result: 'emailVerification/getResult',
        })
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'verification')
                return;

            if(ok) {
                toastr.success(message);
                this.$router.push('/auth');
            } else {
                toastr.error(message);
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
