<template>
  <div>
    <div class="form-group">
        <label v-if="!!label" class="bmd-label-floating">{{label}}</label>
        <input 
          :type="type" 
          class="form-control"
          v-bind:value="!!value ? value + '' : value"
          v-on:input="$emit('input', $event.target.value)"
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
    type: {
      type: String,
      default: 'text'
    },
    value: {
      default: ''
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
    },
  }
}
</script>

<style>

</style>