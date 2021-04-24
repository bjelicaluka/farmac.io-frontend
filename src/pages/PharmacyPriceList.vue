<template>
    <div class="content">
        <div class="container-fluid">
            <Card :title="pharmacy && pharmacy.name" :description="'Price List'">
                <PharmacyPriceListForm 
                    :isEdit="isPharmacyPriceListEdit" 
                    :existingPharmacyPriceList="pharmacyPriceList" 
                    :pharmacyId="pharmacyId" 
                />
            </Card>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue';
import PharmacyPriceListForm from '../components/Forms/PharmacyPriceListForm.vue';

export default {
  components: { Card, PharmacyPriceListForm },

    data: () => {
        return {
            pharmacyId: null,
            isPharmacyPriceListEdit: false
        }
    },
    computed: {
        ...mapGetters({
            pharmacy: 'pharmacies/getPharmacy',
            pharmacyPriceList: 'pharmacyPriceLists/getPharmacyPriceList',
            result: 'pharmacyPriceLists/getResult'
        }),
    },
    watch: {
        pharmacyPriceList() {
            this.isPharmacyPriceListEdit = !!this.pharmacyPriceList;
        },
        result({ok, label}) {
            if(label !== 'fetch') return;
            this.isPharmacyPriceListEdit = ok;
        }
    },
    methods: {
        ...mapActions({
            fetchPharmacy: 'pharmacies/fetchPharmacyById',
            fetchPharmacyPriceListForPharmacy: 'pharmacyPriceLists/fetchPharmacyPriceListForPharmacy'
        }),

    },
    mounted() {
        this.pharmacyId = this.$route.params.id;
        this.fetchPharmacy(this.pharmacyId);
        this.fetchPharmacyPriceListForPharmacy(this.pharmacyId);
    }
}
</script>