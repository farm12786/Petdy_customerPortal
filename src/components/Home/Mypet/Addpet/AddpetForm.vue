<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Create Pet</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

          <UploadeImage ref="addpetDialog" v-bind:width="250" v-bind:height="250"></UploadeImage>

        <v-row justify="center" align-content="center" class="mx-0">
          <v-col cols="11">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-row>
                <v-textarea
                  dense
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  :rules="requireRule"
                  label="Name"
                  v-model="name"
                  clearable
                ></v-textarea>
              </v-row>

              <v-row>
                <v-autocomplete
                  :rules="requireRule"
                  v-model="pettype"
                  outlined
                  dense
                  label="Pet type"
                  :items="select_pet_type"
                  clearable
                ></v-autocomplete>
              </v-row>

              <v-row justify="center">
                <v-textarea
                  dense
                  :rules="requireRule"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  v-model="breed"
                  label="Breed"
                  clearable
                ></v-textarea>
              </v-row>

              <v-row justify="center">
                <v-autocomplete
                  rows="1"
                  row-height="15"
                  :rules="requireRule"
                  v-model="gender"
                  outlined
                  dense
                  label="Gender"
                  :items="select_gender"
                  clearable
                ></v-autocomplete>
              </v-row>

              <v-row justify="center">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :rules="requireRule"
                            v-model="date_of_birth"
                            outlined
                            dense
                            label="Date of Birth"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date_of_birth"
                    ></v-date-picker>
                </v-menu>
              </v-row>

              <v-row justify="center">
                <v-text-field
                  :rules="requireRule"
                  outlined
                  dense
                  v-model="weight"
                  label="Weight"
                  suffix="kg"
                ></v-text-field>
              </v-row>

              <v-row justify="center">
                <v-textarea
                  dense
                  :rules="requireRule"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  v-model="fur_color"
                  label="Fur color"
                  clearable
                ></v-textarea>
              </v-row>
            </v-form>
            <v-row justify="center">
              <v-btn block v-if="todo === 'createpet'" color="primary" elevation="0" @click="createPet"  :disabled="!valid">Add</v-btn>
              <v-btn block v-if="todo === 'editpet'" color="primary" elevation="0" @click="editpet"  :disabled="!valid">Save</v-btn>
            </v-row>
          </v-col>
        </v-row>
    </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import UploadeImage from '@/components/uploadeImage'
export default {
  components: {
    UploadeImage
  },
  data () {
    return {
      valid: true,
      name: null,
      breed: null,
      gender: null,
      date_of_birth: null,
      weight: null,
      fur_color: null,
      select_pet_type: ['Dog', 'Cat', 'Other'],
      select_gender: ['Male', 'Female'],
      dialog: false,
      pettype: null,
      bloodtype: null,
      todo: null,

      info: '',

      requireRule: [
        v => !!v || 'This field is required'
      ]
    }
  },
  methods: {
    openDialog (info, todo) {
      this.dialog = true
      console.log(info)
      this.info = info
      this.todo = todo
      if (todo === 'createpet') {
        this.$store.commit('getshowImgstatusFALSE')
        console.log('createpet')
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      } else if (todo === 'editpet') {
        console.log('editpet')
        this.$store.commit('getshowImgstatusTRUE')
        this.$store.commit('getImgUrl', info.pic)
        this.name = info.name
        this.breed = info.breed
        this.gender = info.gender
        this.date_of_birth = info.birthdate.split('T')[0]
        this.weight = info.weight
        this.fur_color = info.furcolor
        this.pettype = info.pettype
        this.bloodtype = info.bloodtype
      }
    },
    async createPet () {
      if (this.$refs.form.validate() === true) {
        var formData = new FormData()
        formData.append('file', this.$store.state.imgBlob, 'png')
        formData.append('name', this.name)
        formData.append('pettype', this.pettype)
        formData.append('breed', this.breed)
        formData.append('blood type', this.bloodtype)
        formData.append('gender', this.gender)
        formData.append('furcolor', this.fur_color)
        formData.append('weight', this.weight)
        formData.append('user_id', 1)
        formData.append('birthdate', this.date_of_birth)
        const result = await axios.post(
          process.env.VUE_APP_API + 'add_my_pet',
          formData
        )
        console.log(result)
        this.$store.commit('getcropparemove', true)
        this.$store.commit('getupdateMypet', true)
        this.$store.commit('getimgBlob', null)
        this.$store.commit('getImgUrl', null)
        this.dialog = false
      } else {
        console.log('can not create pet')
      }
    },
    async editpet () {
      if (this.$refs.form.validate() === true) {
        var formData = new FormData()
        if (this.$store.state.imgBlob === null) {
          formData.append('pet_id', this.info.pet_id)
          formData.append('file', '')
          formData.append('pet_type', this.pettype)
          formData.append('pet_name', this.name)
          formData.append('breed', this.breed)
          formData.append('gender', this.gender)
          formData.append('furcolor', this.fur_color)
          formData.append('weight', this.weight)
        } else {
          formData.append('pet_id', this.info.pet_id)
          formData.append('file', this.$store.state.imgBlob, 'png')
          formData.append('pet_type', this.pettype)
          formData.append('pet_name', this.name)
          formData.append('breed', this.breed)
          formData.append('gender', this.gender)
          formData.append('furcolor', this.fur_color)
          formData.append('weight', this.weight)
        }
        const result = await axios.post(
          process.env.VUE_APP_API + 'v2/edit_pet_info',
          formData
        )
        console.log(result)
        this.$store.commit('getcropparemove', true)
        this.$store.commit('getupdateMypet', true)
        this.$store.commit('getimgBlob', null)
        this.$store.commit('getImgUrl', null)
        this.dialog = false
      } else {
        console.log('can not create pet')
      }
    }
  }
}
</script>
