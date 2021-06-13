<template>
    <div class="col-8">
        <card title="Registration">
            <PatientForm />
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
import PatientForm from '../components/Forms/PatientForm.vue'

export default {
    components: {
        Card,
        PatientForm
    }
}
</script>

<style scoped>

</style>