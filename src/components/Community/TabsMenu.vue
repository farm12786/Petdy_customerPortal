<template>
  <v-tabs center-active centered color="secondary" height="40px" v-model="tab">
    <v-tab v-for="(menu, i) in itemsTab" :key="i" @click="goPage(i)">
      <span class="txtsmall txtbold">{{menu.text}}</span>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: ['active'],
  created () {
    this.tab = this.active
  },
  data () {
    return {
      tab: 0,
      itemsTab: [
        { id: 0, text: 'Blog' },
        { id: 1, text: 'Lost&Found' },
        { id: 2, text: 'Find Home' },
        // { id: 3, text: 'Matching' },
        { id: 3, text: 'Donate Blood' }
      ]
    }
  },
  methods: {
    goPage (i) {
      this.$emit('select', i)
      this.$router.push('/community/' + i)
    }
  }
}
</script>

<style scoped>
>>> .v-slide-group__prev {
  display: none !important;
}
</style>
