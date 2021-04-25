<template>
  <div>
    <div class="form-group">
        <label v-if="!!label" class="bmd-label-floating">{{label}}</label>
        <input 
          type="number"
          :min="min"
          :max="max"
          class="form-control"
          v-bind:value="parseInt(value)"
          v-on:input="$emit('input', parseInt($event.target.value))"
          :disabled="disabled"
        >
    </div>
    <InputErrorMessage
        :isValid="showErrorMessage ? isValid : true"
    >
      {{errorMessage}}
    </InputErrorMessage>
  </div>
</template>

<script>
import InputErrorMessage from './InputErrorMessage.vue'

export default {
  components: {
      InputErrorMessage
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 999999999
    },
    isValid: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showErrorMessage: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: "Invalid input."
    }
  }
}
</script>

<style>

</style>
