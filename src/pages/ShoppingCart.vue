<template>
    <div class="content">
        <div class="container-fluid">
            <Card v-for="(medicines, pharmacyId) in reservations" :key="pharmacyId" :title="medicines[0].pharmacyName + ', ' + medicines[0].street + ', ' + medicines[0].city">
                <ShoppingCartTable :medicines="medicines" :pharmacyId="pharmacyId"></ShoppingCartTable>
            </Card>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card/Card.vue'
import ShoppingCartTable from '../components/Tables/ShoppingCartTable.vue'
import { mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
    components: {
        Card,
        ShoppingCartTable
    },

    data: function(){
        return {
        }
    },

    computed: {
        ...mapGetters({
            reservations: 'shoppingCart/getReservations',
            result: 'shoppingCart/getResult'
        })
    },

    watch: {
        result({label, ok, message}) {
            if(label !== 'reservation')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    }
}

</script>
