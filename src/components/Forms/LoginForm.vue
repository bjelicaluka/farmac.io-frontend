<template>
    <Form>
        <form-row>
            <div class="col-12">
                <text-input 
                    label="Username"
                    :showErrorMessage="false"
                    errorMessage="Invalid"
                    type="text"
                />
            </div>
        </form-row>

        <form-row>
            <div class="col-12">
                <text-input 
                    label="Password"
                    :showErrorMessage="false"
                    errorMessage="Invalid"
                    type="password"
                />
            </div>
        </form-row>

        <Button>Sign In</Button>

        <div class="row mt-4">
            <p class="text-left col-4">
                <router-link to="/patient-registration">Registration</router-link>
            </p>
            <p class="text-center col-4">
                <router-link to="/forgot-password">Forgot password</router-link>
            </p>
            <p class="text-right col-4">
                <router-link to="/email-verification">Email verification</router-link>
            </p>
        </div>
    </Form>
</template>

<script>

import Button from '../Form/Button.vue'
import Form from '../Form/Form.vue'
import FormRow from '../Form/FormRow.vue'
import TextInput from '../Form/TextInput.vue'

export default {
   components: {
       Form,
       FormRow,
       TextInput,
       Button
    }
}

</script>
