<template>
  <Table>
      <TableHead :columnNames="['Ime', 'Prezime', 'Broj studenta', '']"></TableHead>
      <TableBody>
      <TableRow v-for="n in list" :key="n.student" :values="[n.ime, n.prezime, n.student]">
        <div class="pull-right text-gray">
          <drop-down-menu name="Account" icon="person">
            <drop-down-item v-for="(action, index) in actions" :key="index" :to="action.link">{{ action.text }}</drop-down-item>
          </drop-down-menu>
        </div>
      </TableRow>
      </TableBody>
  </Table>
</template>

<script>
import Table from './Table'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableRow from './TableRow'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import DropDownItem from '../DropdownMenu/DropdownItem'
export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    DropDownItem,
    DropDownMenu
  },
  data (){
    return{
        list : [
      {"ime": "Jovana", "prezime" : "Jevtic", "student" : 1},
      {"ime": "Luka", "prezime" : "Bjelica", "student" : 2},
      {"ime": "Albert", "prezime" : "Makan", "student" : 3},
      {"ime": "Milos", "prezime" : "Panic", "student" : 4}
    ],
    actions : [
      {"link" : "/#", "text" : "Action1"},
      {"link" : "/#", "text" : "Action2"},
      {"link" : "/#", "text" : "Action3"}
    ]
    }
  }
}
</script>


<style>

</style>