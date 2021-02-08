<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card color="greyF1">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Pet Reminder</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

          <Petprofile v-bind:info="info" v-bind:showmenu="'false'"/>

          <v-card tile elevation="0" class="mt-1" height="700">
            <v-toolbar
              flat
            >
              <v-btn
                outlined
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn
                fab
                text
                x-small
                color="grey darken-2"
                @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
            <v-spacer></v-spacer>
              <v-toolbar-title v-if="$refs.calendar" class="txtsmall">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
                <v-spacer></v-spacer>
              <v-btn
                fab
                text
                x-small
                color="grey darken-2"
                @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
        </v-toolbar>
              <v-card :height="calendarHeight" elevation="0">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  :now="today"
                  :event-height="20"
                  type="month"
                  @click:more="dayClick"
                  @click:date="dayClick"
                  :events="events"
                  :event-color="getEventColor"
                  @change="updateEvents"
                >
                <template v-slot:event="{event, start}">
                  <v-card v-if="start" :height="25" :color="event.color">
                      <v-card-text
                          @click="showEvent(info, event)"
                        class="pa-1 white--text"
                        v-html="event.name"
                      ></v-card-text>
                  </v-card>
                </template>
                </v-calendar>
              </v-card>
          </v-card>

          <template>
            <v-btn color="primary" dark fab :bottom="true" :right="true" fixed @click="openCreateEventDialog(info, '', 'createEvent')">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-card>
      <CreateEvent ref="CreateEvent" v-on:updateEvent="updateEvents"/>
      <ReminderInfo ref="ReminderInfo" v-on:updateEvent="updateEvents"/>
      <Dayreminder ref="Dayreminder"/>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import CreateEvent from '@/components/Home/Mypet/Calendar/CreateEvent'
import ReminderInfo from '@/components/Home/Mypet/Calendar/ReminderInfo'
import Petprofile from '@/components/Petprofile'
import Dayreminder from '@/components/Home/Mypet/Calendar/ReminderInDay'
export default {
  components: {
    CreateEvent,
    ReminderInfo,
    Petprofile,
    Dayreminder
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      info: '',
      today: null,
      focus: '',
      events: [],
      listOfEvent: [],
      date: new Date(),
      result: null,
      calendarHeight: 600
    }
  },
  methods: {
    async getEvent () {
      this.events = []
      const body = {
        pet_id: this.info.pet_id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_reminder',
        body
      )
      this.listOfEvent = result.data.pet_reminder
      result.data.pet_reminder.forEach((event) => {
        var date = event.datetime.split('T')
        event.name = event.title
        event.start = date[0]
        event.color = 'hospital'
      })

      this.events = result.data.pet_reminder
    },
    getToday () {
      this.focus = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
      this.today = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
      console.log(this.today)
    },
    openDialog (info) {
      this.dialog = true
      this.today = new Date().toISOString().slice(0, 10)
      console.log(this.today)
      this.info = info
      this.getEvent()
    },
    closeDialog () {
      this.dialog = false
    },
    setToday () {
      this.focus = ''
    },
    showEvent (info, event) {
      this.openReminderInfo(info, event)
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    updateEvents (event) {
      this.getEvent()
    },
    getEventColor (event) {
      return event.color
    },
    openCreateEventDialog (info, event, todo) {
      console.log(info)
      console.log(event)
      console.log(todo)
      this.$refs.CreateEvent.openDialog(info, event, todo, this.today)
    },
    openReminderInfo (info, event) {
      console.log(info)
      this.$refs.ReminderInfo.openDialog(info, event)
    },
    dayClick ({ date }) {
      this.openDayreminder(date)
    },
    openDayreminder (date) {
      var todayEvent = []
      this.listOfEvent.forEach(event => {
        if (event.start === date) {
          todayEvent.push(event)
        }
      })
      if (todayEvent.length === 0) {
        console.log('create')
        this.$refs.CreateEvent.openDialog(this.info, '', 'createEvent', date)
      } else {
        this.$refs.Dayreminder.openDialog(date, todayEvent)
      }
    }
  }
}
</script>

<style scoped>
#txt{
  color: black;
}
</style>
