<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>User Profile</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <UploadeImage
        ref="addpetDialog"
        v-bind:width="250"
        v-bind:height="250"
      ></UploadeImage>

      <v-form ref="form" v-model="valid" lazy-validation class="px-5">
        <div class="txtbold primary--text pb-3">Name for Display</div>
        <v-row class="mx-0">
          <v-textarea
            clearable
            :rules="requireRule"
            auto-grow
            outlined
            rows="1"
            row-height="15"
            dense
            v-model="nickname"
            label="Nickname"
          ></v-textarea>
        </v-row>

        <div class="txtbold primary--text pb-3">Contact</div>

        <v-row class="mx-0">
          <v-textarea
            disabled
            auto-grow
            outlined
            rows="1"
            row-height="15"
            dense
            v-model="oneEmail"
            label="One Email"
          ></v-textarea>
          <v-textarea
            :rules="emailRules"
            clearable
            auto-grow
            outlined
            rows="1"
            row-height="15"
            dense
            v-model="email"
            label="Email"
          ></v-textarea>

          <v-textarea
            :rules="numericRules"
            clearable
            auto-grow
            outlined
            rows="1"
            row-height="15"
            dense
            v-model="mobile"
            label="Mobile Number"
          ></v-textarea>

          <v-btn block color="primary" elevation="0">SAVE</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadeImage from '@/components/uploadeImage'
export default {
  components: {
    UploadeImage
  },
  data () {
    return {
      dialog: false,

      nickname: null,
      oneEmail: 'natawat14277@one.th',
      email: null,
      mobile: null
    }
  },
  methods: {
    openDialog (info) {
      this.dialog = true
      console.log(info)
      this.$store.commit('getshowImgstatusTRUE')
      this.$store.commit('getImgUrl', info.profilepicture)
      this.nickname = info.first_name_eng + ' ' + info.last_name_eng
      this.mobile = info.phone
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
