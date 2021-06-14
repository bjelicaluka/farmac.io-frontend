<template>
  <div>
    <FormRow v-if="sortComponent">
      <div class="col-3">
        <SelectOptionInput
          label="Select sort criteria"
          v-model="selectedValue"
          :options="options"
        >
        </SelectOptionInput>
      </div>
    </FormRow>
    <Table>
        <TableHead :columnNames="['Medical Staff', 'Reserved', 'Date', 'Time', 'Duration', 'Price', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="a in appointments" 
            :key="a.id" 
            :values="[`${a.medicalStaff.firstName} ${a.medicalStaff.lastName} (${parseFloat(a.medicalStaff.averageGrade).toFixed(2)})`, a.isReserved ? 'Yes' : 'No', formatDate(a.dateTime), formatTime(a.dateTime), formatDuration(a.duration), a.price + ' RSD']"
          >
            <div v-if="!a.isReserved && user.role === Roles.Patient" class="pull-right text-gray">
              <drop-down-menu>
                  <drop-down-item
                    @click="handleMakeAppointmentClick(a)"
                  >
                    Make appointment
                  </drop-down-item>
              </drop-down-menu>
            </div>
          </TableRow>
          <Pagination @pageChange="$emit('pageChange', $event)" />
        </TableBody>
    </Table>
  </div>
</template>

<script>
import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
import SelectOptionInput from '../Form/SelectOptionInput.vue'
import FormRow from '../Form/FormRow.vue'
import {mapGetters, mapActions} from 'vuex'
import toastr from 'toastr'
import moment from 'moment'
import { getAccountIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/token'
import { Roles } from '../../constants'
import Pagination from '../Table/Pagination.vue'

let selectOptions = [
  {
    value: 'grade-asc',
    label: 'Grade - Ascending'
  },
  {
    value: 'grade-desc',
    label: 'Grade - Descending'
  },
  {
    value: 'price-asc',
    label: 'Price - Ascending'
  },
  {
    value: 'price-desc',
    label: 'Price - Descending'
  }
];

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    DropDownItem,
    DropDownMenu,
    SelectOptionInput,
    FormRow,
    Pagination
  },
  props: {
    appointments: {}, 
    pharmacyId: {},
    sortComponent: {
      default: true
    },
    isAdminOfPharmacy: {
      default: false
    }
  },
  data() {
    return {
      selectedAppointment: null,
      options: selectOptions,
      user: {},
      Roles,
      selectedValue: ''
    }
  },
  mounted() {
    this.user = {
      id: getAccountIdFromToken(),
      role: getRoleFromToken()
    }
  },
  computed: {
    ...mapGetters({
      result: 'appointments/getResult'
    })
  },
  watch: {
    result({label, ok, message}) {
      if(label === 'delete' || label==='reserveAppointment') {
        if(ok) {
          toastr.success(message);
        } else {
          toastr.error(message);
        }
      }
    },
    selectedValue (){
      this.handleChangeSort();
    }
  },
  methods: {
    ...mapActions({
        reserveAppointment: 'appointments/reserveAppointment',
        sortAppointments: 'appointments/sortAppointments'
    }),
    handleDeleteClick(appointment) {
      this.selectedAppointment = appointment;
    },
    formatDate(d) {
      return moment(d).format('ll');
    },
    formatTime(d) {
      return moment(d).format('LT');
    },
    formatDuration(min) {
      return moment.utc(moment.duration(min, "minutes").asMilliseconds()).format("HH:mm");
    }
    ,
    handleMakeAppointmentClick(appointment) {
      let appointmentRequest = { 'appointmentId' : appointment.id, "patientId" : getUserIdFromToken(), "pharmacyId" : appointment.pharmacyId};
      this.reserveAppointment(appointmentRequest);
    },
    handleChangeSort(){
      let criteria = this.selectedValue.split("-")[0]
      const isAsc = this.selectedValue.split("-")[1] == 'asc';
      this.sortAppointments({
        'criteria' : criteria,
        'isAsc' : isAsc,
        'pharmacyId' : this.pharmacyId
      });
    }
  },
}
</script>


<style>

</style>