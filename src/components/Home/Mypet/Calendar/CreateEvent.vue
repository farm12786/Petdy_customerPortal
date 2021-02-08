<template>
    <v-dialog
      v-model="dialog"
      width="800"
      persistent
    >
    <v-card elevation="0" >
      <v-card elevation="0" width="800">
         <v-toolbar
          class="toolbar1"
          dark
          color="primary"
        >
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-form
          ref="form"
          @submit.prevent="submit"
        >

        <v-row justify="center" align-content="center" class="pa-5 mx-0">
            <v-row>
              <v-col>
                <v-textarea
                  class="eventTextfield"
                  dense
                  v-model="eventTitle"
                  clearable
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  label="Event"
                >
                </v-textarea>
              </v-col>
              <v-col>
                <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar
                  class="mt-3"
                  size="24"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                  class="stokeColorSelect "
                  :color="selectedColor"
                  v-bind="attrs"
                  v-on="on">
                  mdi-checkbox-blank-circle</v-icon>
                </v-avatar>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in Colormenu"
                  :key="index"
                  @click="setColor(item.color)"
                >
                  <v-icon :color="item.color">mdi-checkbox-blank-circle</v-icon>
                  <p class="mt-4 pl-2 greyB--text">{{item.title}}</p>
                </v-list-item>
              </v-list>
          </v-menu>
              </v-col>
            </v-row>

              <v-menu
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        outlined
                        dense
                        label="Date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        append-icon="mdi-calendar-month"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                ></v-date-picker>
             </v-menu>

             <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    outlined
                    dense
                    label="Time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    append-icon="mdi-clock-outline"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  format="24hr"
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
            </v-menu>

              <v-textarea
                dense
                clearable
                auto-grow
                outlined
                rows="1"
                row-height="15"
                v-model="location"
                label="Location"
              ></v-textarea>

              <v-textarea
                dense
                v-model="detail"
                auto-grow
                outlined
                rows="2"
                row-height="15"
                label="Note"
                clearable
              >
              </v-textarea>
                <div>Notification</div>
                <v-spacer></v-spacer>
                <v-switch
                  class="mt-n1"
                  v-model="switch1"
                ></v-switch>
        </v-row>
        <v-row class="mx-0">
                <v-col cols="12" class="px-0">
                  <v-divider></v-divider>
                  <v-row justify="end" class="mt-2 mx-0">
                    <v-btn text @click="closeDialog">CLOSE</v-btn>
                    <v-btn v-if="todo === 'createEvent'" text color="success" @click="createEvent">SAVE</v-btn>
                    <v-btn v-if="todo === 'editEvent'" text color="success" @click="editEvent">SAVE</v-btn>
                  </v-row>
                </v-col>
              </v-row>
        </v-form>
      </v-card>
      </v-card>
      <Deletepopup ref="Deletepopup" v-on:Emit="closeDialog"></Deletepopup>
    </v-dialog>
</template>

<script>
import Deletepopup from '@/components/DeletePopup'
import axios from 'axios'
export default {
  components: {
    Deletepopup
  },
  data () {
    return {
      Colormenu: [
        {
          title: 'blue',
          color: '#2196F3'
        },
        {
          title: 'purple',
          color: '#9C27B0'
        },
        {
          title: 'green',
          color: '#4CAF50'
        },
        {
          title: 'yellow',
          color: '#FDD835'
        },
        {
          title: 'orange',
          color: '#FF9800'
        },
        {
          title: 'red',
          color: '#FF5722'
        }
      ],
      title: '',
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      switch1: false,
      menu2: false,
      info: null,
      event: [],
      eventInfo: null,
      todo: '',

      eventTitle: '',
      detail: '',
      location: null,
      date: null,
      notification: null,

      selectedColor: '#2196F3'
    }
  },
  methods: {
    openDialog (info, event, todo, today) {
      this.dialog = true
      console.log(today)
      this.date = today
      this.todo = todo
      this.eventInfo = event
      this.info = info
      if (todo === 'editEvent') {
        var date = event.datetime.split('T')
        var time = date[1].split('.')
        if (event.noti === true) {
          this.switch1 = true
        } else if (event.noti === false) {
          this.switch1 = false
        }
        this.title = 'Edit Reminder'
        this.eventTitle = event.title
        this.detail = event.detail
        this.date = date[0]
        this.location = event.location
        this.notification = event.noti
        this.time = time[0]
      } else if (todo === 'createEvent') {
        this.title = 'Create Reminder'
        this.eventTitle = ''
        this.detail = ''
        this.date = today
        this.location = ''
        this.notification = false
        this.time = ''
        this.$refs.form.resetValidation()
      }
    },
    async createEvent () {
      if (this.switch1 === true) {
        this.notification = 1
      } else if (this.switch1 === false) {
        this.notification = 0
      }
      const body = {
        datetime: this.date + ' ' + this.time,
        title: this.eventTitle,
        detail: this.detail,
        location: this.location,
        noti: this.notification,
        pet_id: this.info.pet_id
      }
      console.log(body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'add_pet_reminder',
        body
      )
      console.log(result)

      this.event.push({
        name: this.detail,
        start: this.date,
        color: 'hospital',
        location: this.location
      })
      this.$emit('updateEvent')
      this.dialog = false
    },
    async editEvent () {
      if (this.switch1 === true) {
        this.notification = 1
      } else if (this.switch1 === false) {
        this.notification = 0
      }
      const body = {
        datetime: this.date + ' ' + this.time,
        title: this.eventTitle,
        detail: this.detail,
        location: this.location,
        noti: this.notification,
        pet_id: this.info.pet_id,
        reminder_id: this.eventInfo.id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'edit_pet_reminder',
        body
      )
      console.log(result)
      this.$emit('updateEvent', 'cancel')
      this.$emit('eventInfo', this.eventInfo.id)
      this.dialog = false
    },
    resetForm () {
      this.$refs.form.reset()
    },
    submit () {
      this.snackbar = true
      this.resetForm()
    },
    openDeletepopup (eventInfo) {
      this.$refs.Deletepopup.openDialog(eventInfo)
    },
    closeDialog () {
      this.$emit('updateEvent', 'cancel')
      this.dialog = false
    },
    setColor (color) {
      this.selectedColor = color
      console.log(color)
    }
  }
}

</script>

<style scoped>
.stokeImg { border: 3px solid var(--v-secondary-base); }
.stokeImgMe {
  border: 1px solid var(--v-ptimary-base);
}
.toolbar1{
  position: sticky;
  top: 0;
  z-index: 999;
}
.footer1{
  flex-shrink: 0;
}
.colorSelect{
  border-style: dotted;
}
.stokeColorSelect { border: 2px solid var(--v-greyF1-base); }
.eventTextfield{
      width: 230px;
}
</style>
