<template>
    <GmapMap
      ref="map"
      id="map"
      :center="currentPositions"
      :zoom="15"
      map-type-id="roadmap"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: true
      }"
      style="width: 100%; height: 300px"
      @click="getclickLocation"
    >

      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>

</template>

<script>
export default {
  data () {
    return {
      currentPositions: { lat: 0, lng: 0 },
      markers: []
    }
  },
  methods: {
    getcurrentPosition () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPositions.lat = position.coords.latitude
          this.currentPositions.lng = position.coords.longitude
          console.log(this.currentPositions)
          this.markers.push({ position: this.currentPositions })
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    getclickLocation (event) {
      console.log(event.latLng.lat())
      console.log(event.latLng.lng())
      this.$store.commit('getLocationlat', event.latLng.lat())
      this.$store.commit('getLocationlng', event.latLng.lng())
      this.markers = [{ position: this.currentPositions }]
      this.markers.push({ position: { lat: event.latLng.lat(), lng: event.latLng.lng() } })
    }
  },
  mounted () {
    this.getcurrentPosition()
  }
}
</script>

<style lang="scss" scoped>

</style>
