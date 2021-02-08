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
            @click="dialog= false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title >Matching</v-toolbar-title>
<v-spacer></v-spacer>

        </v-toolbar>
                <v-list
          three-line
          subheader

        >
<v-col>
   <v-row>
<v-col cols="4" align="center">
    <v-avatar   size="80" >
             <!-- <v-img :src=" pathS3 + info.pic " ></v-img> -->
            <v-img :src=" pathS3 + info.pic " ></v-img>

          </v-avatar>
  </v-col>
  <v-col cols="8">
     <v-col  cols="12"><span class="txtbold shop--text txtbig" >{{info.name}}</span> </v-col>
    <v-col cols="12">
      <h6>{{info.pettype}} | {{info.gender}} | {{info.furcolo}}</h6>
    </v-col>
  </v-col>
</v-row>
</v-col>
<v-divider ></v-divider><v-divider ></v-divider><v-divider ></v-divider>
<v-container  class=" mt-n3">

                 <v-row cols="12">
        <v-col cols="12">
          <v-form
    ref="form"
    v-model="valid"
     lazy-validation
  >
          <v-text-field
            v-model="data.title"
            :rules="TopicRules"
            outlined
            label="Topic"
            clearable
            required
          ></v-text-field>
          <v-text-field
            v-model="data.matchingplace"
            :rules="PlaceRules"

            outlined
            label="Place"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="data.contact"
            :rules="MobileRules"
            outlined
            label="Mobile Number"
            counter="10"
            maxlength="10"
            clearable
          ></v-text-field>
          <!-- <v-text-field
          v-model="message4"
          :rules="LocationRules"
            outlined
            label="Location"
            append-icon="mdi-map-marker"
          ></v-text-field> -->

  </v-form>
        </v-col>
        <getCoordinate ref="getCoordinate" />
        </v-row>

    </v-container>

    <v-col >
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.type === 'Create'" @click="dialog = false,addpet()">
     Save
  </v-btn>
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.type === 'Edit'" @click="dialog = false,edit()">
     Save
  </v-btn>
    </v-col>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import getCoordinate from '@/components/getCoordinate'
import axios from 'axios'
export default {

  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      valid: true,
      title: '',
      TopicRules: [
        v => !!v || 'Topic is required'

      ],
      matchingplace: '',
      PlaceRules: [
        v => !!v || 'Placel is required'
      ],
      contact: '',
      MobileRules: [
        v => !!v || 'Mobile Number is required',
        v => (v && v.length === 10) || 'The number of digits must be 10'
      ],
      // Location: '',
      // LocationRules: [
      //   v => !!v || 'Location is required'
      // ],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      type: '',
      info: '',
      data: {
        title: '',
        matchingplace: '',
        contact: '',
        longitude: '',
        latitude: '',
        pet_id: '',
        userupdate_id: ''
      }
    }
  },
  components: {
    getCoordinate
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    addpet () {
      if (this.$refs.form.validate() === true) {
        console.log('add')
        this.data.longitude = this.$store.state.Locationlng
        this.data.latitude = this.$store.state.Locationlat
        this.axios.post(
          process.env.VUE_APP_API + 'add_pet_match', this.data
        ).then(res => { console.log(res.data) })
      } else {
        console.log('can not create Matching')
      }
    },
    edit () {
      if (this.$refs.form.validate() === true) {
        console.log('edit')
        this.data.longitude = this.$store.state.Locationlng
        this.data.latitude = this.$store.state.Locationlat
        this.axios.post(
          process.env.VUE_APP_API + 'edit_pet_match', this.data
        ).then(res => { console.log(res.data) })
      } else {
        console.log('can not create Matching')
      }
    },

    async openDialog (info, type) {
      console.log('Test', info)
      if (type === 'Edit') {
        const body = {
          pet_id: info.id
        }
        const result = await axios.post(
          process.env.VUE_APP_API + 'get_pet_match_by_id',
          body
        )
        console.log(result.data.pet_match)
      } else if (type === 'Create') {
        console.log('Test Create', info)
        console.log('Test pet_id', info.pet_id)
        this.data.title = null
        this.data.matchingplace = null
        this.data.contact = null
        this.data.pet_id = info.pet_id
        this.data.userupdate_id = null
      }
      this.info = info
      this.type = type
      // console.log('mounted>>>>>>>')
      this.dialog = true
    },
    closeDialog () {
      this.$refs.form.reset()
      this.dialog = false
    },
    validate () {
      this.$refs.form.validate()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style scoped>

</style>
