<template>
  <div>
    <Table>
        <TableHead :columnNames="['Pharmacy name', 'Address', 'Average grade', 'Rate']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="pharmacy in pharmacies" 
            :key="pharmacy.id" 
            :values="[pharmacy.name, formAddress(pharmacy), parseFloat(pharmacy.averageGrade).toFixed(2)]">
            <StarRating v-model="pharmacy.grade" @rating-selected="selectedGrade(pharmacy)" :star-size="20"></StarRating>
          </TableRow>
        </TableBody>
    </Table>
  </div>
</template>

<script>
import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'
import {mapGetters, mapActions} from 'vuex'
import StarRating from 'vue-star-rating'
import { getAccountIdFromToken, getUserIdFromToken } from '../../utils/token'
import toastr from 'toastr'


export default {
    components: {
        Table,
        TableBody,
        TableRow,
        TableHead,
        StarRating
    },
    props: ['pharmacies'],
    computed: {
        ...mapGetters({
            getResult: 'grade/getResult'
        })
    },
    methods: {
        ...mapActions({
            ratePharmacy: 'grade/ratePharmacy'
        }),
        formAddress(pharmacy) {
            return `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`;
        },
        selectedGrade(pharmacy) {
            let requestObject = {
                value: pharmacy.grade,
                patientId: getUserIdFromToken(),
                pharmacyId: pharmacy.id
            }
            this.ratePharmacy(requestObject);
        }
    },
    watch: {
        getResult({label, ok, message}) {
            if(label === 'gradePharmacy') {
                if(ok) {
                    toastr.success(message);
                }
                else {
                    toastr.error(message);
                }
            }
        }
        
    }
}
</script>


<style>

</style>