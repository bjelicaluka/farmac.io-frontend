<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Pharmacists' :description="`All pharmacists in the system.`">
                <PharmacistsTable @search="handleSearchPharmacists" :pharmacists="pharmacists" :adminPharmacyId="'08d8f514-5790-438f-88f7-09089846f3d2'" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import PharmacistsTable from '../components/Tables/PharmacistsTable.vue';
import toastr from 'toastr';

export default {
  components: { Card, PharmacistsTable },
    data: () => {
        return {
            searchName: null
        }
    },
    computed: {
        ...mapGetters({
            pharmacists: 'pharmacist/getPharmacists',
            result: 'pharmacist/getResult',
        }),
    },
    watch: {
        result({label, ok, message}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchPharmacists();


            if(label !== 'removeFromPharmacy' && label !== 'addToPharmacy')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
            this.searchName ? this.handleSearchPharmacists(this.searchName) : this.fetchPharmacists();
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacists: 'pharmacist/fetchPharmacists',
            searchPharmacistsByName: 'pharmacist/searchPharmacistsByName',
        }),
        handleSearchPharmacists(name) {
            this.searchName = name;
            this.searchPharmacistsByName(name);
        }
    },
    mounted() {
        this.fetchPharmacists();
    }
}
</script>
