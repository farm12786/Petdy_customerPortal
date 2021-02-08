<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >

      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{info.first_name_en ||info.owner_name}} is Timeline</v-toolbar-title>

        </v-toolbar>
        <v-list
          three-line
          subheader
        >
<v-card height="" tile class=" mx-auto elevation-0 mt-2" :class="$vuetify.breakpoint.xs  ? '' : 'px-3'" width="100%">
    <v-row>
      <v-col class="pr-1" cols="4" sm="3" md="2">
        <v-avatar size="100">
          <!-- <img src="../../assets/icon/user.png"> -->
          <img :src="info.user_picture||info.owner_pic">
        </v-avatar>
      </v-col>
      <v-col class="pl-0" cols="8" sm="9" md="10">
        <v-row class="mt-3 pl-6">
          <v-col>
          <b class="secondary--text">{{info.first_name_en ||info.owner_name}}</b>
          </v-col>
          <v-col>
             <v-row class="mt-3 pl-0" align="center">
                  <!-- <v-chip v-if="info.status === 1" color="hospital" text-color="white" class="ml-4 px-5">
                      Normal
                  </v-chip> -->

                  <v-btn v-if="this.followstatus === 1" @click="unfollow (),updated()" elevation="0" rounded height="27" width="100" class="primary mt-n6">
                      <span class="txtsmall white--text ">Following</span>
                  </v-btn>
                  <v-btn v-if="this.followstatus === 0" @click="follow (),updated()" elevation="0" rounded height="27" width="100" class=" primary--stoke mt-n6">
                      <span class="txtsmall primary--text ">Follow</span>
                  </v-btn>
                </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col class="pb-0 text-center" cols="4">
            <h2 class="txtbold">{{numOfPost}}</h2>
            <div class="txtsmall">Posts</div>
          </v-col>
          <v-col class="pb-0 pl-0 text-center" cols="4">
            <h2 class="txtbold">{{numOfFollowing}}</h2>
            <div class="txtsmall">Following</div>
          </v-col>
          <v-col class="pb-0 pl-0 text-center" cols="4">
            <h2 class="txtbold">{{numOfFollower}}</h2>
            <div class="txtsmall">Followers</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
        </v-card>
        </v-list>
        <!-- <v-divider /><v-divider /><v-divider /><v-divider /> -->
        <v-container class="pt-0 greyF1" >
<v-data-iterator
      :items="postData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
          <v-row class=" ">
            <v-col class="pa-0" col="12" sm="6" md="4" v-for="(item, index) in props.items"
            :key="index">
                <v-card  height="535" min-width="250"  tile class=" mx-auto elevation-0 mt-2" :class="$vuetify.breakpoint.xs  ? '' : 'px-3'" width="100%">
          <v-card-actions  :class="$vuetify.breakpoint.xs ? 'pl-3' : 'pl-0'">
            <v-avatar size="25px">

               <v-img :src="item.user_picture"></v-img>

            </v-avatar>
            <div class="body-1 ml-2">{{item.nickname}}</div>
            <v-spacer></v-spacer>
            <!-- <v-btn  icon color="grey">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn> -->
          </v-card-actions>
<div @click="openTimelinedialog(item)">
                             <v-img height="367" v-if="item.picture !== ''" :src="item.picture"></v-img>
              <v-img height="367" v-if="item.picture === ''" src="../../assets/icon/icon_PETDY.png"> </v-img>

          <v-card-text  class="text--primary" :class="$vuetify.breakpoint.xs ? '' : 'px-1'">
            <v-btn class="ml-n3"  icon >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <span>{{item.count_like}} like </span>
             <v-btn   icon >
              <v-icon>mdi-message-outline</v-icon>
            </v-btn>
            <span>{{item.count_comment}} Comments </span>
            <div>{{item.caption}}</div>
            <div class="mt-1 grey--text txtsmall">
              <v-icon small class="collocateIcon">mdi-clock-outline</v-icon>
              <span class="ml-1">{{item.DAY}} {{item.TIME}}</span>
            </div>
          </v-card-text>

</div>
        </v-card>
            </v-col>
          </v-row>

      </template>
    </v-data-iterator>
        </v-container>

      </v-card>

    </v-dialog>
      <Timelinedialog ref="Timelinedialog"/>

  </v-row>

</template>

<script>
import axios from 'axios'
import Timelinedialog from '@/components/Timeline/Timelinedialog'

export default {
  components: {
    Timelinedialog
  },
  data () {
    return {
      postData: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      info: '',
      idpost: '',
      page: 1,
      itemsPerPage: 99999,
      num: '',
      userid: '',
      friendid: '',
      numOfPost: null,
      numOfFollowing: null,
      numOfFollower: null,
      followstatus: null
    }
  },
  methods: {
    async unfollow () {
      // this.updated()

      // this.getFollow()
      await this.axios.post(
        process.env.VUE_APP_API + 'unfollow_user', {
          followby_id: this.userid,
          followto_id: this.friendid

        }
      ).then(res => { console.log(res.data) })
      this.getFollow()
      this.$store.commit('getupdateTimeline')
    },
    async follow () {
      // this.updated()
      // this.getFollow()
      await this.axios.post(
        process.env.VUE_APP_API + 'follow_user', {
          followby_id: this.userid,
          followto_id: this.friendid

        }
      ).then(res => { console.log(res.data) })
      this.getFollow()
      this.$store.commit('getupdateTimeline')
    },
    updated () {
      if (this.getFollow) {
        this.getFollow()
      }
    },
    async getFollow () {
      this.userid = this.$store.state.userID
      this.friendid = this.info.user_id || this.info.user_create_id
      // this.friendid = this.info.user_create_id
      // console.log('Test-FFF === ', this.friendid)
      // console.log('Test-userid === ', this.userid)
      const body = {
        user_id: this.userid,
        friend_id: this.friendid
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_user_follow',
        body
      )
      console.log(result)
      this.numOfFollowing = result.data.following_count
      this.numOfFollower = result.data.follower_count
      this.numOfPost = result.data.post_count
      this.followstatus = result.data.follow_status
    },
    async getpost () {
      this.num = this.info.user_id || this.info.user_create_id
      console.log('Test num', this.num)

      const body = {
        user_id: this.num
      }
      console.log('body ==', body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_post_by_userid',
        body
      )
      console.log(result.data.list_post)
      this.postData = result.data.list_post
      result.data.list_post.forEach(post => {
        var result = post.create_date.split('T')
        var result2 = result[1].split('.')
        post.DAY = result[0]
        post.TIME = result2[0]
      })
    },
    openTimelinedialog (info) {
      this.$refs.Timelinedialog.openDialog(info)
    },
    openDialog (info) {
      this.dialog = true
      this.info = info
      console.log(this.info)
      this.getpost()
      this.getFollow()
    },
    closeDialog () {
      this.$store.commit('getupdateTimeline')
      this.dialog = false
    }
  },

  mounted () {
    this.getpost()
    this.getFollow()
  }
}
</script>
