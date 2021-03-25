<template>
    <div class="content">
        <div class="container-fluid">
            <p>luidjiii</p>
            <p>{{pharmacy.id}}</p>
            <p>{{pharmacy.name}}</p>
        </div> 
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            pharmacy: {
                id: '',
                name: ''
            },
        }
    },

   computed: {
    ...mapGetters({
        getPharmacy: 'pharmacies/getPharmacy'
    })
  },

  watch: {
      getPharmacy(pharmacy) {
        this.pharmacy = pharmacy;
      }
  },

  methods: {
    ...mapActions({
        fetchPharmacy: 'pharmacies/getPharmacyById'
    })
  },

  mounted() {
      const id = this.$route.params.id;
      this.fetchPharmacy(id);
  }
}
</script>
