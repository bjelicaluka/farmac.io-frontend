<template>
    <div>
        <div class="card card-chart">
            <div class="card-header card-header-rose" data-header-animation="true">
                <img src="https://i.ibb.co/tb2GmTN/pharmacy-Logo-2.png"/>
            </div>
            <div class="card-body">
                <div v-if="role == roles.SystemAdmin" class="card-actions">
                    <Button @click="onDeleteSelected" class="btn btn-danger btn-link" rel="tooltip" data-placement="bottom" title="Delete">
                        <i class="material-icons">delete</i>
                    </Button>
                </div>
                <h4 class="card-title">{{pharmacy.name}}</h4>
                <p class="card-category">{{pharmacy.description}}</p>
                <p class="card-title">{{pharmacy.address.streetName}} {{pharmacy.address.streetNumber}}, {{pharmacy.address.city}}</p>
                <Stars :numOfStars="pharmacy.averageGrade"/>
            </div>
            <div class="card-footer">
                <div class="stats">
                </div>
                <Button @click="changeRoute" class="pull-right">View more</Button>
            </div>
        </div>
    </div>
</template>

<script>

import Button from '../Form/Button'
import Stars from '../Rating/Stars'

import { Roles } from '../../constants'
import { getRoleFromToken } from '../../utils/token'

export default {
    components: {
        Button,
        Stars
    },

    props: ['pharmacy'],
  
    data: function() {
        return {
            role: null,
            roles: Roles
        }
    },

    methods: {
        onDeleteSelected: function(e) {
            e.preventDefault();
            this.$emit('onDeleteSelected', e, this.pharmacy.id, this.pharmacy.name);
        },

        changeRoute(e) {
            e.preventDefault();
            this.$router.push(`/pharmacies/${this.pharmacy.id}`);
        }
    },

    mounted() {
        this.role = getRoleFromToken();
    }
}
</script>