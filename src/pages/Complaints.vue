<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                    <ComplaintsTable :complaints="complaints" />
                </div>
                
            </div>
            <Button @click="handleLoadMore" class="pull-right">Load more</Button>
        </div>
    </div>

</template>

<script>

import ComplaintsTable from '../components/Tables/ComplaintsTable'
import Button from '../components/Form/Button'

import { mapActions, mapGetters } from 'vuex'
import { getRoleFromToken, getUserIdFromToken } from '../utils/token'
import { Roles } from '../constants'

export default {
    components: {
        ComplaintsTable,
        Button
    },

    data: function() {
        return {
            user: {
                id: null,
                role: null
            },
            roles: Roles,
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            complaints: 'complaints/getComplaints'
        })
    },

    methods: {
        ...mapActions({
            fetchComplaintsPagesTo: 'complaints/fetchComplaintsPagesTo',
            fetchComplaintsByWriterPagesTo: 'complaints/fetchComplaintsByWriterPagesTo'
        }),

        handleLoadMore() {
            this.page++;

            if(this.user.role === this.roles.SystemAdmin) {
                this.fetchComplaintsPagesTo(this.page);
            } else if(this.user.role === this.roles.Patient) {
                this.fetchComplaintsByWriterPagesTo({ writerId: this.user.id, page: this.page });
            }
        }
    },

    mounted() {
        this.user = {
            role: getRoleFromToken(),
            id: getUserIdFromToken()
        };

        if(this.user.role === this.roles.SystemAdmin) {
            this.fetchComplaintsPagesTo(this.page);
        } else if (this.user.role === this.roles.Patient) {
            this.fetchComplaintsByWriterPagesTo({ writerId: this.user.id, page: this.page });
        }
    }


}
</script>