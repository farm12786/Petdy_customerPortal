<template>

  <v-chip-group multiple>
      <v-badge class="mx-3 stokeImgMe" color="primary" icon="mdi-plus" bottom bordered offset-x="20" offset-y="20">
      <v-avatar @click="numberid(1)" size="65">
        <v-img src="../../assets/icon/icondefault.png"></v-img>
      </v-avatar>
    </v-badge>
      <v-data-iterator
      :items="userfollowData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
          <v-row class="px-1 ">
            <v-col class="pa-0" col="12" sm="6" md="4"  v-for="(item, index) in props.items"
            :key="index">
       <v-avatar @click="openFriendListdialog(item)" size="65" class="mr-2 stokeImg" >
        <v-img :src="item.user_picture"></v-img>
       </v-avatar>
            </v-col>
          </v-row>

      </template>
    </v-data-iterator>
    <!-- <v-badge class="mx-3 stokeImgMe" color="primary" icon="mdi-plus" bottom bordered offset-x="20" offset-y="20">
      <v-avatar @click="numberid(1)" size="65">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
      </v-avatar>
    </v-badge>
    <v-avatar @click="numberid(5)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
    </v-avatar>
    <v-avatar @click="numberid(3)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
    </v-avatar>
     <v-avatar @click="numberid(4)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
    </v-avatar>
    <v-avatar @click="numberid(6)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
    </v-avatar> -->
        <FriendListdialog ref="FriendListdialog"/>

  </v-chip-group>

</template>

<script>
import axios from 'axios'
import FriendListdialog from '@/components/Timeline/FriendListdialog'
import { mapState } from 'vuex'

export default {
  name: 'Timeline',
  components: {
    FriendListdialog

  },
  data () {
    return {
      userfollowData: [],
      post_id: '',
      picture: '',
      caption: '',
      create_date: '',
      edited_date: '',
      nickname: '',
      page: 1,
      itemsPerPage: 99999

    }
  },

  methods: {
    async getTimeline () {
      const body = {
        user_id: 1,
        friend_id: 1
      }
      console.log(body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_user_follow',
        body
      )
      console.log(result.data.list_following)
      this.userfollowData = result.data.list_following
    },
    openTimelinedialog (info) {
      this.$refs.Timelinedialog.openDialog(info)
    },
    openFriendListdialog (info) {
      this.$refs.FriendListdialog.openDialog(info)
    },
    numberid (num) {
      // console.log(num)
      this.$store.commit('getnumberid', num)
      this.$emit('update', num)
    }
  },
  mounted () {
    this.getTimeline()
  },
  watch: {
    updateTimeline (newValue, oldValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        console.log('update')
        this.getTimeline()
        this.$store.commit('getupdateTimelineFALSE')
      }
    }
  },
  computed: mapState(['updateTimeline'])

}
</script>

<style scoped>
.stokeImg { border: 3px solid var(--v-secondary-base); }
.stokeImgMe {
  border: 1px solid var(--v-ptimary-base);
}
</style>
