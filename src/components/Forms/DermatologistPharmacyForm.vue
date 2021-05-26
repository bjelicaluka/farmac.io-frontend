<template>
  <Form @submit="onSubmit($event)">
    <WorkTimeFormGroup :workTime="workTime" :showErrorMessage="showErrorMessage" />
    <Button @click="showErrorMessage = true" type="submit">Add To Pharmacy</Button>
  </Form>
</template>

<script>
import {mapActions} from 'vuex';
import Form from '../Form/Form.vue'
import Button from '../Form/Button.vue';
import WorkTimeFormGroup from '../FormGroups/WorkTimeFormGroup.vue';

export default {
  components: { Form, Button, WorkTimeFormGroup },
  props: {
    dermatologist: {},
    pharmacyId: {}
  },
  data: () => {
    return {
      workTime: {
        from: null,
        to: null,
      },
      
      showErrorMessage: false,
    }
  },
  methods: {
    ...mapActions({
      addDermatologistToPharmacy: 'dermatologist/addDermatologistToPharmacy',
    }),
    onSubmit(e) {
      e.preventDefault();
      this.showErrorMessage = true;
      this.addDermatologistToPharmacy({
          dermatologistId: this.dermatologist.id,
          pharmacyId: this.pharmacyId,
          workTime: {
           from: this.workTime.from.format(),
           to: this.workTime.to.format() 
          }
        });
    },
  }
}
</script>

<style>

</style>