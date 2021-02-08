<template>
  <div>
    <placeProfile></placeProfile>
  </div>
</template>

<script>

import placeProfile from '@/components/Place/Placeprofile/Placeprofile'

export default {
  components: {
    placeProfile

  },
  data () {
    return {
      tab: null,
      fab: false

    }
  }
}
</script>

<style scoped>
.v-speed-dial--direction-top .v-speed-dial__list, .v-speed-dial--direction-bottom .v-speed-dial__list {
  left: -35px !important;
}
.v-slide-group__prev {
  display: none !important;
}
</style>
ื
