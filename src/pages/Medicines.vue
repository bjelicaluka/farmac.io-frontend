<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <template v-for="(medicine,index) in medicines">
                    <RotatingCard :key="index" :category="'©' + medicine.manufacturer" :title="medicine.name" label="Download specification or check availability.">
                        <div slot="description">
                            <p style="font-size: 20px;">Type: {{medicine.type.typeName}}</p>
                            <div>
                                <span style="font-size: 15px;" class="fa fa-star checked"></span>
                                <span style="font-size: 15px;" class="fa fa-star checked"></span>
                                <span style="font-size: 15px;" class="fa fa-star checked"></span>
                                <span style="font-size: 15px;" class="fa fa-star"></span>
                                <span style="font-size: 15px;" class="fa fa-star"></span>
                            </div>
                        </div>
                        <div slot="buttons">
                            <a href="#pablo" class="btn btn-info btn-just-icon btn-fill btn-round" rel="tooltip" title="Download specification">
                                <i class="material-icons">subject</i>
                            </a>
                            <a href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd" rel="tooltip" title="Check availability">
                                <i class="material-icons">add_shopping_cart</i>
                            </a>

                        </div>
                    </RotatingCard>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import RotatingCard from '../components/Card/RotatingCard.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        RotatingCard
        
    },

    data: function() {
    return {
            medicines: []
        }
    },

    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicines',
            })
    },

    methods: {
        ...mapActions({
            fetchMedicines: 'medicines/getMedicines',
            }),
    },

    watch: {
      getMedicines(medicines) {
        this.medicines = medicines;
      },
    },

    mounted() {
      this.fetchMedicines();
    }

}
</script>

<style scoped>
.checked {
  color: orange;
}

</style>