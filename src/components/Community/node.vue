<template>
<!-- NODE Matching -->
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition" >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false" >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Matchinag</v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader >

<v-container>
    <v-row >
      <v-col col="12" sm="6" class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2' ">
        <Petprofile v-bind:info="info" v-bind:showmenu="'true'" v-on:todo="selectdialog"/>

<v-divider /><v-divider /><v-divider /><v-divider />
         <v-data-iterator
      :items="matchData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
        <v-card tile class="pa-4 elevation-0 ">
          <v-row class="px-2 ">
            <v-col cols="6" class="pa-1 " v-for="(item, index) in props.items"
            :key="index">
              <v-card  class="elevation-0 pink--stoke">
                  <v-card-actions :class="$vuetify.breakpoint.xs ? 'pl-3' : 'pl-0'">
            <v-avatar size="25px">
              <v-img :src=" pathS3 + item.owner_pic "></v-img>
            </v-avatar>
            <div class="body-1 ml-2 text_hide">{{item.owner_name}}</div>
            <v-spacer></v-spacer>

            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">

                  <v-icon color="greyC" v-bind="attrs"
                  v-on="on">mdi-dots-vertical</v-icon>

              </template>
              <v-list>
                <v-list-item
                  v-for="(item1, index) in menu"
                  :key="index"
                >
                  <v-list-item-title v-if="item1.eventclick === 'openCreateMatching'" class="greyB--text" @click="openCreateMatching(item,'Edit')">{{ item1.title }}</v-list-item-title>
                  <v-list-item-title v-if="item1.eventclick === 'openDeleteMatching'" class="greyB--text" @click="Remove(item.pet_id)">{{ item1.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>

          </v-card-actions>
          <v-card-text @click="openMatchinagDetail(item)" class="text--primary pa-0 justify-center text-center">
            <v-avatar size="120px">
            <v-img v-if="item.pic !== ''" :src=" pathS3 + item.pic " ></v-img>
            <v-img v-if="item.pic === ''" src="../../assets/icon/icon_PETDY.png"></v-img>
            </v-avatar>
            <div ><v-card tile height="22"  class="pink white--text txtbold mt-2 elevation-0">
              {{item.title}}
            </v-card></div>
            <div  class="grey--text txtsmall text-left px-2">
              <v-icon small class="collocateIcon">mdi-clock-outline</v-icon>
              <span class="ml-1">{{item.DAY}} {{item.TIME}}</span>
            </div>
             <div class="grey--text txtsmall text-left px-2 pb-2 text_hide">
              <v-icon small class="collocateIcon">mdi-map-marker</v-icon>
              <span class="ml-1 ">{{ item.matchingplace }}</span>
            </div>
          </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </template>
      <template v-slot:footer>
            <v-container grid-list-xs class="py-0 px-4
            ">
              <v-row>
                <v-col cols="4" class="text-left py-0">
                  <v-btn v-if="page !== 1" dark small outlined color="primary" class="mr-1" @click="formerPage">
                    <v-icon>mdi-chevron-left</v-icon>
                    Back
                  </v-btn>
                </v-col>
                <v-col cols="4" class="text-center py-0">
                  <span class="txtsmall greyB--text mt-6">
                    Page {{ page }} of {{ numberOfPages }}
                  </span>
                </v-col>
                <v-col cols="4" class="text-right py-0">
                  <v-btn v-if="page !== numberOfPages" dark small outlined color="primary" class="ml-1" @click="nextPage">
                    <v-icon>mdi-chevron-right</v-icon>
                    Next
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-speed-dial v-model="fab" :bottom="true" :right="true" :open-on-hover="false"
          direction="top" transition="slide-y-reverse-transition" class="mb-15" fixed
        >
          <template v-slot:activator>
            <v-btn @click="openCreateMatching(info,'Create')" v-model="fab" color="primary" dark fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-speed-dial>
          </template>
    </v-data-iterator>
    </v-col>

    </v-row>
     <MatchinagDetail ref="MatchinagDetail"/>
     <CreateMatching ref="CreateMatching"/>
  </v-container>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import MatchinagDetail from '@/components/Community/MatchinagDetail'
import CreateMatching from '@/components/Community/CreateMatching'
import Petprofile from '@/components/Petprofile'
import axios from 'axios'
export default {
  components: {
    MatchinagDetail,
    CreateMatching,
    Petprofile
  },
  data () {
    return {
      menu: [
        {
          title: 'Edit MatchingInfo',
          eventclick: 'openCreateMatching'
        },
        {
          title: 'Delete Matching',
          eventclick: 'openDeleteMatching'
        }
      ],
      currentPositions: { lat: 0, lng: 0 },
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      hidden: false,
      matchData: [],
      page: 1,
      itemsPerPage: 4,
      info: '',
      updateMatching: '',
      fab: false
    }
  },
  async mounted () {

  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.matchData.length / this.itemsPerPage)
    }
  },
  methods: {
    async getmatching () {
      if (this.info.gender === 'Female') {
        console.log('test')
        let body = ''
        if (this.info.pettype === 'Dog') {
          console.log('test123')
          body = {
            pet_type: 'Dog',
            gender: 'Female'
          }
        } else if (this.info.pettype === 'Cat') {
          console.log('test123')
          body = {
            pet_type: 'Cat',
            gender: 'Female'
          }
        } else if (this.info.pettype === 'Other') {
          body = {
            pet_type: 'Other',
            gender: 'Female'
          }
        }
        const result = await axios.post(
          process.env.VUE_APP_API + 'get_pet_match',
          body
        )
        this.matchData = result.data.list_pet_match
        result.data.list_pet_match.forEach(match => {
          var result = match.datetime.split('T')
          var result2 = result[1].split('.')
          match.DAY = result[0]
          match.TIME = result2[0]
          // this.matchData.push(match)
        })
      } else if (this.info.gender === 'Male') {
        console.log('test')
        let body = ''
        if (this.info.pettype === 'Dog') {
          console.log('test123')
          body = {
            pet_type: 'Dog',
            gender: 'Male'
          }
        } else if (this.info.pettype === 'Cat') {
          console.log('test123')
          body = {
            pet_type: 'Cat',
            gender: 'Male'
          }
        } else if (this.info.pettype === 'Other') {
          console.log('test123')
          body = {
            pet_type: 'Other',
            gender: 'Male'
          }
        }
        const result = await axios.post(
          process.env.VUE_APP_API + 'get_pet_match',
          body
        )
        this.matchData = result.data.list_pet_match
        result.data.list_pet_match.forEach(match => {
          var result = match.datetime.split('T')
          var result2 = result[1].split('.')
          match.DAY = result[0]
          match.TIME = result2[0]
          // this.matchData.push(match)
        })
      }
    },
    Remove (petid) {
      this.axios.post(
        process.env.VUE_APP_API + 'remove_pet_match', {
          pet_id: petid
        }
      ).then(res => { console.log(res.data) })
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    openMatchinagDetail (info) {
      this.$refs.MatchinagDetail.openDialog(info)
    },
    openCreateMatching (info, type) {
      this.$refs.CreateMatching.openDialog(info, type)
      console.log('แนบ', type)
      console.log('info', info)
    },
    openDialog (info) {
      console.log(info)
      this.dialog = true
      console.log('info', info)
      this.info = info
      this.getmatching()
    },
    closeDialog () {
      this.dialog = false
    },
    selectdialog (event) {
      console.log(event)
      if (event === 'edit') {
        this.openCreateMatching(this.item, 'Edit')
      } else if (event === 'delete') {

      }
    }
  }
}
</script>
