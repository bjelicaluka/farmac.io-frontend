<template>
  <div>
    <div class="dataTables_paginate paging_full_numbers" id="datatables_paginate">
      <ul class="pagination">
        <li class="paginate_button page-item previous" id="datatables_previous">
          <Button @click="handleChangePage(page - 1)" className='btn btn-sm btn-default'>Prev</Button>
        </li>
        <li class="paginate_button page-item">
          <Button @click="handleChangePage(page !== 1 ? page - 1 : 1)" :className="`btn btn-sm btn-${getBtnColor(page !== 1 ? page - 1 : 1)}`">{{page !== 1 ? page - 1 : 1}}</Button>
        </li>
        <li class="paginate_button page-item">
          <Button @click="handleChangePage(page !== 1 ? page : page + 1)" :className="`btn btn-sm btn-${getBtnColor(page !== 1 ? page : page + 1)}`">{{page !== 1 ? page : page + 1}}</Button>
        </li>
        <li class="paginate_button page-item">
          <Button @click="handleChangePage(page !== 1 ? page + 1 : page + 2)" :className="`btn btn-sm btn-${getBtnColor(page !== 1 ? page + 1 : page + 2)}`">{{page !== 1 ? page + 1 : page + 2}}</Button>
        </li>
        <li class="paginate_button page-item next" id="datatables_next">
          <Button @click="handleChangePage(page + 1)" className='btn btn-sm btn-default'>Next</Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from '../Form/Button.vue';
export default {
  components: {
    Button
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    getBtnColor(num) {
      return this.page === num ? 'primary' : 'default';
    },
    handleChangePage(num) {
      if(num) {
        this.page = num;
        this.$emit('pageChange', num);
      }
    }
  }
}
</script>

<style>

</style>