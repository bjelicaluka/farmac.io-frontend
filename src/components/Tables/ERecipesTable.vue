<template>
    <div>
    <Table>
        <TableHead :columnNames="['Code', 'Issuing date', 'Is used', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(eRecipe, index) in eRecipes" :key="index" :id="eRecipe.id" :values="[eRecipe.uniqueId, formatDate(eRecipe.issuingDate), 
                eRecipe.isUsed ? 'Yes' : 'No']">
                    <RoundButton @click="seeMedicines(eRecipe.id)" iconName="medication"></RoundButton>
                </TableRow>
                <Pagination @pageChange="$emit('pageChange', $event)" />
        </TableBody>
    </Table>
    <Modal modalBoxId="medicinesInERecipe" title="Medicines in eRecipe">
        <div slot="body">
            <div class="row justify-content-center align-items-center">
                <vue-qrcode :value="`${selectedERecipeId}`"/>
            </div>
            <MedicinesInERecipeTable :medicines="medicinesInERecipe" />
        </div>
    </Modal>
    <ModalOpener id="medicinesInERecipeOpener" class="d-none" modalBoxId="medicinesInERecipe" />
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import RoundButton from '../Form/RoundButton.vue'
import Modal from '../Modal/Modal'
import ModalOpener from '../Modal/ModalOpener'
import MedicinesInERecipeTable from '../Tables/MedicinesInERecipeTable'
import Pagination from '../Table/Pagination'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import VueQrcode from 'vue-qrcode'

export default {
    props: ['eRecipes'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton,
        Modal,
        ModalOpener,
        MedicinesInERecipeTable,
        VueQrcode,
        Pagination
    },

    data: function() {
        return{
            medicinesInERecipe: [],
            selectedERecipeId: null
        }
    },

    computed: {
        ...mapGetters({
            getMedicinesInERecipe: 'eRecipes/getMedicinesInERecipe'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicinesInERecipes: 'eRecipes/fetchMedicinesInERecipes'
        }),
        seeMedicines(eRecipeId) {
            this.selectedERecipeId = eRecipeId;
            this.fetchMedicinesInERecipes(eRecipeId);
            document.getElementById('medicinesInERecipeOpener').click();
        },
        formatDate(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        }
    },

    watch: {
        getMedicinesInERecipe(medicines) {
            this.medicinesInERecipe = medicines;
        }
    }

}
</script>
