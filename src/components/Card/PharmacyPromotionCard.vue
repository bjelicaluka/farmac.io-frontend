<template>
  <div v-if="display" class="card bg-danger col-12 pl-3 mt-0">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <span class="display-6">There is an active promotion in the pharmacy!</span>
        <span @click="display = false" class="close pull-right text-white">&times;</span>
        <span v-if="!!totalDiscount" class="pull-right mr-5 display-big">{{totalDiscount}}% off!</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    pharmacyId: {}
  },
  computed: {
    ...mapGetters({
      activePharmacyPromotions: 'pharmacyPromotions/getActivePharmacyPromotions'
    })
  },
  watch: {
    activePharmacyPromotions() {
      if(this.activePharmacyPromotions.length) {
        this.display = true;
        this.totalDiscount = this.activePharmacyPromotions.reduce((acc, activePromotion) => acc + activePromotion.discount, 0);
      }
    },
    pharmacyId() {
      this.pharmacyId && this.fetchActivePharmacyPromotions(this.pharmacyId);
    }
  },
  methods: {
    ...mapActions({
      fetchActivePharmacyPromotions: 'pharmacyPromotions/fetchActivePharmacyPromotions',
    })
  },
  data() {
    return {
      totalDiscount: 0,
      display: false
    }
  },
  mounted() {
    this.display = false;
    this.totalDiscount = 0;
    this.pharmacyId && this.fetchActivePharmacyPromotions(this.pharmacyId);
  }
}
</script>

<style>
.display-6 {
  font-size: 150%;
}

.display-big {
  font-size: 200%;
}
</style>