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
                  :options="this.medicineNames"
                >
                </SelectOptionInput>
                <Button @click="checkMedicine">Check</Button>                
                <Table>
                    <TableHead :columnNames="['Name', 'Price', 'In stock', '']"></TableHead>
                    <TableBody>
                    <TableRow
                        v-for="m in smallMedicines" 
                        :key="m.id" 
                        :values="[m.name, m.price+' din', m.inStock]"
                    >
                    </TableRow>
                    </TableBody>
                </Table>
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
import Table from '../components/Table/Table.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableRow from '../components/Table/TableRow.vue'

export default {
    data: function() {
        return {
            isValid: false,
            value: '',
            company: "",
            date: null,
            location: null,
            pharmacyId: '08d8f514-5790-438f-88f7-09089846f3d2' //for testing
        }
    },
    components: {
        Card,
        Button,
        Modal,
        ModalOpener,
        InfoModalButtons,
        SelectOptionInput,
        Table,
        TableBody,
        TableHead,
        TableRow,
    },
    
    computed: {
        ...mapGetters({
            medicineNames: 'medicines/getMedicineNames',
            smallMedicines: 'medicines/getSmallMedicines'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineNames: 'medicines/fetchMedicineNames',
            fetchMedicinesOrReplacements: 'medicines/fetchMedicinesOrReplacements'
        }),
        checkMedicine() {
            this.fetchMedicinesOrReplacements({pharmacyId:this.pharmacyId, name:this.value});
        }
    },

    mounted() {
        this.fetchMedicineNames(this.pharmacyId);
    }
}

</script>

<style>

</style>