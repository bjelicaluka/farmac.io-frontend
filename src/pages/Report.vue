<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Report' :description="''">
            Page for examination or consultation report...<br>
        </Card>

        <Modal
            modalBoxId="prescribe"
            title="Prescibe medicine"
        >
            <div slot="body">
                check if available
                <SelectOptionInput
                  label="Select medicine"
                  v-model="value"
                  :isValid="!!value"
                  :options="options"
                >
                </SelectOptionInput>
                Current value: {{value}}
            </div>
            <div slot="buttons">
                <InfoModalButtons/>
            </div>
        </Modal>
        <ModalOpener modalBoxId="prescribe">
            <Button class="pull-left">Prescibe medicine</Button>
        </ModalOpener>
    </div> 
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue'
import Button from '../components/Form/Button.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import InfoModalButtons from '../components/Modal/InfoModalButtons.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'

export default {
    data: function() {
        return {
            isValid: false,
            options: this.medicineNames,
            value: '',
            company: "",
            date: null,
            location: null
        }
    },
    components: {
        Card,
        Button,
        Modal,
        ModalOpener,
        InfoModalButtons,
        SelectOptionInput,
    },
    
    computed: {
        ...mapGetters({
            medicineNames: 'medicines/getMedicineNames'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineNames: 'medicines/fetchMedicineNames',
        }),
    },

    mounted() {
        this.fetchMedicineNames(''); //for testing
    }
}

</script>

<style>

</style>