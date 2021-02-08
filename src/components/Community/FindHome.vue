<template>
  <v-container>
    <!-- {{this.$store.state.updateFindHome}} -->
    <v-row >
      <v-col col="12" sm="6" class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2' ">
         <v-data-iterator
      :items="findhomeData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
        <v-card tile class="pa-4 elevation-0 greyF1">
          <v-row class="px-2 ">
            <v-col cols="6" class="pa-1 " v-for="(item, index) in props.items"
            :key="index">
              <v-card class="elevation-0 hospital--stoke ">
                  <v-card-actions :class="$vuetify.breakpoint.xs ? 'pl-3' : 'pl-0'">
            <v-avatar @click="openFriendListdialog(item)" size="25px">
              <v-img :src="item.owner_pic"></v-img>
            </v-avatar>
            <div @click="openFriendListdialog(item)" class="body-1 ml-2 text_hide">{{item.owner_name}}</div>
            <v-spacer></v-spacer>
            <v-menu  v-if="item.user_create_id === id " offset-y>
              <template v-slot:activator="{ on, attrs }">

                  <v-icon color="greyC" v-bind="attrs"
                  v-on="on">mdi-dots-vertical</v-icon>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item1, index) in menu"
                  :key="index"
                >
                  <v-list-item-title v-if="item1.eventclick === 'openCreateFindHome'" class="greyB--text" @click="openCreateFindHome(item,'Edit')">{{ item1.title }}</v-list-item-title>
                  <!-- <v-list-item-title v-if="item1.eventclick === 'openDeleteFindHome'" class="greyB--text" @click="Remove(item.pet_id)">{{ item1.title }}</v-list-item-title> -->
                </v-list-item>
              </v-list>
              </v-menu>
          </v-card-actions>
          <v-card-text @click=" openFindHomeDetail(item)"  class="text--primary pa-0 justify-center text-center">
            <v-avatar size="120px">
            <v-img v-if="item.picture !== ''" :src=" item.picture " ></v-img>
            <v-img  v-if="item.picture === ''" src="../../assets/icon/icon_PETDY.png"></v-img>
            </v-avatar>
            <div class="hospital white--text txtbold mt-2">ตามหาบ้าน</div>
            <div class="grey--text txtsmall text-left px-2 text_hide">
              <v-icon small class="collocateIcon ">mdi-comment-text-outline</v-icon>
              <!-- <span class="ml-1">{{item.DAY}} {{item.TIME}}</span> -->
                            <span  class="ml-1 ">{{item.detail}}</span>

            </div>
            <div class="grey--text txtsmall text-left px-2 pb-2 text_hide">
              <v-icon small class="collocateIcon">mdi-map-marker</v-icon>
              <span class="ml-1">{{ item.place}}</span>
            </div>
          </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </template>

    </v-data-iterator>
    </v-col>
     <v-speed-dial v-model="fab" :bottom="true" :right="true" :open-on-hover="false"
          direction="top" transition="slide-y-reverse-transition" class="mb-15" fixed
        >
          <template v-slot:activator>
            <v-btn @click="openCreateFindHome('','Create')" v-model="fab" color="primary" dark fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-speed-dial>

    </v-row>
    <FindHomeDetail ref="FindHomeDetail"/>
    <CreateFindHome ref="CreateFindHome"/>
    <FriendListdialog ref="FriendListdialog"/>

  </v-container>
</template>

<script>
import axios from 'axios'
import FindHomeDetail from '@/components/Community/FindHomeDetail'
import CreateFindHome from '@/components/Community/CreateFindHome'
import FriendListdialog from '@/components/Timeline/FriendListdialog'

import { mapState } from 'vuex'

export default {

  components: {
    FindHomeDetail,
    CreateFindHome,
    FriendListdialog
  },
  name: 'profilefindhome',
  data () {
    return {
      menu: [
        {
          title: 'Edit Pet',
          eventclick: 'openCreateFindHome'
        }
      ],
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      hidden: false,
      findhomeData: [],
      page: 1,
      itemsPerPage: 999,
      id: '',
      fab: false
    }
  },

  methods: {
    async getfindhome () {
      const result = await axios.post(process.env.VUE_APP_API + 'get_pet_find_home')
      console.log(result)
      this.findhomeData = result.data.list_pet_findhome
      result.data.list_pet_findhome.forEach(findhome => {
        var result = findhome.create_date.split('T')
        var result2 = result[1].split('.')
        findhome.DAY = result[0]
        findhome.TIME = result2[0]
      })
      this.id = this.$store.state.userID
    },
    openFindHomeDetail (info) {
      this.$refs.FindHomeDetail.openDialog(info)
    },
    openCreateFindHome (info, type) {
      this.$refs.CreateFindHome.openDialog(info, type)
      console.log(type)
      console.log(info)
    },
    openFriendListdialog (info) {
      this.$refs.FriendListdialog.openDialog(info)
    }
  },
  mounted () {
    this.getfindhome()
  },
  watch: {
    updateFindHome (newValue, oldValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        console.log('update')
        this.getfindhome()
        this.$store.commit('getupdateFindHomeFALSE')
      }
    }
  },
  computed: mapState(['updateFindHome'])
}
</script>
