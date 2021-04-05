<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Dermatologists' :description="`All dermatologists in the system.`">
                <DermatologistsTable @search="handleSearchDermatologists" :dermatologists="dermatologists" :pharmacyId="'08d8f514-5790-438f-88f7-09089846f3d2'" />
            </Card>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import DermatologistsTable from '../components/Tables/DermatologistsTable.vue';
import toastr from 'toastr';

export default {
  components: { Card, DermatologistsTable },
    data: () => {
        return {
            searchName: null
        }
    },
    computed: {
        ...mapGetters({
            dermatologists: 'dermatologist/getDermatologists',
            result: 'dermatologist/getResult',
        }),
    },
    watch: {
        result({label, ok, message}) {
            if(['add', 'update', 'delete'].indexOf(label) !== -1 && ok)
                this.fetchDermatologists();


            if(label !== 'removeFromPharmacy' && label !== 'addToPharmacy')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
            this.searchName ? this.handleSearchDermatologists(this.searchName) : this.fetchDermatologists();
        }
    },
    methods: {
        ...mapActions({
            fetchDermatologists: 'dermatologist/fetchDermatologists',
            searchDermatologistsByName: 'dermatologist/searchDermatologistsByName',
        }),
        handleSearchDermatologists(name) {
            this.searchName = name;
            this.searchDermatologistsByName(name);
        }
    },
    mounted() {
        this.fetchDermatologists();
    }
}
</script>
