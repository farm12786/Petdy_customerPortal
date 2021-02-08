<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(post,index) in itempost" :key="index"
        class="d-flex child-flex pa-small"
        cols="4" sm="3" md="2"
      >
        <v-img
          @click="openTimelinedialog(post)"
          v-if="post.picture !== ''"
          :src="post.picture"
          :lazy-src="post.picture"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-img
          @click="openTimelinedialog(post)"
          v-if="post.picture === ''"
          src="../../../assets/icon/icon_PETDY.png"
          :lazy-src="post.picture"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <Timelinedialog ref="Timelinedialog" v-on:updatepost="getStory"/>
  </v-container>
</template>

<script>
import axios from 'axios'
import Timelinedialog from '@/components/Timeline/Timelinedialog'
import { mapState } from 'vuex'
export default {
  components: {
    Timelinedialog
  },
  data () {
    return {
      itempost: []
    }
  },
  methods: {
    async getStory () {
      const body = {
        user_id: 1
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_post_by_userid',
        body
      )
      this.itempost = result.data.list_post
    },
    openTimelinedialog (info) {
      var DAY = info.create_date.split('T')
      var TIME = DAY[1].split('.')
      info.DAY = DAY[0]
      info.TIME = TIME[0]
      console.log(info)
      this.$refs.Timelinedialog.openDialog(info)
    },
    openPostinfoDialog (info) {
      this.$refs.Postinfo.openDialog(info)
    }

  },
  mounted () {
    this.getStory()
  },
  computed: mapState(['updatePost']),
  watch: {
    updatePost (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue !== oldValue) {
        this.getStory()
      }
    }
  }
}
</script>

<style scoped>
.pa-small { padding: 2px; }
</style>
