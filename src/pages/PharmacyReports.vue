<template>
    <div class="content">
        <div class="container-fluid">
            <Card>
                <ReportTimeIntervalPickerForm @intervalTypeChange="intervalType = $event" :pharmacyId="pharmacyId" /> 
            </Card>
            <Card
                title="Examinations"
                class="col-6"
                v-if="examinationReportsChartData.length"
            >
                <ExaminationsChart
                    :seriesData="examinationReportsChartData"
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


export default {
     components: {
          Card,
          ExaminationsChart,
          ReportTimeIntervalPickerForm
    },

    data: () => {
        return {
            pharmacyId: null,
            user: {},
            roles: Roles,
            examinationReportsChartData: [],
            intervalType: 'month'
        }
    },
    computed: {
        ...mapGetters({
            pharmacyAdmin: 'pharmacyAdmins/getPharmacyAdmin',
            examinationReports: 'pharmacyReports/getExaminationReports'
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
