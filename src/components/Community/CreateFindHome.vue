<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >

      <v-card >
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog= false , closeDialog () "
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title >Find Home</v-toolbar-title>
<v-spacer></v-spacer>

        </v-toolbar>
                <v-list
          three-line
          subheader

        >

<v-container  class=" mt-n3">

            <v-col cols="12" align="center">
                <UploadeImage ref="addpetDialog"></UploadeImage>
               <!-- <v-container grid-list-xl>

    </v-container> -->

            </v-col>

                 <v-row cols="12">
        <v-col cols="12">
          <v-form
    ref="form"
    v-model="valid"
     lazy-validation
  >
          <v-text-field
            v-model="data.detail"
            :rules="DetailRules"
            outlined
            label="Detail"
            clearable
            required
          ></v-text-field>
           <v-text-field
            v-model="data.contact"
            :rules="MobileRules"
            outlined
            label="Mobile Number"
            clearable
          ></v-text-field>

          <v-text-field
          v-model="data.place"
          :rules="LocationRules"
            outlined
            label="Location"
            append-icon="mdi-map-marker"
          ></v-text-field>

  </v-form>
        </v-col>
        </v-row>
<span class="txtsmall red--text">*Your Post automatically remove after 90 days</span>

    </v-container>

    <v-col >
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.type === 'Create'" @click="dialog = false,addpet(),closeDialog ()">
     Save
  </v-btn>
  <v-btn block class="primary white--text mt-10"
   :disabled="!valid"
      color="success"
       v-if="this.type === 'Edit'" @click="dialog = false,edit(),closeDialog ()">
     Save
  </v-btn>
    </v-col>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import UploadeImage from '@/components/uploadeImage'

export default {
  components: {
    UploadeImage
  },
  data () {
    return {
      valid: true,
      title: '',
      DetailRules: [
        v => !!v || 'Detail is required'

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
      type: '',
      info: '',
      id: '',
      data: {
        picture: '',
        detail: '',
        contact: '',
        place: '',
        user_create_id: '',
        post_id: ''
      }
    }
  },
  methods: {
    async addpet () {
      if (this.$refs.form.validate() === true) {
        console.log('add')
        var formData = new FormData()
        formData.append('file', this.$store.state.imgBlob, 'png')
        formData.append('detail', this.data.detail)
        formData.append('contact', this.data.contact)
        formData.append('place', this.data.place)
        formData.append('user_create_id', this.$store.state.userID)
        console.log(this.$store.state.imgUrl)
        console.log(this.data)
        // console.log('new', this.formData[0])
        await this.axios.post(
          process.env.VUE_APP_API + 'v2/add_pet_find_home', formData
        ).then(res => { console.log(res.data) })
      } else {
        console.log('can not create Find Home')
      }
      this.$store.commit('getcropparemove', true)
      this.$store.commit('getupdateFindHome')
      this.$store.commit('getimgBlob', null)
      this.$store.commit('getImgUrl', null)
    },
    async edit () {
      if (this.$refs.form.validate() === true) {
        console.log('edit')
        var formData = new FormData()
        if (this.$store.state.imgBlob === null) {
          formData.append('file', '')
          formData.append('detail', this.data.detail)
          formData.append('contact', this.data.contact)
          formData.append('place', this.data.place)
          formData.append('user_create_id', this.$store.state.userID)
          formData.append('post_id', this.data.post_id)
        } else {
          formData.append('file', this.$store.state.imgBlob, 'png')
          formData.append('detail', this.data.detail)
          formData.append('contact', this.data.contact)
          formData.append('place', this.data.place)
          formData.append('user_create_id', this.$store.state.userID)
          formData.append('post_id', this.data.post_id)
        }
        console.log(this.data)
        await this.axios.post(
          process.env.VUE_APP_API + 'v2/edit_pet_find_home', formData
        ).then(res => { console.log(res.data) })
        this.id = 1
      } else {
        console.log('can not create Find Home')
      }
      this.$store.commit('getcropparemove', true)
      this.$store.commit('getupdateFindHome')
      this.$store.commit('getimgBlob', null)
      this.$store.commit('getImgUrl', null)
    },
    openDialog (info, type) {
      this.info = info
      this.type = type
      this.dialog = true
      if (type === 'Edit') {
        this.$store.commit('getshowImgstatusTRUE')
        this.$store.commit('getImgUrl', info.picture)
        this.data.picture = info.picture
        this.data.detail = info.detail
        this.data.contact = info.contact
        this.data.place = info.place
        this.data.user_create_id = info.user_create_id
        this.data.post_id = info.post_id
      } else if (type === 'Create') {
        this.$store.commit('getshowImgstatusFALSE')
        this.$refs.form.reset()
        this.data.picture = null
        this.data.detail = null
        this.data.contact = null
        this.data.place = null
        this.data.user_create_id = this.$store.state.userID
      }
    },
    closeDialog () {
      this.dialog = false
    }

  }
}
</script>
<style scoped>

.uploadcard{border-style: dashed;}
</style>
