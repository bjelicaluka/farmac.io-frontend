<template>
  <div>
    <Table>
        <TableHead :columnNames="['Medical Staff', 'Date', 'Time', 'Duration', 'Price', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="a in appointments" 
            :key="a.id" 
            :values="[`${a.medicalStaff.firstName} ${a.medicalStaff.lastName} (${a.medicalStaff.averageGrade})`, formatDate(a.dateTime), formatTime(a.dateTime), formatDuration(a.duration), a.price + ' RSD']"
          >
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
import toastr from 'toastr'
import moment from 'moment'

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
  },
  props: ['appointments'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({

    })
  },
  watch: {

  },
  methods: {
    ...mapActions({
        
    }),
    formatDate(d) {
      return moment(d).format('ll');
    },
    formatTime(d) {
      return moment(d).format('LT');
    },
    formatDuration(min) {
      return moment.utc(moment.duration(min, "minutes").asMilliseconds()).format("HH:mm") + ' min';
    }
  },
}
</script>


<style>

</style>