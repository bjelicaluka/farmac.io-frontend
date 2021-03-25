<template>
    <card :title="'Sign in'">
        <LoginForm />
    </card>
</template>

<script>
import Card from '../components/Card/Card.vue'
import LoginForm from '../components/Forms/LoginForm.vue'

export default {
    components: {
        Card,
        LoginForm
    }
}
</script>
