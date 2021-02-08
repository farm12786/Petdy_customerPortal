<template>
      <v-toolbar elevation="0">
        <template>
          <v-col cols="8" sm="10" md="10" lg="10" class="px-0">
            <v-select
              outlined
              dense
              v-model="placeType"
              hide-details
              :items="place"
              elevation="0"
              prepend-inner-icon="mdi-magnify"
            >
            </v-select>
          </v-col>
          <v-spacer></v-spacer>

          <v-btn icon @click="setPlacePageSelect('placeList')" elevation="0">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
          <v-btn icon @click="setPlacePageSelect('map')" elevation="0">
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </template>
      </v-toolbar>

</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      placeType: this.$store.state.placeType,
      place: ['All', 'Hospital', 'Hotel', 'Cafe', 'Farm', 'Salon', 'Shop']
    }
  },
  watch: {
    placeType (val) {
      this.$store.commit('getPlaceType', val)
    }
  },
  methods: {
    setPlacePageSelect (val) {
      this.$store.commit('getPlacePageSelect', val)
    }
  }
}
</script>
