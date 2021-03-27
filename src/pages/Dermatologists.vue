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

export default {
  components: { Card, DermatologistsTable },
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            dermatologists: 'dermatologist/getDermatologists'
        }),
    },
    methods: {
        ...mapActions({
            fetchDermatologists: 'dermatologist/fetchDermatologists',
            searchDermatologistsByName: 'dermatologist/searchDermatologistsByName',
        }),
        handleSearchDermatologists(name) {
            this.searchDermatologistsByName(name);
        }
    },
    mounted() {
        this.fetchDermatologists();
    }
}
</script>
