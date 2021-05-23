<template>
    <div>
        <div class="card card-chart">
            <div class="card-header card-header-rose" data-header-animation="true">
                <img src="https://i.ibb.co/tb2GmTN/pharmacy-Logo-2.png"/>
            </div>
            <div class="card-body">
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

export default {
    components: {
        Button,
        Stars
    },

    props: ['pharmacy'],

    methods: {

        changeRoute(e) {
            e.preventDefault();
            this.$router.push(`/pharmacies/${this.pharmacy.id}`);
        }
    }
}
</script>