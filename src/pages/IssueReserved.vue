<template>
<div class="content">
    <div class="container-fluid">
        <Card :title="'Issuing reserved medicine'" :description="''">
            <Search></Search>
        </Card>
    </div> 
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import Search from '../components/Search/Search.vue'
import Card from '../components/Card/Card.vue'

export default {
    data: function() {
        return {
        }
    },
    components: {
        Search,
        Card
    },
    computed: {
        ...mapGetters({
        })
    },
    methods: {
        ...mapActions({
        }),
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },
    },
    mounted() {
    },
}

</script>

<style>

</style>