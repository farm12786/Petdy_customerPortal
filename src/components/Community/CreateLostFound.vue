<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >

      <v-card class="primary">
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog= false, closeDialog()"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title >Lost&Found</v-toolbar-title>
<v-spacer></v-spacer>

        </v-toolbar>
                <v-list
          three-line
          subheader
        >
<v-card-text >
 <h3>Pet</h3>
</v-card-text>
<v-container  class=" mt-n3">

                 <v-row cols="12">
        <v-col cols="12">
          <div>

          <v-select
                v-if="type === 'Create'"
                  :items="petName"
                  item-text="name"
                  return-object
                  label="Select your pet"
                  dense
                  outlined
                  v-model="petId"
                >
                </v-select>

          <v-card outlined elevation="0" class="greyC--stoke">

<v-row v-if="type === 'Create'">

   <v-img v-if="petId === ''" class="ml-3 greyC" height="112" width="112" src="../../assets/icon/icon_PETDY.png"></v-img>
   <v-img v-else class="ml-3 greyC" height="112" width="112" :src="petId.pic"></v-img>
              <v-col cols="7" class="">
                <v-row>
                  <v-col cols="12" class="txtbold">
                    {{petId.name}}
                  </v-col>
                  <v-col v-if="petId !== null && petId !== ''">
                   <h6> {{petId.pettype}} | {{petId.gender}} | {{petId.furcolor}}</h6>
                  </v-col>
                </v-row>
              </v-col>
</v-row>

 <v-row v-if="this.type === 'Edit'">
   <v-img v-if="info.pic !== ''"  class="ml-3 greyC" height="112" width="112" :src="info.pic" ></v-img>
   <v-img v-if="info.pic === ''" class="ml-3 greyC" height="112" width="112" src="../../assets/icon/icon_PETDY.png" ></v-img>
              <v-col cols="7" class="">
                <v-row>
                  <v-col cols="12" class="txtbold">
                    {{info.name}}
                  </v-col>
                  <v-col >
                   <h6> {{info.pettype}} | {{info.gender}} | {{info.furcolor}}</h6>
                  </v-col>
                </v-row>
              </v-col>
</v-row>

          </v-card>
          </div>
          <v-form
    ref="form"
    v-model="valid"
     lazy-validation
  >

          <v-card-text class="mt-5">
 <h3>Detail</h3>
</v-card-text>
          <v-text-field
          class=""
            v-model="data.title"
            :rules="DetailRules"
            outlined
            label="Detail"
            clearable
            required
          ></v-text-field>
           <v-card-text >
 <h3>Last seen</h3>
 </v-card-text>
 <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="data.datetime"
            :rules="datetimeRules"
            label="Last seen"
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
            append-icon="mdi-calendar"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="data.datetime"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
          <v-text-field
          v-model="data.lastseenplace"
          :rules="LocationRules"
            outlined
            label="Location"
            append-icon="mdi-map-marker"
          ></v-text-field>

  </v-form>
        </v-col>
        </v-row>

    </v-container>
    <getCoordinate ref="getCoordinate" />

    <v-col >
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.type === 'Create'" @click="dialog = false,addpet() , closeDialog()">
     Save
  </v-btn>
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.type === 'Edit'" @click="dialog = false,edit(), closeDialog()">
     Save
  </v-btn>

    </v-col>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import getCoordinate from '@/components/getCoordinate'
export default {
  components: {
    getCoordinate
  },
  data () {
    return {

      date: new Date().toISOString().substr(0, 10),
      menu: false,

      valid: true,
      title: '',
      DetailRules: [
        v => !!v || 'Detail is required'

      ],
      datetime: '',
      datetimeRules: [
        v => !!v || 'Last seen is required'

      ],

      contact: '',
      MobileRules: [
        v => !!v || 'Mobile Number is required'
      ],
      Location: '',
      LocationRules: [
        v => !!v || 'Location is required'
      ],

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      type: null,
      info: '',

      data: {
        lastseen_longitude: '',
        lastseen_latitude: '',
        title: '',
        lastseenplace: '',
        datetime: '',
        contact: '',
        pet_id: ''
      },
      petName: [],
      useridData: [],
      petId: '',
      userID: ''
    }
  },
  methods: {
    async getpet () {
      // this.data.pet_id = petID
      // console.log(this.data.pet_id)
      const body = {
        user_id: this.userID
      }
      console.log(body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_by_userid', body)
      console.log(result)
      this.useridData = result.data.pet_data
      console.log('ข้อมูลสัตว์', this.useridData)

      // console.log(this.useridData[0])
    },
    async addpet () {
      if (this.$refs.form.validate() === true) {
        this.data.pet_id = this.petId.pet_id
        console.log('add')
        this.data.lastseen_longitude = this.$store.state.Locationlng
        this.data.lastseen_latitude = this.$store.state.Locationlat
        await this.axios.post(
          process.env.VUE_APP_API + 'set_pet_fromlost', this.data
        ).then(res => { console.log(res.data) })
        console.log(this.petId)
        console.log('ข้อมูล', this.data)
      } else {
        console.log('can not create Lost&Found ')
      }
      this.$store.commit('getupdateLostFound')
    },
    async edit () {
      if (this.$refs.form.validate() === true) {
        console.log('edit')
        this.data.lastseen_longitude = this.$store.state.Locationlng || this.info.lastseen_longitude
        this.data.lastseen_latitude = this.$store.state.Locationlat || this.info.lastseen_latitude
        await this.axios.post(
          process.env.VUE_APP_API + 'set_pet_fromlost', this.data
        ).then(res => { console.log(res.data) })
      } else {
        console.log('can not create Lost&Found')
      }
      this.$store.commit('getupdateLostFound')
    },

    async openDialog (info, type) {
      console.log(type)
      this.dialog = true
      this.info = info
      this.type = type
      this.userID = this.$store.state.userID
      await this.getpet()
      console.log('userdata :', this.useridData)

      for (let index = 0; index < this.useridData.length; index++) {
        const element = this.useridData[index]
        this.petName.push(element)
      }
      if (type === 'Edit') {
        this.$store.commit('getshowImgstatusTRUE')
        console.log('ข้อมูล', this.data)
        this.data.lastseen_longitude = info.lastseen_longitude
        this.data.lastseen_latitude = info.lastseen_latitude
        this.data.title = info.title
        this.data.lastseenplace = info.lastseenplace
        this.data.datetime = info.DAY
        this.data.contact = info.contact
        this.data.pet_id = info.pet_id
        // this.$store.commit('getupdateLostFound')
      } else if (type === 'Create') {
        console.log('ข้อมูล', this.data)
        this.$refs.form.reset()
        this.$store.commit('getshowImgstatusFALSE')
        this.petId = ''
        this.data.lastseenplace = null
        this.data.datetime = null
        this.data.contact = null
        // this.$store.commit('getupdateLostFound')
      }
    },
    closeDialog () {
      this.dialog = false
      this.$store.commit('getupdateLostFound')
    }

  }
}
</script>
