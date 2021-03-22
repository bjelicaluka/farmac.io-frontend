<template>
  <div>
    <div class="form-group">
      <label class="label-control">{{label}}</label>
      <input 
        type="text"
        class="form-control datetimepicker"
      />
    </div>
    <InputErrorMessage
        :isValid="showErrorMessage ? isValid : true"
    >
      {{errorMessage}}
    </InputErrorMessage>
  </div>
</template>

<script>
import InputErrorMessage from './InputErrorMessage.vue';

const pickerTypeFormat = {
  datetime: 'lll',
  date: 'll',
  time: 'LT'
}

const $ = window.$;

export default {
  components: { InputErrorMessage },
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {},
    label: {
      type: String,
      default: ''
    },
    isValid: {
      type: Boolean,
      default: true
    },
    showErrorMessage: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: "Invalid input."
    },
  },
  mounted() {
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      },
      format: pickerTypeFormat[this.type] || 'lll'
    })
    .on('dp.change', (e) => {
      this.$emit('input', e.date);
    });
  }
}
</script>

<style>

</style>