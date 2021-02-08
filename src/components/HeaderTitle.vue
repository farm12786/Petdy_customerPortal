<template>
  <v-app id="inspire">
    <v-app-bar app color="primary">
      <v-icon  @click="goBack()" color="white"  >mdi-chevron-left</v-icon>
      <div  class="text-center txtreg white--text">{{ title }}</div>
      <v-spacer></v-spacer>
      <v-icon color="white" @click="clearLocal()">mdi-magnify</v-icon>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary right >
      <MainMenu />
    </v-navigation-drawer>
    <v-main class="pa-0">
      <router-view @title="onData"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      title: ''
    }
  },
  methods: {
    clearLocal () {
      localStorage.clear()
    },
    goBack () {
      window.history.back()
    },
    onData (v) {
      this.title = v
    }
  }
}
</script>
