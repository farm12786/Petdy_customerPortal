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
            @click="dialog = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Lost&Found</v-toolbar-title>

        </v-toolbar>
        <v-list
          three-line
          subheader
        >
<v-row>
<v-col cols="4" align="center">
    <v-avatar   size="80" >
             <v-img :src="info.pic" ></v-img>
          </v-avatar>
  </v-col>
  <v-col cols="8">
     <v-col  cols="12"><span class="txtbold shop--text txtbig" >{{ info.name }}</span> </v-col>
    <v-col cols="12">
      <h6>{{info.pettype}} | {{info.gender}} | {{info.furcolo}}</h6>
    </v-col>
  </v-col>
</v-row>
<v-divider ></v-divider><v-divider ></v-divider><v-divider ></v-divider>

<v-container  class=" mt-n3">
    <v-row>
      <!-- <v-col align="center" cols="12">
        <v-avatar size="120px">
            <v-img :src=" pathS3 + info.pic " ></v-img>
        </v-avatar>
      </v-col> -->

        <!-- <v-col cols="12"><v-divider ></v-divider><v-divider ></v-divider><v-divider ></v-divider> </v-col> -->
      <v-col cols="4"><div class="txtbold">Detail</div></v-col>
      <v-col >:</v-col>
      <v-col cols="7"><span > {{ info.title }}</span></v-col>
      <v-col cols="12"><v-divider></v-divider> </v-col>
      <v-col cols="4"><div class="txtbold">Last seen</div></v-col>
      <v-col >:</v-col>
      <v-col cols="7"><span > {{info.DAY}}</span></v-col>
      <v-col cols="12"><v-divider></v-divider> </v-col>
      <v-col cols="4"><div class="txtbold">Location</div></v-col>
      <v-col >:</v-col>
      <v-col cols="7"><span > {{ info.lastseenplace}}</span></v-col>
      <v-col cols="12">
        <v-card height="250">
          <div>
    <GmapMap
      id="map"
      :center="{
            lat: info.lastseen_latitude,
            lng: info.lastseen_longitude,}"
      :zoom="15"
      map-type-id="terrain">
      <div>
        <GmapCustomMarker
          :marker="{
            lat: info.lastseen_latitude,
            lng: info.lastseen_longitude,}">
          <v-img

            src="../../assets/icon/PlaceMarker/HospitalMarker.png">
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%">
              <v-img :src="pathS3 + info.pic "> </v-img> </v-avatar></v-img>
        </GmapCustomMarker>
      </div>
    </GmapMap>
  </div>
        </v-card>
      </v-col>
      <v-col>
  <v-btn block class="shop white--text">
    <v-icon color="white darken-2">mdi-message-text</v-icon> Chat
  </v-btn>
      </v-col>
    </v-row>
    </v-container>
        </v-list>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker'
export default {
  components: {
    GmapCustomMarker
  },
  data () {
    return {
      currentPositions: { lat: 0, lng: 0 },
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
    },
    getcurrentPosition () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPositions.lat = position.coords.latitude
          this.currentPositions.lng = position.coords.longitude
          console.log(this.currentPositions)
        },
        (error) => {
          console.log(error.message)
        }
      )
    }
  },
  mounted () {
    this.getcurrentPosition()
  }
}
</script>

<style scoped>
#map {
  min-width: 100%;
  min-height: 250px;
}
#markImg {
  margin-left: 16%;
  margin-top: 7%;
  justify-content: center;
}
</style>
