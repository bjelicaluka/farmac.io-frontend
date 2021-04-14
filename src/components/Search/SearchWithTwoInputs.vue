<template>
  <div :class="wrapperClass">
    <text-input
      :class="searchFieldClass"
      v-model="value1"
      :isValid="true"
      :title="title1"
    />
    <text-input
      :class="searchFieldClass"
      v-model="value2"
      :isValid="true"
      :title="title2"
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
    },
    title1: {
        type: String,
        default: ''
    },
    title2: {
        type: String,
        default: ''
    }
  },
  data: () => {
    return {
      value1: '',
      value2: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.value1, this.value2);
    }
  }
}
</script>

<style>

</style>