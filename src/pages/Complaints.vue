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
import { getRoleFromToken } from '../utils/token'
import { Roles } from '../constants'

export default {
    components: {
        ComplaintsTable
    },

    data: function() {
        return {
            user: {
                role: null,
                roles: Roles
            }
        }
    },

    computed: {
        ...mapGetters({
            complaints: 'complaints/getComplaints'
        })
    },

    methods: {
        ...mapActions({
            fetchComplaints: 'complaints/fetchComplaints'
        })
    },

    mounted() {
        this.user.role = getRoleFromToken();
        if(this.user.role === Roles.SystemAdmin) {
            this.fetchComplaints();
        }
    }


}
</script>