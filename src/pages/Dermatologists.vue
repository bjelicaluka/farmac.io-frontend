<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Dermatologists' :description="`All dermatologists in the system.`">
                <DermatologistsTable @search="handleSearchDermatologists" :dermatologists="dermatologists" :pharmacyId="'1f833fb4-445b-4a87-bfc7-9b83bb788259'" />
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
