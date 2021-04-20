<template>
    <div class="col-8 card" style="min-height:90vh;">
        <div class="card card-nav-tabs card-plain" >
            <div class="card-header card-header-primary">
                <div class="nav-tabs-navigation">
                    <div class="nav-tabs-wrapper">
                        <ul class="nav nav-tabs" data-tabs="tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#profile" data-toggle="tab"><i class="material-icons">account_circle</i>Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#password" data-toggle="tab"><i class="material-icons">lock</i>Password</a>
                            </li>
                            <li v-if="patient" class="nav-item">
                                <a class="nav-link" href="#allergies" data-toggle="tab"><i class="material-icons">local_pharmacy</i>Allergies</a>
                            </li>
                            <li v-if="patient" class="nav-item">
                                <a class="nav-link" href="#negativePoints" data-toggle="tab"><i class="material-icons">warning_amber</i>Negative points</a>
                            </li>
                            <li v-if="patient" class="nav-item">
                                <a class="nav-link" href="#followings" data-toggle="tab"><i class="material-icons">bookmark</i>Followings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="tab-content text-center">
                    <div class="tab-pane active" id="profile">
                        <UpdateProfileForm/>
                    </div>
                    <div class="tab-pane" id="password">
                        <div class=" justify-content-center align-items-center">
                            <ChangePasswordForm/>
                        </div>
                    </div>
                    <div v-if="patient" class="tab-pane" id="allergies">
                        <div class=" justify-content-center align-items-center">
                            <AllergiesForm/>
                        </div>
                    </div>
                    <div v-if="patient" class="tab-pane" id="negativePoints">
                        <div class=" justify-content-center align-items-center">
                            <br />
                            <br />
                            <h3>You have {{ patient.user.negativePoints }} negative points.</h3>
                            <br />
                            <p>If you have 3 or more negative points you cannot reserve medicines and book appointments with a dermatologist and pharmacist.
                                You get negative points if you do not take the reserved medicine or do not appear at the examination or counseling. Negative points
                                will be deleted at the beginning of each month"</p>
                        </div>
                    </div>
                    <div v-if="patient" class="tab-pane" id="followings">
                        <div class=" justify-content-center align-items-center">
                            <FollowingsTable :followings="patientFollowings" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import UpdateProfileForm from '../components/Forms/UpdateProfileForm'
import ChangePasswordForm from '../components/Forms/ChangePasswordForm'
import AllergiesForm from '../components/Forms/AllergiesForm'
import FollowingsTable from '../components/Tables/FollowingsTable'
import { mapActions, mapGetters } from 'vuex'
import { getAccountIdFromToken, getRoleFromToken } from '../utils/token'
import { Roles } from '../constants'

export default {
    components: {
        ChangePasswordForm,
        AllergiesForm,
        UpdateProfileForm,
        FollowingsTable
    },
    data: function() {
        return {
            patient: null,
        }
    },
    computed: {
        ...mapGetters({
            getPatient: 'patient/getPatient',
            patientFollowings: 'followings/getFollowings'
        })
    },
    watch: {
        getPatient(patient){
            this.patient = patient;
        }
    },
    methods: {
        ...mapActions({
            fetchPatient: 'patient/fetchPatientById',
            fetchPatientFollowings: 'followings/fetchPatientFollowings'
        })
    },
    mounted() {
        const role = getRoleFromToken();
        const accountId = getAccountIdFromToken();

        if(role === Roles.Patient) {
            this.fetchPatient(accountId);
            this.fetchPatientFollowings(accountId);
        }
    }
}
</script>

