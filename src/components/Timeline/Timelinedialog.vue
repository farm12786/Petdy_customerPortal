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
          <v-toolbar-title>Comments</v-toolbar-title>

        </v-toolbar>
        <v-list
          three-line
          subheader
        >
        <v-card height="" tile class=" mx-auto elevation-0 mt-2" :class="$vuetify.breakpoint.xs  ? '' : 'px-3'" width="100%">
          <v-card-actions :class="$vuetify.breakpoint.xs ? 'pl-3' : 'pl-0'">
            <v-avatar size="25px">
               <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->

               <v-img :src="info.user_picture"></v-img>

            </v-avatar>
            <div class="body-1 ml-2">{{info.nickname}}</div>
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
                  <v-list-item-title v-if="item.todo === 'edit'" class="greyB--text" @click="openAddstory(info, 'editpost')">{{ item.title }}</v-list-item-title>
                  <v-list-item-title v-if="item.todo === 'delete'" class="greyB--text" @click="openDeletestory(info)">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>
          </v-card-actions>

              <v-img v-if="info.picture !== ''" :src="info.picture"></v-img>
              <v-img v-if="info.picture === ''" src="../../assets/icon/icon_PETDY.png"> </v-img>

          <v-card-text class="text--primary" :class="$vuetify.breakpoint.xs ? '' : 'px-1'">
            <v-btn class="ml-n3"  icon >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <span>{{info.count_like}} like </span>
             <v-btn  icon >
              <v-icon>mdi-message-outline</v-icon>
            </v-btn>
            <span>{{info.count_comment}} Comments </span>
            <div>{{info.caption}}</div>
            <div class="mt-1 grey--text txtsmall">
              <v-icon small class="collocateIcon">mdi-clock-outline</v-icon>
              <span class="ml-1 ">{{info.DAY}} {{info.TIME}}</span>
            </div>
          </v-card-text>
        </v-card>

       <v-data-iterator
      :items="commentData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
          <v-row class="px-1 ">
            <v-col  cols="12" v-for="(item, index) in props.items"
            :key="index">
            <v-row >
              <v-col cols="1">
                 <v-avatar v-if="item.user_picture !== null && item.user_picture !== ''" class="mt-n2" size="30px">
               <v-img :src="item.user_picture"></v-img>
            </v-avatar>
             <v-avatar v-if="item.user_picture === null && item.user_picture === ''" class="mt-n2" size="30px">
               <v-img src="../../assets/icon/icon_PETDY.png"></v-img>
            </v-avatar>
              </v-col>
              <!-- -- -->
              <v-col class="primary--text "  align="end" cols="4">
                {{item.nickname}}
              </v-col>
              <!-- -- -->
              <v-col cols="5">
                {{item.comment}}
              </v-col>
              <!-- -- -->
              <v-col cols="2" align="center" >
                <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">

                  <v-icon color="greyC" v-bind="attrs"
                  v-on="on">mdi-dots-horizontal</v-icon>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item1, index) in menucomments"
                  :key="index"
                >
                  <v-list-item-title v-if="item1.eventclick === 'Edit'"  class="greyB--text" @click="openTimelineCreateComments()">{{ item1.title }}</v-list-item-title>
                  <v-list-item-title v-if="item1.eventclick === 'Delete'"  class="greyB--text" @click="openTimelineDelete()">{{ item1.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>
              </v-col>
            </v-row>
            <!-- <span class="primary--text"> {{item.nickname}} </span><span> {{item.comment}}</span> -->

            </v-col>
          </v-row>
      </template>
    </v-data-iterator>

         <v-row class="mt-15">
          <v-col></v-col>
        </v-row>

  <div  style="position: fixed;    bottom: 70px;">
 <v-toolbar height="100" style="position: fixed; height:550px; width: 1000px;">
          <v-avatar class="mt-n7" size="45px">
               <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
          <v-text-field
            class="ml-3"
            label="message"
            height="50"
            outlined
          ></v-text-field>
           <v-btn x-large icon color="success" class="mt-n7">
              <v-icon>mdi-send</v-icon>
            </v-btn>
  </v-toolbar>
    </div>

        </v-list>

      </v-card>
      <Addstory ref="Addstory" v-on:edit="editpost"/>
      <TimelineCreateComments ref="TimelineCreateComments"/>
      <TimelineDelete ref="TimelineDelete"/>
      <Deletepopup ref="Deletepopup" v-on:delete="deletepost"></Deletepopup>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import Addstory from '@/components/Home/Mystory/Addstory'
import TimelineCreateComments from '@/components/Timeline/TimelineCreateComments'
import TimelineDelete from '@/components/Timeline/TimelineDelete'
import Deletepopup from '@/components/DeletePopup'
export default {
  components: {
    Addstory,
    TimelineCreateComments,
    TimelineDelete,
    Deletepopup
  },
  data () {
    return {
      commentData: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      info: '',
      idpost: '',
      page: 1,
      itemsPerPage: 99999,
      menu: [{
        title: 'Edit Post',
        todo: 'edit'
      },
      {
        title: 'Delete Post',
        todo: 'delete'
      }],
      menucomments: [{
        title: 'Edit',
        eventclick: 'Edit'
      },
      {
        title: 'Delete',
        eventclick: 'Delete'
      }]
    }
  },
  methods: {
    async getcomment () {
      const body = {
        post_id: this.info.post_id
      }
      console.log('123456', body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_comment_by_post_id',
        body
      )
      // console.log('TEST', this.commentData)
      this.commentData = result.data.list_comment

      // this.num = this.$store.state.numberid
      console.log('comment', this.info.post_id)
    },
    openDialog (info) {
      this.dialog = true
      console.log('info', info)
      this.info = info
      this.getcomment()
    },
    closeDialog () {
      this.dialog = false
    },
    openAddstory (info, todo) {
      this.$refs.Addstory.openDialog(info, todo)
    },
    openTimelineCreateComments () {
      this.$refs.TimelineCreateComments.openDialog()
    },
    openTimelineDelete () {
      // this.dialog = false
      this.$refs.TimelineDelete.openSheet()
    },
    openDeletestory (info) {
      console.log(info)
      this.$refs.Deletepopup.openSheet(info, 'deletepost')
    },
    deletepost () {
      this.dialog = false
      this.$emit('updatepost')
    },
    async editpost (event) {
      console.log(event)
      const body = {
        user_id: event.user_id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_post_by_userid',
        body
      )
      console.log(result)
      result.data.list_post.forEach(post => {
        if (post.post_id === event.post_id) {
          console.log(post)
          this.info = post
        }
      })
    }
  },

  mounted () {
    this.getcomment()
    console.log('comment', this.info.post_id)
    this.idpost = this.info.post_id
  }
}
</script>
