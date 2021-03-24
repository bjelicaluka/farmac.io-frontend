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

        <p class="text-right">
            <router-link to="/forgot-password">Forgot password</router-link>
        </p>
        <p class="text-right">
            <router-link to="/email-verification">Email verification</router-link>
        </p>
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
