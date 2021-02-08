<template>
  <v-app id="inspire">

    <v-app-bar app color="primary">
      <img src="../assets/logo.png" height="70%"/>
      <v-spacer></v-spacer>
      <v-icon color="white" @click="clearLocal()">mdi-magnify</v-icon>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary right >
      <MainMenu />
    </v-navigation-drawer>

    <v-main class="pa-0">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MainMenu from '@/components/MainMenu'
export default {
  components: {
    MainMenu
  },
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    clearLocal () {
      localStorage.clear()
    }
  }
}
</script>
