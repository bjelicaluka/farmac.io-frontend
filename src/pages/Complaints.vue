<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                    <div v-if="user.role === roles.SystemAdmin" class="col-4" >
                        <SelectOptionInput
                            label="All complaints"
                            :showLabel=false
                            v-model="selectedComplaintOption"
                            :options="complaintOptions"
                        />
                    </div>

                    <ComplaintsTable :complaints="complaints" />
                </div>
                
            </div>
            <Button @click="handleLoadMore" class="pull-right">Load more</Button>
        </div>
    </div>

</template>

<script>

const complaintOptions = [
    {
        label: 'Not answered complaints',
        value: 'notanswered'
    }
]

import ComplaintsTable from '../components/Tables/ComplaintsTable'
import Button from '../components/Form/Button'
import SelectOptionInput from '../components/Form/SelectOptionInput'

import { mapActions, mapGetters } from 'vuex'
import { getRoleFromToken, getUserIdFromToken } from '../utils/token'
import { Roles } from '../constants'

export default {
    components: {
        ComplaintsTable,
        Button,
        SelectOptionInput
    },

    data: function() {
        return {
            selectedComplaintOption: null,
            showAll: true,
            complaintOptions: complaintOptions,
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

    watch: {
        selectedComplaintOption() {
            this.showAll = this.selectedComplaintOption === '';
            this.fetchComplaintsPagesTo({ showAll: this.showAll, page: this.page });
        }
    },

    methods: {
        ...mapActions({
            fetchComplaintsPagesTo: 'complaints/fetchComplaintsPagesTo',
            fetchComplaintsByWriterPagesTo: 'complaints/fetchComplaintsByWriterPagesTo'
        }),

        handleLoadMore() {
            this.page++;

            if(this.user.role === this.roles.SystemAdmin) {
                this.fetchComplaintsPagesTo({ showAll: this.showAll, page: this.page });
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
            this.fetchComplaintsPagesTo({ showAll: this.showAll, page: this.page });
        } else if (this.user.role === this.roles.Patient) {
            this.fetchComplaintsByWriterPagesTo({ writerId: this.user.id, page: this.page });
        }
    }


}
</script>