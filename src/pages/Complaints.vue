<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                    <ComplaintsTable :complaints="complaints" />
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import ComplaintsTable from '../components/Tables/ComplaintsTable'

import { mapActions, mapGetters } from 'vuex'
import { getRoleFromToken, getUserIdFromToken } from '../utils/token'
import { Roles } from '../constants'

export default {
    components: {
        ComplaintsTable
    },

    data: function() {
        return {
            user: {
                id: null,
                role: null
            },
            roles: Roles
        }
    },

    computed: {
        ...mapGetters({
            complaints: 'complaints/getComplaints'
        })
    },

    methods: {
        ...mapActions({
            fetchComplaints: 'complaints/fetchComplaints',
            fetchComplaintsByWriter: 'complaints/fetchComplaintsByWriter'
        })
    },

    mounted() {
        this.user = {
            role: getRoleFromToken(),
            id: getUserIdFromToken()
        };

        if(this.user.role === this.roles.SystemAdmin) {
            this.fetchComplaints();
        } else if (this.user.role === this.roles.Patient) {
            this.fetchComplaintsByWriter(this.user.id);
        }
    }


}
</script>