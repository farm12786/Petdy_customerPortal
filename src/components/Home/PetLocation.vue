<template>
  <div>
    <GmapMap
      ref="mapforgetcoordinate"
      id="mapforgetcoordinate"
      :center="currentPositions"
      :zoom="15"
      map-type-id="terrain"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: true
      }"
      style="width: 100%; height: 700px"
    >
      <GmapCustomMarker
        v-for="(m, index) in markers"
        :key="index"
        :marker="m.position"
        :animation="1"
      >
        <v-img v-if="selectedindex  === index && selectedMarkerStatus === true" width="34" height="42" src="" @click="openMarkerInfoDialog(m, 'petmap', index)">

        </v-img>

        <v-img v-else-if="m.status === 1" @click="openMarkerInfoDialog(m, 'petmap', index)" src="../../assets/icon/PetMarker/NormalPet.png">
          <v-avatar size="27" color="primary" rounded="circle" class="markerAvatar">
            <v-img :src="m.pic"> </v-img>
            <!-- {{m.image}} -->
          </v-avatar>
        </v-img>

        <v-img v-else-if="m.status === -1" @click="openMarkerInfoDialog(m, 'petmap', index)" src="../../assets/icon/PetMarker/LostPet.png">
          <v-avatar size="27" color="primary" rounded="circle" class="markerAvatar">
            <v-img :src="m.pic"> </v-img>
            <!-- {{m.image}} -->
          </v-avatar>
        </v-img>

        <v-img v-else-if="m.realuser_id === userID" @click="openMarkerInfoDialog(m, 'petmap', index)" src="../../assets/icon/PetMarker/MyPet.png">
          <v-avatar size="27" color="primary" rounded="circle" class="markerAvatar">
            <v-img :src="m.pic"> </v-img>
            <!-- {{m.image}} -->
          </v-avatar>
        </v-img>

      </GmapCustomMarker>

      <GmapMarker
        v-if="this.$store.state.showMarkerStatus === true"
        :position="selectedMarker[0].position"
        :animation="4"
      />
    </GmapMap>
    <MarkerInfo ref="MarkerInfo"></MarkerInfo>
  </div>
</template>

<script>
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import MarkerInfo from '@/components/Home/MarkerInfo'
import doglogo from '../../assets/icon/icon_PETDY.png'
export default {
  components: {
    GmapCustomMarker,
    MarkerInfo
  },
  data () {
    return {
      selectedMarkerStatus: false,
      selectedMarker: [],
      selectedindex: null,
      pathS3: process.env.VUE_APP_S3,
      butype: 'All',
      currentPositions: { lat: 0, lng: 0 },
      markers: [],
      userID: null
    }
  },
  updated () {
    this.selectedMarkerStatus = this.$store.state.showMarkerStatus
  },
  methods: {
    openMarkerInfoDialog (item, maptype, idx) {
      console.log(idx)
      this.$store.commit('getshowMarkerStatusTRUE')
      this.selectedMarker = []
      this.selectedMarker.push(item)
      this.selectedindex = idx
      this.$refs.MarkerInfo.openSheet(item, maptype)
    },
    async getMarker () {
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_location'
      )
      console.log(result)
      result.data.list_pet_location.forEach((marker) => {
        this.markers.push({
          position: {
            lat: marker.latitude,
            lng: marker.longitude
          },
          id: marker.id,
          pic: doglogo,
          name: marker.name,
          status: marker.status,
          type: marker.pettype,
          breed: marker.breed,
          gender: marker.gender,
          date_of_birth: marker.birthdate,
          weight: marker.weight,
          furcolor: marker.furcolor,
          updatetime: marker.update
        })
      })
    },
    getcurrentPosition () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPositions.lat = position.coords.latitude
          this.currentPositions.lng = position.coords.longitude
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    clearMarker () {
      this.markers = []
    }
  },
  async mounted () {
    this.userID = this.$store.state.userID
    await this.getcurrentPosition()
    this.clearMarker()
    this.getMarker()
  }
}
</script>

<style scoped>
.v-speed-dial--direction-top .v-speed-dial__list,
.v-speed-dial--direction-bottom .v-speed-dial__list {
  left: -35px !important;
}
.v-slide-group__prev {
  display: none !important;
}
.markerAvatar{
  margin-left: 11%; margin-top: 10%
}

</style>
