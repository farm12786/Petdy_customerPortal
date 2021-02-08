<template>
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card color="white">
        <v-toolbar dark color="primary" class="toolbar1">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{date}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container grid-list-xs>
            <ReminderSubCard v-bind:event="todayEvent"/>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
import ReminderSubCard from '@/components/Home/Mypet/Calendar/ReminderSubCard'
export default {
  components: {
    ReminderSubCard
  },
  data () {
    return {
      dialog: false,
      date: null,
      todayEvent: null
    }
  },
  methods: {
    openDialog (date, todayEvent) {
      this.dialog = true
      this.date = date
      this.todayEvent = todayEvent
      console.log(this.date)
      console.log(this.todayEvent)
    }
  }

}

</script>

<style scoped>
.toolbar1{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
