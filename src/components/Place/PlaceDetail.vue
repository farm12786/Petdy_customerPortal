<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      :fullscreen='fullscreen'
      transition="dialog-bottom-transition"
      width="600"
    >
      <v-card class="pa-0">
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
          <v-toolbar-title>Place</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card tile elevation="0">
          <v-img
            class="white--text align-end"
            aspect-ratio="1.7"
            height="300px"
            :src="pathS3 + info.image"
            gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,.0)"
          >
            <v-chip :color="info.color" label text-color="white" class="ml-4">
              {{ info.txt }}
            </v-chip>

            <v-card-title>
              {{ info.first_name_th }}
            </v-card-title>
          </v-img>
        </v-card>

        <v-container grid-list-xs class="pa-5">
          <v-row>
            <v-col cols="2">
              <v-row justify="center" align-content="center">
                  <v-img
                      src="../../assets/icon/Phone.png"
                      max-height="30"
                      max-width="20">
                  </v-img>
              </v-row>
            </v-col>
            <v-col>
              {{info.telephone_no}}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-row justify="center" align-content="center">
                  <v-img
                      src="../../assets/icon/Lacation.png"
                      max-height="30"
                      max-width="20">
                  </v-img>
              </v-row>
            </v-col>
            <v-col>
              {{info.address}}
            </v-col>
          </v-row>

          <v-btn
            block
            outlined
            color="primary"
            @click="goToGmap(info.latitude, info.longitude, info.first_name_th, info.address)"
          >
            <v-img
              src="../../assets/icon/Google map.png"
              max-height="20"
              max-width="20"
            >
            </v-img>
              Go to Google Map
          </v-btn>

        </v-container>

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
      info: '',
      fullscreen: true
    }
  },

  methods: {
    openDialog (info, prev) {
      if (prev === 'placedesktop') {
        this.fullscreen = false
      } else if (prev === 'place') {
        this.fullscreen = true
      }
      this.dialog = true
      console.log('info', info)
      this.info = info
    },
    closeDialog () {
      this.dialog = false
    },
    goToGmap (lat, lng, placename, address) {
      window.location = 'https://www.google.com/maps/search/?api=1&query=' + placename + address
    }
  }
}
</script>
