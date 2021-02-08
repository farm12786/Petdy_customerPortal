<template>
  <div>
    <TabsMenu :active="tab" @select="selectTab"/>

    <Blog v-if="tab === 0"/>
    <LostFound v-if="tab === 1"/>
    <FindHome v-if="tab === 2"/>
    <!-- <Matching v-if="tab === 3"/> -->
    <Donate v-if="tab === 3"/>

    <Menu/>
  </div>
</template>

<script>
import Blog from '@/components/Community/Blog'
import LostFound from '@/components/Community/LostFound'
import FindHome from '@/components/Community/FindHome'
// import Matching from '@/components/Community/Matching'
import Donate from '@/components/Community/Donate'
import TabsMenu from '@/components/Community/TabsMenu'
import Menu from '@/components/Menu'
export default {
  name: 'Community',
  components: {
    Blog,
    LostFound,
    FindHome,
    // Matching,
    Donate,
    TabsMenu,
    Menu
  },
  created () {
    this.tab = parseInt(this.$route.params.tab)
  },
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    selectTab (v) {
      this.tab = v
    }
  }
}
</script>
