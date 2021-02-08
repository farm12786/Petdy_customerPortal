<template>
    <v-dialog
      v-model="dialog"
      width="800"
      height="100"
      persistent
    >
      <v-card  width="800">
         <v-toolbar
          class="toolbar1"
          dark
          color="primary"
        >
          <v-toolbar-title>Reminder Infomation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">

                  <v-icon color="white" v-bind="attrs"
                  v-on="on">mdi-dots-vertical</v-icon>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menu"
                  :key="index"
                >
                  <v-list-item-title v-if="item.title === 'Edit Reminder'" class="greyB--text" @click="openCreateEventDialog(info, event, 'editEvent')">{{ item.title }}</v-list-item-title>
                  <v-list-item-title v-if="item.title === 'Delete Reminder'" class="greyB--text" @click="openDeletepopup(event)">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>
        </v-toolbar>

        <v-row justify="center" align-content="center" class="mx-0">
            <v-col cols="12">
                <ReminderSubCard v-bind:event="eventdetail"/>
            </v-col>
        </v-row>

        <v-card tile elevation="0" height="400" class="mx-4">
            <v-row>
                <v-col cols="4" class="txtreg txtInfo">
                    Location
                </v-col>
                <v-col cols="2" class="txtsmall">
                    :
                </v-col>
                <v-col cols="6">
                    {{event.location}}
                </v-col>
            </v-row>
            <v-divider ></v-divider>
            <v-row>
                <v-col cols="4" class="txtreg txtInfo">
                    Note
                </v-col>
                <v-col cols="2" class="txtsmall">
                    :
                </v-col>
                <v-col cols="6">
                    {{event.detail}}
                </v-col>
            </v-row>

            <v-divider ></v-divider>
            <v-row>
                <v-col cols="4" class="txtreg txtInfo">
                    Notification
                </v-col>
                <v-col cols="2" class="txtsmall">
                    :
                </v-col>
                <v-col v-if="event.noti === true" cols="6" >
                    <v-chip color="green lighten-5" class="green--text ">ON</v-chip>
                </v-col>
                <v-col v-if="event.noti === false" cols="6">
                    <v-chip>OFF</v-chip>
                </v-col>
            </v-row>
            <v-divider ></v-divider>

        </v-card>

        <v-divider></v-divider>
        <v-row class="mx-0">
            <v-col cols="12" class="px-5">
                <v-row justify="center" align-content="center" class="mx-1">
                    <v-btn text block color="greyC" @click="closeDialog">CLOSE</v-btn>
                </v-row>
            </v-col>
        </v-row>
      </v-card>
    <CreateEvent ref="CreateEvent" v-on:updateEvent="reopenDialog" v-on:eventInfo="getEventInfo"/>
    <Deletepopup ref="Deletepopup" v-on:Emit="reopenDialog"></Deletepopup>
    </v-dialog>
</template>

<script>
import Deletepopup from '@/components/DeletePopup'
import CreateEvent from '@/components/Home/Mypet/Calendar/CreateEvent'
import ReminderSubCard from '@/components/Home/Mypet/Calendar/ReminderSubCard'
import axios from 'axios'
export default {
  components: {
    CreateEvent,
    Deletepopup,
    ReminderSubCard
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      event: '',
      eventdetail: [],
      menu: [
        {
          title: 'Edit Reminder'
        },
        {
          title: 'Delete Reminder'
        }
      ],
      info: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('updateEvent')
    },
    openCreateEventDialog (info, event, todo) {
      this.dialog = false
      this.$refs.CreateEvent.openDialog(info, event, todo)
    },
    openDialog (info, event) {
      console.log(event)
      this.dialog = true
      this.info = info
      this.event = event
      this.eventdetail = []
      this.eventdetail.push(event)
      console.log(this.eventdetail)
    },
    openDeletepopup (eventInfo) {
      this.dialog = false
      this.$refs.Deletepopup.openSheet(eventInfo, 'deleteevent')
    },
    reopenDialog (event) {
      if (event === 'cancel') {
        this.dialog = true
        console.log(this.info)
      } else if (event === 'closeInfo') {
        this.$emit('updateEvent')
        this.dialog = false
      }
    },
    async getEventInfo (event) {
      console.log('getEventInfo')
      console.log(event)
      const body = {
        pet_id: this.info.pet_id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_reminder',
        body
      )

      result.data.pet_reminder.forEach((itemEvent) => {
        if (itemEvent.id === event) {
          console.log(itemEvent.title)
          this.event = itemEvent
          this.eventdetail = []
          this.eventdetail.push(itemEvent)
        }
      })
    }
  }
}
</script>

<style scoped>
.txtInfo {font-size: 14px;}
</style>
