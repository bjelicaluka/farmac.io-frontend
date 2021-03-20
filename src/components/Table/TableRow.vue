<template>
  <tr>
        <td v-for="value in values" :key="value">{{ value }}</td>
        <td>
            <div class="pull-right text-gray">
              <drop-down-menu name="Account" icon="person">
                <drop-down-item v-for="action in actions" :key="action" :to="action.link">{{ action.text }}</drop-down-item>
              </drop-down-menu>
            </div>
        </td> 
  </tr>
</template>

<script>
import DropDownMenu from "../DropdownMenu/DropdownMenu.vue"
import DropDownItem from "../DropdownMenu/DropdownItem.vue"
export default {
    components: {
      DropDownMenu,
      DropDownItem
    },
    props: {
    values: Array,
    actions: Array
}
}
</script>

<style>

</style>