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
          <v-toolbar-title>Donate Blood</v-toolbar-title>

        </v-toolbar>
        <v-list
          three-line
          subheader
        >
<v-container  class=" mt-n3">
    <v-row>
      <v-col align="center" cols="12">
        <v-card elevation="0">
            <v-img width="200" height="200" v-if="info.picture !== ''" :src=" info.picture " ></v-img>
            <v-img width="200" height="200" v-if="info.picture === ''" src="../../assets/icon/icon_PETDY.png"></v-img>
        </v-card>
      </v-col>
      <v-col align="center" cols="12"><span class=" secondary--text txtbold txtbig">{{ info.title }}</span> </v-col>
            <v-col align="end" cols="12"><v-icon  small class=" greyB--text txtsmall collocateIcon ">mdi-clock-outline</v-icon> <span class="ml-1  greyB--text txtsmall">{{info.DAY}} {{info.TIME}}</span> </v-col>
       <!-- <v-col align="center"  cols="12"><span  class="brown--text">Contact : {{ info.mobile_no }}</span> </v-col> -->
      <v-col cols="12"><span v-html="info.detail"></span> </v-col>
    </v-row>
    </v-container>
        </v-list>
      <v-col >
  <v-btn block class="brown white--text">
    Donate Blood
  </v-btn>
    </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {

  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      info: ''
    }
  },
  methods: {
    openDialog (info) {
      this.dialog = true
      console.log('info', info)
      this.info = info
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
