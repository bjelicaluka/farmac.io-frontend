<template>
    <div>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Manufacturer', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.id" :values="[medicine.name, medicine.manufacturer]">
                    <RoundButton v-if="iconName != ''" :title="title" @click="clickHandle(medicine.id)" :iconName="iconName"></RoundButton>
                </TableRow>
        </TableBody>
    </Table>
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import RoundButton from '../Form/RoundButton.vue'
import { mapActions, mapGetters } from 'vuex'

const $ = window.$;

export default {
    props: ['medicines', 'iconName', 'title'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton
    },

    data: function(){
        return{

        }
    },

    computed: {
        ...mapGetters({

        })
    },

    methods: {
        ...mapActions({

        }),
        clickHandle(medicineId){
            this.$emit('clickButton', medicineId);
        }
    },

    watch: {
    },

    mounted() {

    }

}
</script>
