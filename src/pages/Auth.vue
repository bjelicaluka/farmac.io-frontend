<template>
    <card :title="'Sign in'">
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

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
        </Form>
    </card>
</template>

<script>
import Card from '../components/Card/Card.vue'
import Button from '../components/Form/Button.vue'
import Form from '../components/Form/Form.vue'
import FormRow from '../components/Form/FormRow.vue'
import TextInput from '../components/Form/TextInput.vue'
export default {
components: { Card, Form, TextInput, Button, FormRow },
    data() {
        return {}
    }
}
</script>
