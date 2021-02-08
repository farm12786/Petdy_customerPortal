<template>
<!-- -------- -->
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

  </v-form>
        </v-col>
        <getCoordinate ref="getCoordinate" />
        </v-row>
   <v-col >
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.status === 'create'" @click="addpet()">
     Save
  </v-btn>
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.status === 'edit'" @click="edit()">
     Save
  </v-btn>
    </v-col>
    </v-container>

</template>

<script>
import getCoordinate from '@/components/getCoordinate'
import axios from 'axios'
export default {
  props: ['status', 'info'],
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
      data: {
        title: null,
        matchingplace: null,
        contact: null,
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
  async mounted () {
    console.log('Test', this.info)
    if (this.status === 'edit') {
      const body = {
        pet_id: this.info.id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_match_by_id',
        body
      )
      console.log(result)
      this.data.title = result.data.pet_match[0].title
      this.data.matchingplace = result.data.pet_match[0].matchingplace
      this.data.contact = result.data.pet_match[0].contact
      this.data.pet_id = result.data.pet_match[0].pet_id
      this.data.userupdate_id = result.data.pet_match[0].userupdate_id
    } else if (this.status === 'create') {
      console.log('Test Create', this.info)
      console.log('Test pet_id', this.info.pet_id)
      this.data.title = null
      this.data.matchingplace = null
      this.data.contact = null
      this.data.pet_id = this.info.pet_id
      this.data.userupdate_id = null
    }
    // console.log('mounted>>>>>>>')
  },
  methods: {
    addpet () {
      if (this.$refs.form.validate() === true) {
        console.log('addpet')
        this.data.longitude = this.$store.state.Locationlng
        this.data.latitude = this.$store.state.Locationlat
        this.axios.post(
          process.env.VUE_APP_API + 'add_pet_match', this.data
        ).then(res => { console.log(res.data) })
      } else {
        console.log('can not create Matching')
      }
      this.$emit('todo', 'addpet')
      this.$store.commit('getupdateMatching')
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
      this.$emit('todo', 'addpet')
      this.$store.commit('getupdateMatching')
    },

    async openDialog (info, type) {
      this.info = info
      this.type = type
      // console.log('mounted>>>>>>>')
      this.dialog = true
      console.log('Test', info)
      this.$refs.form.reset()
      if (type === 'Edit') {
        this.$store.commit('getshowImgstatusTRUE')
        const body = {
          pet_id: info.id
        }
        const result = await axios.post(
          process.env.VUE_APP_API + 'get_pet_match_by_id',
          body
        )
        console.log(result.data.pet_match)
      } else if (type === 'Create') {
        this.$refs.form.reset()
        this.$store.commit('getshowImgstatusTRUE')
        console.log('Test Create', info)
        console.log('Test pet_id', info.pet_id)
        this.data.title = null
        this.data.matchingplace = null
        this.data.contact = null
        this.data.pet_id = info.pet_id
        this.data.userupdate_id = null
      }
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
