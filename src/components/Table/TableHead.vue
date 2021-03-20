<template>
  <thead class="text-primary">
        <th v-for="columnName in columnNames" :key="columnName">{{ columnName }}</th>
  </thead>
</template>

<script>
export default {
    props: {
    columnNames: Array
}
}
</script>

<style>

</style>