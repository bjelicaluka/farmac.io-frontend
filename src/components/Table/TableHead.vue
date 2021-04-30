<template>
  <thead class="text-primary">
        <th v-for="(columnName, i) in columnNames" :key="i">{{ columnName }}</th>
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