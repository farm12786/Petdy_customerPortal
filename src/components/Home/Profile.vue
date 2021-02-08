<template>
  <v-container class="px-3 pt-2 py-0 white">
    <v-row>
      <v-col class="pr-1" cols="4" sm="3" md="2">
        <v-avatar size="100">
          <!-- <img src="../../assets/icon/user.png"> -->
          <img :src="userImg" @click="openUserprofile(userprofile)">
        </v-avatar>
      </v-col>
      <v-col class="pl-0" cols="8" sm="9" md="10">
        <v-row class="mt-3 pl-6">
          <b class="secondary--text">{{nickName}}</b>
        </v-row>
        <v-row>
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
    <Userprofile ref="Userprofile"></Userprofile>
  </v-container>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Userprofile from '@/components/Home/Userprofile'
export default {
  components: {
    Userprofile
  },
  data () {
    return {
      token: [],
      userImg: '../../assets/icon/user.png',
      nickName: ' ',
      oneID: null,
      itempet: null,
      numOfPost: null,
      numOfFollowing: null,
      numOfFollower: null,
      userprofile: '',
      lstoken: this.$ls.get('token')
    }
  },
  methods: {
    openUserprofile (info) {
      this.$refs.Userprofile.openDialog(info)
    },
    async getStory () {
      const body = {
        user_id: 1
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_post_by_userid',
        body
      )
      this.numOfPost = result.data.list_post.length
    },
    async getFollow () {
      const body = {
        user_id: 1,
        friend_id: 1
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_user_follow',
        body
      )
      console.log(result)
      this.numOfFollowing = result.data.following_count
      this.numOfFollower = result.data.follower_count
    },
    async getMypet () {
      const body = {
        user_id: 1
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_by_userid',
        body
      )
      this.itempet = result.data.pet_data
    },
    async getUserID () {
      var paramsString = window.location.href
      var searchParams = new URLSearchParams(paramsString)
      searchParams.forEach(token => {
        this.token.push(token)
        this.$store.commit('settoken', this.token[0])
        if (this.token[0] !== '') {
          this.$ls.set('token', this.token[0])
        }
      })

      console.log(this.$ls.get('token'))
      const body = {
        bot_id: 'B3ab363e4d008522a80e72c94b5ce775b',
        // source: this.token[0],
        source: this.$ls.get('token'),
        name: 'true'
      }
      const headers = {
        Authorization:
        'Bearer A1f52b98be0f25416a6a9a262d15747cbfa622f189173425aa8b8ba03bf8d67822a6ab46d22c34e21835d0ec2bb50240d'
      }

      const result1 = await axios.post(
        'https://chat-api.one.th/manage/api/v1/getprofile',
        body,
        { headers }
      )
      console.log(result1)
      this.userprofile = result1.data.data
      this.userImg = result1.data.data.profilepicture
      this.nickName = result1.data.data.first_name_eng + ' ' + result1.data.data.last_name_eng
      this.oneID = result1.data.data.one_id

      // const result2 = await axios.post(
      //   'https://testchat.one.th/petdy/get_user_by_oneid',
      //   {
      //     one_id: 1
      //   }
      // )
      // console.log(result2.data.user_data.user_id)
      // this.$store.commit('getuserID', result2.data.user_data.user_id)
    }
  },
  async mounted () {
    await this.getUserID()
    this.getStory()
    this.getFollow()
    await this.getMypet()
    this.$store.commit('getitemMypet', this.itempet)
    console.log(this.$store.state.itemMypet)
  },
  computed: mapState(['updateprofile', 'token']),
  watch: {
    updateprofile (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        this.getStory()
        this.$store.commit('getupdateprofile', false)
      }
    },
    lstoken (newValue, oldValue) {
      console.log('lstoken change')
    }
  },
  updated () {
    this.lstoken = this.$ls.get('token')
  }
}
</script>
