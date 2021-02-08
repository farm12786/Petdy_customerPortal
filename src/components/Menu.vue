<template >
  <div >
    <v-bottom-navigation app absolute color="primary" grow class="fix-bottom">
      <v-btn v-for="(m,i) in menu" :key="i" @click="goPage(m.path, i)">
        <span :class="active == i ? 'primary--text' : 'greyC--text'">{{m.title}}</span>
        <span class="icon" :class="active == i ? 'icon-active '+m.icon : m.icon"></span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  created () {
    if (localStorage.getItem('active')) {
      this.active = localStorage.getItem('active')
    }
  },
  data () {
    return {
      active: 0,
      menu: [
        {
          title: 'Home',
          icon: 'icon-home',
          path: '/'
        },
        {
          title: 'Timeline',
          icon: 'icon-timeline',
          path: '/timeline'
        },
        {
          title: 'Community',
          icon: 'icon-community',
          path: '/community/0'
        },
        {
          title: 'Place',
          icon: 'icon-place',
          path: '/place'
        }
      ]
    }
  },
  methods: {
    goPage (path, i) {
      localStorage.setItem('active', i)
      this.active = i
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default { height: auto; }
.fix-bottom {
   position: fixed !important;
   left: 0;
   bottom: 0;
   width: 100%;
}
.icon-home { mask: url('../assets/icon/Home.svg'); }
.icon-timeline { mask: url('../assets/icon/Timeline.svg'); }
.icon-community { mask: url('../assets/icon/Community.svg'); }
.icon-place { mask: url('../assets/icon/Place.svg'); }
.icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: var(--v-greyC-base);
  mask-size: cover;
}
.icon-active { background: var(--v-primary-base); }
</style>
