<template>
  <v-container>
<!-- {{this.$store.state.updateDonate}} -->
    <v-row >
      <v-col col="12" sm="6" class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2' ">
         <v-data-iterator
      :items="fromlostData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
        <v-card tile class="pa-4 elevation-0 greyF1">
          <v-row class="px-2 ">
            <v-col cols="6" class="pa-1 " v-for="(item, index) in props.items"
            :key="index">
              <v-card  class="elevation-0 shop--stoke">
                  <v-card-actions :class="$vuetify.breakpoint.xs ? 'pl-3' : 'pl-0'">
            <v-avatar @click="openFriendListdialog(item)" size="25px">
               <v-img :src="item.owner_pic" ></v-img>
            </v-avatar>
            <div @click="openFriendListdialog(item)"  class="body-1 ml-2 text_hide">{{item.owner_name}}</div>

            <v-spacer></v-spacer>

            <v-menu v-if="item.user_create_id === id "  offset-y>
              <template v-slot:activator="{ on, attrs }">

                  <v-icon color="greyC" v-bind="attrs"
                  v-on="on">mdi-dots-vertical</v-icon>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item1, index) in menu"
                  :key="index"
                >
                  <v-list-item-title v-if="item1.eventclick === 'openCreateLostFound'" class="greyB--text" @click="openCreateLostFound(item,'Edit')">{{ item1.title }}</v-list-item-title>
                  <v-list-item-title v-if="item1.eventclick === 'openDeleteLostFound'" class="greyB--text" @click="Remove(item.pet_id)">{{ item1.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>
          </v-card-actions>
          <v-card-text @click="openLostFoundDetail(item)" class="text--primary pa-0 justify-center text-center">
            <v-avatar size="120px">
               <v-img :src="item.pic"></v-img>
            </v-avatar>
            <div class="shop white--text txtbold mt-2">{{ item.name }}</div>
            <div class="grey--text txtsmall text-left px-2">
              <v-icon small class="collocateIcon">mdi-clock-outline</v-icon>
              <span class="ml-1">{{item.DAY}}
                <!-- {{item.TIME}} -->
                </span>
            </div>
            <div class="grey--text txtsmall text-left px-2 pb-2 text_hide">
              <v-icon small class="collocateIcon">mdi-map-marker</v-icon>
              <span class="ml-1 ">{{ item.lastseenplace }}</span>
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
            <v-btn @click="openCreateLostFound('','Create')" v-model="fab" color="primary" dark fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-speed-dial>
    </v-row>
     <LostFoundDetail ref="LostFoundDetail"/>
      <CreateLostFound ref="CreateLostFound"/>
      <PetInformation ref="Petdetail"/>
      <FriendListdialog ref="FriendListdialog"/>

  </v-container>
</template>

<script>
import LostFoundDetail from '@/components/Community/LostFoundDetail'
import CreateLostFound from '@/components/Community/CreateLostFound'
import PetInformation from '@/components/Home/PetInformation'
import FriendListdialog from '@/components/Timeline/FriendListdialog'

import { mapState } from 'vuex'

import axios from 'axios'

export default {
  name: 'profilepetlost',
  components: {
    LostFoundDetail,
    CreateLostFound,
    PetInformation,
    FriendListdialog
  },

  created () {
    this.$emit('title', 'LostFound')
  },
  data () {
    return {
      menu: [
        {
          title: 'Edit Pet',
          eventclick: 'openCreateLostFound'
        },
        {
          title: 'Delete Pet',
          eventclick: 'openDeleteLostFound'
        }
      ],
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      hidden: false,
      fromlostData: [],
      page: 1,
      itemsPerPage: 999,
      id: '',
      fab: false
    }
  },

  methods: {
    async getlostfound () {
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_fromlost'
      )
      console.log(result)
      this.fromlostData = result.data.list_pet_fromlost
      result.data.list_pet_fromlost.forEach(fromlost => {
        var result = fromlost.datetime.split('T')
        var result2 = result[1].split('.')
        fromlost.DAY = result[0]
        fromlost.TIME = result2[0]
      })
      this.id = this.$store.state.userID
    },
    async Remove (petid) {
      await this.axios.post(
        process.env.VUE_APP_API + 'remove_pet_fromlost', {
          pet_id: petid
        }
      ).then(res => { console.log(res.data) })
      this.getlostfound()
    },

    openLostFoundDetail (info) {
      this.$refs.Petdetail.openDialog(info, 'fromother')
    },
    openCreateLostFound (info, type) {
      this.$refs.CreateLostFound.openDialog(info, type)
      console.log(type)
      console.log(info)
    },
    openFriendListdialog (info) {
      this.$refs.FriendListdialog.openDialog(info)
    }

  },
  mounted () {
    this.getlostfound()
  },
  watch: {
    updateLostFound (newValue, oldValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        console.log('update')
        this.getlostfound()
        this.$store.commit('getupdateLostFoundFALSE')
      }
    }
  },
  computed: mapState(['updateLostFound'])
}
</script>
