<template>
    <div class="col-8">
        <card title="Registration">
            <PatientForm />
        </card>
    </div>
</template>

<script>
import Card from '../components/Card/Card.vue'
import PatientForm from '../components/Forms/PatientForm.vue'
import { mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    components: {
        Card,
        PatientForm
    },

    computed: {
        ...mapGetters({ getResult: 'patient/getResult' }),
    },

    watch: {
        getResult({text, code}) {
            if(code === 200) {
                this.$router.push('/auth');
                toastr.success(text);
            } else {
                toastr.error(text);
            }
        }
    }
}
</script>

<style scoped>

</style>