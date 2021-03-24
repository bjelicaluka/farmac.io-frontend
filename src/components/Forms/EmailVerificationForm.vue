<template>
    <Form @submit="handleGetVerificationEmail">
        <form-row>
            <div class="col-12">
                <text-input 
                    label="Email"
                    v-model="email"
                    :showErrorMessage="false"
                    errorMessage="Invalid"
                    type="text"
                />
            </div>
        </form-row>

        <Button type="submit">Send</Button>

        <p class="text-right">
            <router-link to="/auth">Login page</router-link>
        </p>
    </Form>
</template>

<script>

import Button from '../Form/Button.vue'
import Form from '../Form/Form.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'
import {mapActions} from 'vuex';

export default {
   components: {
       Form,
       FormRow,
       TextInput,
       Button
    },
    data: function() {
        return {
            email: ''
        }
    },
    methods: {
        ...mapActions({getVerificationEmail: 'getVerificationEmail'}),

        handleGetVerificationEmail: function() {
            this.getVerificationEmail(this.email);
        }
    }
}

</script>
