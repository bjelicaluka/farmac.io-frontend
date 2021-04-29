<template>
  <div>
    <div class="form-group">
        <label v-if="!!label" class="bmd-label-floating">{{label}}</label>
        <textarea 
          class="form-control"
          :rows="rows"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
          :disabled="disabled"
          :placeholder="placeholder"
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
    rows: {
      type: String,
      default: '5'
    },
    value: {
      type: String,
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
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>