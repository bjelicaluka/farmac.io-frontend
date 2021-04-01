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
        ...mapGetters({ result: 'patient/getResult' }),
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'add')
                return;

            if(ok) {
                this.$router.push('/auth');
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    }
}
</script>

<style scoped>

</style>