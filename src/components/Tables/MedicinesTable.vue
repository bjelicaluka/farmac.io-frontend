<template>
    <div>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Manufacturer', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.id" :values="[medicine.name, medicine.manufacturer]">
                    <RoundButton v-if="iconName != '' && buttonOrRating==1" :title="title" @click="clickHandle(medicine.id)" :iconName="iconName"></RoundButton>
                    <StarRating v-if="buttonOrRating==2" v-model="medicine.grade" @rating-selected ="selectedGrade(medicine)" :star-size="20"></StarRating>
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
import StarRating from 'vue-star-rating'

const $ = window.$;

export default {
    props: ['medicines', 'iconName', 'title', 'buttonOrRating'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton,
        StarRating
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
        },
        selectedGrade(medicine) {
            this.$emit('selectedGrade', medicine);
        }
    },

    watch: {
    },

    mounted() {

    }

}
</script>
