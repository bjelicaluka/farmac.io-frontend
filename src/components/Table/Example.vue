<template>
  <Table>
      <TableHead :columnNames="['Ime', 'Prezime', 'Broj studenta', '']"></TableHead>
      <TableBody>
      <TableRow v-for="n in list" :key="n.student" :values="[n.ime, n.prezime, n.student]" :actions="actions"></TableRow>
      </TableBody>
  </Table>
</template>

<script>
import Table from './Table'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableRow from './TableRow'
export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead
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