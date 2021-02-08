<template>
  <div>
    <GmapMap
      id="map"
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
      style="min-width: 100%; min-height: 800px;"
    >

        <GmapCustomMarker
          v-for="(m, index) in filterMarker"
          :key="index"
          :marker="{
            lat: m.latitude,
            lng: m.longitude,
          }"
        >
          <v-img v-if="selectedindex  === index && selectedMarkerStatus === true" width="34" height="42" src="" @click="openMarkerInfoDialog(m, 'placemap', index)">

          </v-img>
          <v-img
            v-else-if="m.bu_type === 'hospital'"
            @click="openMarkerInfoDialog(m, 'placemap', index)"
            src="../../assets/icon/PlaceMarker/HospitalMarker.png"
          >
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%"
            >
              <v-img :src="pathS3 + m.image"> </v-img> </v-avatar
          ></v-img>
          <v-img
            v-else-if="m.bu_type === 'shop'"
            @click="openMarkerInfoDialog(m, 'placemap', index)"
            src="../../assets/icon/PlaceMarker/ShopMarker.png"
          >
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%"
            >
              <v-img :src="pathS3 + m.image"> </v-img> </v-avatar
          ></v-img>
          <v-img
            v-else-if="m.bu_type === 'hotel'"
            @click="openMarkerInfoDialog(m, 'placemap', index)"
            src="../../assets/icon/PlaceMarker/HotelMarker.png"
          >
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%"
            >
              <v-img :src="pathS3 + m.image"> </v-img> </v-avatar
          ></v-img>
          <v-img
            v-else-if="m.bu_type === 'salon'"
            @click="openMarkerInfoDialog(m, 'placemap', index)"
            src="../../assets/icon/PlaceMarker/SalonMarker.png"
          >
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%"
            >
              <v-img :src="pathS3 + m.image"> </v-img> </v-avatar
          ></v-img>
          <v-img
            v-else-if="m.bu_type === 'cafe'"
            @click="openMarkerInfoDialog(m, 'placemap', index)"
            src="../../assets/icon/PlaceMarker/CafeMarker.png"
          >
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%"
            >
              <v-img :src="pathS3 + m.image"> </v-img> </v-avatar
          ></v-img>
          <v-img
            v-else-if="m.bu_type === 'farm'"
            @click="openMarkerInfoDialog(m, 'placemap', index)"
            src="../../assets/icon/PlaceMarker/FarmMarker.png"
          >
            <v-avatar
              size="27"
              color="primary"
              rounded="circle"
              style="margin-left: 11%; margin-top: 10%"
            >
              <v-img :src="pathS3 + m.image"> </v-img> </v-avatar
          ></v-img>
        </GmapCustomMarker>

        <GmapMarker
        v-if="this.$store.state.showMarkerStatus === true"
        :position="{lat:selectedMarker[0].latitude, lng:selectedMarker[0].longitude}"
        :animation="4"
      />
    </GmapMap>
    <MarkerInfo ref="MarkerInfo"></MarkerInfo>
  </div>
</template>

<script>

import MarkerInfo from '@/components/Home/MarkerInfo'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import axios from 'axios'
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
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        name: null,
        image: null,
        phoneNumber: null,
        address: null
      },
      pathS3: process.env.VUE_APP_S3,
      itemsPlace: [],
      currentPositions: { lat: 0, lng: 0 }
    }
  },
  computed: {
    filterMarker () {
      if (this.$store.state.placeType !== 'All') {
        return this.itemsPlace.filter(
          (val) => val.bu_type === this.$store.state.placeType.toLowerCase()
        )
      }
      return this.itemsPlace
    }
  },
  updated () {
    this.selectedMarkerStatus = this.$store.state.showMarkerStatus
  },
  methods: {
    openMarkerInfoDialog (item, maptype, idx) {
      this.$store.commit('getshowMarkerStatus')
      this.selectedMarker = []
      this.selectedMarkerStatus = false
      this.selectedMarker.push(item)
      this.selectedindex = idx
      console.log(this.selectedMarker)
      this.$refs.MarkerInfo.openSheet(item, maptype)
    },
    async getMarker () {
      const body = {
        lat: '',
        long: ''
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_business_all',
        body
      )
      console.log('axios complete')
      this.itemsPlace = result.data.list_business
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
    },
    openWinInfo (index) {
      this.itemIndex = index
      this.filterMarker[index].infoWinOpen = true
      console.log(this.filterMarker[index])
    }
  },
  mounted () {
    this.getcurrentPosition()
    this.getMarker()
  }
}
</script>

<style scoped>
#markImg {
  margin-left: 16%;
  margin-top: 7%;
  justify-content: center;
}
</style>
