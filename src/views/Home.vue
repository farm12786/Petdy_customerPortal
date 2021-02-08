<template>
  <div>
    <Profile/>
    <v-container class="pa-0">
      <v-tabs fixed-tabs color="secondary" height="40px" v-model="tab">
        <v-tab>
          <span class="txtsmall txtbold">Pet Location</span>
        </v-tab>
        <v-tab>
          <span class="txtsmall txtbold">My Pet</span>
        </v-tab>
        <v-tab>
          <span class="txtsmall txtbold">My Story</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item> <PetLocation/> </v-tab-item>
        <v-tab-item> <MyPet/> </v-tab-item>
        <v-tab-item> <MyStory/> </v-tab-item>
        <v-overlay z-index="0" opacity=".7" :value="fab"></v-overlay>
        <v-speed-dial v-model="fab" :bottom="true" :right="true" :open-on-hover="false"
          direction="top" transition="slide-y-reverse-transition" class="mb-15" fixed
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="primary" dark fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
          <div class="d-flex text-right">
            <span class="txtsmall white--text mt-4 mr-2" style="white-space: nowrap">Create Pet</span>
            <v-btn fab small color="secondary" @click="openAddpetFormDialog('', 'createpet')">
              <v-icon>mdi-paw</v-icon>
            </v-btn>
          </div>
          <div class="d-flex text-right mr-2">
            <span class="txtsmall white--text mt-4 mr-2" style="white-space: nowrap">Create Story</span>
            <v-btn fab small color="secondary" @click="openAddstory('', 'createpost')">
              <v-icon>mdi-image-outline</v-icon>
            </v-btn>
          </div>

        </v-speed-dial>
      </v-tabs-items>
    </v-container>
    <AddpetForm ref="AddpetFormDialog"/>
    <Addstory ref="Addstory"/>
    <Menu/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Profile from '@/components/Home/Profile'
import PetLocation from '@/components/Home/PetLocation'
import MyPet from '@/components/Home/Mypet/MyPet'
import MyStory from '@/components/Home/Mystory/MyStory'
import AddpetForm from '@/components/Home/Mypet/Addpet/AddpetForm'
import Addstory from '@/components/Home/Mystory/Addstory'

export default {
  name: 'Home',
  components: {
    MyStory,
    MyPet,
    PetLocation,
    Profile,
    Menu,
    AddpetForm,
    Addstory
  },
  created () {
    localStorage.setItem('active', 0)
  },
  data () {
    return {
      tab: null,
      fab: false
    }
  },
  methods: {
    openAddpetFormDialog (info, todo) {
      this.$refs.AddpetFormDialog.openDialog(info, todo)
    },
    openAddstory (info, todo) {
      this.$refs.Addstory.openDialog(info, todo)
    }
  },
  watch: {
    tab (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (oldValue === 0 && newValue !== 0) {
        console.log('tabchange')
        this.$store.commit('getclosemarkerInfo', true)
      }
    }
  }
}
</script>

<style scoped>
>>> .v-speed-dial--direction-top .v-speed-dial__list, .v-speed-dial--direction-bottom .v-speed-dial__list {
  left: -35px !important;
}
</style>

ื
