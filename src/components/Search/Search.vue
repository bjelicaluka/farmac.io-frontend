<template>
  <div :class="wrapperClass">
    <text-input
      :class="searchFieldClass"
      v-model="value"
      :isValid="true"
    />
    <Button @click="handleSearch" class="ml-2 mt-auto mb-auto" className="btn btn-sm btn-primary">
      <Icon icon="search" textColor='text-white'/>
    </Button>
  </div>
</template>

<script>
import Button from '../Form/Button.vue'
import TextInput from '../Form/TextInput.vue'
import Icon from '../Icon/Icon.vue'

export default {
  components: { TextInput, Icon, Button },
  props: {
    wrapperClass: {
      type: String,
      default: 'row mr-auto'
    },
    searchFieldClass: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      value: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.value);
    }
  }
}
</script>

<style>

</style>