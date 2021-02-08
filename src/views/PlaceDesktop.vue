<template>
<div>
  <v-app-bar app color="primary" class="px-10">
      <img src="../assets/logo.png" height="70%" class="mr-16"/>

      <v-btn text elevation="0" color="white" class="txtreg px-6">Home</v-btn>
      <v-btn text elevation="0" color="white" class="txtreg px-6">Technology</v-btn>
      <v-btn text elevation="0" color="white" class="txtreg px-6">Feature</v-btn>
      <v-menu offset-y>
              <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text elevation="0" color="white" class="txtreg px-6">
                    Product
                    <v-icon class="pl-1">mdi-chevron-down</v-icon>
                  </v-btn>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in productmenu"
                  :key="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
      </v-menu>
      <v-menu offset-y>
              <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text elevation="0" color="white" class="txtreg px-6">
                    Community
                    <v-icon class="pl-1">mdi-chevron-down</v-icon>
                  </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in communitymenu"
                  :key="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
      </v-menu>
      <v-menu offset-y>
              <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text elevation="0" color="white" class="txtreg px-6">
                    Place
                    <v-icon class="pl-1">mdi-chevron-down</v-icon>
                  </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in Placemenu"
                  :key="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
      </v-menu>

      <v-btn text elevation="0" color="white" class="txtreg px-6">Contact</v-btn>

  </v-app-bar>

  <v-container fluid class="pa-10">
      <Toolbar @val="getPlaceType"/>
      <PlaceList v-if="this.$store.state.placePageSelect === 'placeList'" v-bind:desktop="true"/>
      <PlaceMap v-if="this.$store.state.placePageSelect === 'map'"/>
  </v-container>
</div>
</template>

<script>
import Toolbar from '@/components/Place/Toolbar'
import PlaceList from '@/components/Place/PlaceList'
import PlaceMap from '@/components/Place/PlaceMap'
export default {
  components: {
    PlaceList,
    Toolbar,
    PlaceMap
  },
  data () {
    return {
      productmenu: [
        {
          title: 'Collar v.1'
        },
        {
          title: 'Collar v.2'
        },
        {
          title: 'Collar v.3'
        }
      ],
      communitymenu: [
        {
          title: 'Blog'
        },
        {
          title: 'Lost & Found'
        },
        {
          title: 'Find Home'
        },
        {
          title: 'Donate'
        }
      ],
      Placemenu: [
        {
          title: 'Hospital'
        },
        {
          title: 'Hotel'
        },
        {
          title: 'Shop'
        },
        {
          title: 'Salon'
        },
        {
          title: 'Farm'
        },
        {
          title: 'Cafe'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
