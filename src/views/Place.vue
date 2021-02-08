<template>
  <v-container fluid class="pa-0">
    <Toolbar @val="getPlaceType"/>
    <v-container  v-if="this.$store.state.placePageSelect === 'placeList'">
      <PlaceList/>
    </v-container>
    <PlaceMap v-if="this.$store.state.placePageSelect === 'map'"/>
    <Menu/>
  </v-container>
</template>

<script>
import PlaceList from '@/components/Place/PlaceList'
import PlaceMap from '@/components/Place/PlaceMap'
import Toolbar from '@/components/Place/Toolbar'
import Menu from '@/components/Menu'
export default {
  name: 'Place',
  components: {
    PlaceMap,
    PlaceList,
    Toolbar,
    Menu

  },
  data () {
    return {
      placeType: ''
    }
  },
  methods: {
    getPlaceType () {
      this.placeType = this.$store.state.placeType
    },
    openPlaceDetail (info) {
      this.$refs.PlaceDetail.openDialog(info)
    }
  }

}
</script>
