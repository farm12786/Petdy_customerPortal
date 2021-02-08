<template>
  <v-container class="pt-0">

    <v-row justify="space-around py-2 white">
      <v-col cols="12" class="pa-0">
          <FriendList @update="updateEvents"/>
      </v-col>
    </v-row>
<v-data-iterator
      :items="postData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
          <v-row class="">
            <v-col class="pa-0" col="12" sm="6" md="4" v-for="(item, index) in props.items"
            :key="index">
                <v-card  height="535" min-width="250"  tile class=" mx-auto elevation-0 mt-2" :class="$vuetify.breakpoint.xs  ? '' : 'px-3'" width="100%">
          <v-card-actions  :class="$vuetify.breakpoint.xs ? 'pl-3' : 'pl-0'">
            <v-avatar size="25px">

               <v-img :src="item.user_picture"></v-img>

            </v-avatar>
            <div class="body-1 ml-2">{{item.nickname}}</div>
            <v-spacer></v-spacer>
             <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">

                  <v-icon color="greyC" v-bind="attrs"
                  v-on="on">mdi-dots-horizontal</v-icon>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menu"
                  :key="index"
                >
                  <v-list-item-title class="greyB--text" @click="openAddstory(info, 'editpost')">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>
          </v-card-actions>
<div @click="openTimelinedialog(item)">
                            <v-img class="pa-0" height="367" v-if="item.picture !== ''" :src="item.picture"></v-img>
              <v-img class="pa-0" v-if="item.picture === ''" src="../../src/assets/icon/icon_PETDY.png"> </v-img>
  <v-card-text  class="text--primary " :class="$vuetify.breakpoint.xs ? '' : 'px-1'">

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
      <Addstory ref="Addstory"/>
<Timelinedialog ref="Timelinedialog"/>
    <Menu/>
  </v-container>
</template>

<script>
import axios from 'axios'
import Addstory from '@/components/Home/Mystory/Addstory'

import Timelinedialog from '@/components/Timeline/Timelinedialog'
import FriendList from '@/components/Timeline/FriendList'
import Menu from '@/components/Menu'
export default {
  name: 'Timeline',
  components: {
    Addstory,
    FriendList,
    Menu,
    Timelinedialog,
    menu: [{
      title: 'Edit Post'
    },
    {
      title: 'Delete Post'
    }]
  },
  data () {
    return {
      // pathS3: process.env.VUE_APP_S4,
      postData: [],
      post_id: '',
      picture: '',
      caption: '',
      create_date: '',
      edited_date: '',
      nickname: '',
      page: 1,
      itemsPerPage: 99999,
      num: '1',
      menu: [{
        title: 'Edit Post'
      },
      {
        title: 'Delete Post'
      }]
    }
  },
  mounted () {
    this.getpost(this.num)
  },

  methods: {
    async getpost (num) {
      const body = {
        user_id: num
      }
      console.log('123456', body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_post_by_userid',
        body
      )
      // console.log(result.data.list_post)
      this.postData = result.data.list_post
      result.data.list_post.forEach(post => {
        var result = post.create_date.split('T')
        var result2 = result[1].split('.')
        post.DAY = result[0]
        post.TIME = result2[0]
      })
      this.num = this.$store.state.numberid
    },
    openAddstory (info, todo) {
      this.$refs.Addstory.openDialog(info, todo)
    },

    openTimelinedialog (info) {
      this.$refs.Timelinedialog.openDialog(info)
    },
    updateEvents (v) {
      // console.log(v)
      this.getpost(v)
    }
  }

}
</script>
