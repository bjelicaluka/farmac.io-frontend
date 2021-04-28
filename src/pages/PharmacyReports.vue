<template>
    <div class="content">
        <div class="container-fluid">
            <Card>
                <ReportTimeIntervalPickerForm @intervalTypeChange="intervalType = $event" :pharmacyId="pharmacyId" /> 
            </Card>
            <Card
                title="Examinations"
                v-if="examinationReportsChartData.length"
            >
                <ExaminationsChart
                    :seriesData="examinationReportsChartData"
                />
            </Card>
            <Card
                title="Medicine Consumption"
                v-if="medicineConsumptionReportsChartData.length"
            >
                <MedicineConsumptionChart
                    :seriesData="medicineConsumptionReportsChartData"
                />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import { getRoleFromToken, getAccountIdFromToken } from '../utils/token'
import { Roles } from '../constants'
import Card from '../components/Card/Card.vue'
import ExaminationsChart from '../components/Charts/ExaminationsChart.vue'
import ReportTimeIntervalPickerForm from '../components/Forms/ReportTimeIntervalPickerForm'
import moment from 'moment'
import MedicineConsumptionChart from '../components/Charts/MedicineConsumptionChart.vue'


export default {
     components: {
          Card,
          ExaminationsChart,
          ReportTimeIntervalPickerForm,
          MedicineConsumptionChart
    },

    data: () => {
        return {
            pharmacyId: null,
            user: {},
            roles: Roles,
            examinationReportsChartData: [],
            medicineConsumptionReportsChartData: [],
            intervalType: 'month'
        }
    },
    computed: {
        ...mapGetters({
            pharmacyAdmin: 'pharmacyAdmins/getPharmacyAdmin',
            examinationReports: 'pharmacyReports/getExaminationReports',
            medicineConsumptionReports: 'pharmacyReports/getMedicineConsumptionReports'
        })
    },
    watch: {
        pharmacyAdmin() {
            this.pharmacyId = this.pharmacyAdmin.user.pharmacyId;
        },
        examinationReports() {
            this.examinationReportsChartData = this.examinationReports.map(ex => {
                const groupName = this.intervalType === 'month' ? ex.group : moment(ex.group, 'MM').format('MMMM');
                return { y: ex.value, x: groupName }
            });
        },
        medicineConsumptionReports() {
            this.medicineConsumptionReportsChartData = this.medicineConsumptionReports.map(mc => {
                const groupName = this.intervalType === 'month' ? mc.group : moment(mc.group, 'MM').format('MMMM');
                return { y: mc.value, x: groupName }
            });
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacyAdminById: 'pharmacyAdmins/fetchPharmacyAdminById',
        }),

    },
    mounted() {
        this.user = {
            id: getAccountIdFromToken(),
            role: getRoleFromToken()
        };
        this.fetchPharmacyAdminById(this.user.id);
    }
}
</script>
