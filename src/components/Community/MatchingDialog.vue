<template>
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
          <v-toolbar-title>Matchinag </v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader >

<v-container>
    <v-row >
      <v-col col="12" sm="6" class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2' ">

        <Petprofile v-bind:info="info" v-bind:showmenu="'true'" v-on:todo="selectdialog"/>

      <v-divider /><v-divider /><v-divider /><v-divider />
      <div v-if="this.matchingstatus === 0">
            <CreateMatching v-if="editmatch === 'edit'" ref="CreateMatching" v-bind:status="'edit'" v-bind:info="info" v-on:todo="closeedit"/>
            <CreateMatching v-else ref="CreateMatching" v-bind:status="'create'" v-bind:info="info" v-on:todo="closeedit"/>
      </div>
         <v-data-iterator v-if="this.matchingstatus === 1"
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
              <v-img :src="item.owner_pic "></v-img>
            </v-avatar>
            <div class="body-1 ml-2 text_hide">{{item.owner_name}}</div>
            <v-spacer></v-spacer>

          </v-card-actions>
          <v-card-text @click="openMatchinagDetail(item)" class="text--primary pa-0 justify-center text-center">
            <v-avatar size="120px">
            <v-img v-if="item.pic !== ''" :src=" item.pic " ></v-img>
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

    </v-data-iterator>
    </v-col>

    </v-row>
     <MatchinagDetail ref="MatchinagDetail"/>
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
import { mapState } from 'vuex'
export default {
  components: {
    MatchinagDetail,
    CreateMatching,
    Petprofile
  },
  data () {
    return {

      currentPositions: { lat: 0, lng: 0 },
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      hidden: false,
      matchData: [],
      page: 1,
      itemsPerPage: 999,
      info: '',
      fab: false,
      matchingstatus: null,
      editmatch: null
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

    openMatchinagDetail (info) {
      this.$refs.MatchinagDetail.openDialog(info)
    },
    async openDialog (info) {
      console.log(info)
      this.dialog = true
      console.log('info', info)
      this.info = info
      await this.getmatching()
      this.matchingstatus = this.info.matching_status
      console.log('matching status ===', this.matchingstatus)
    },
    closeDialog () {
      this.dialog = false
    },
    selectdialog (event) {
      if (event === 'edit') {
        this.matchingstatus = 0
        this.editmatch = 'edit'
      } else if (event === 'delete') {

      }
    },
    closeedit (event) {
      if (event === 'addpet') {
        this.matchingstatus = 1
        this.editmatch = 'edit'
      } else if (event === 'editpet') {

      }
    }
  },
  mounted () {
    this.getmatching()
  },
  watch: {
    updateFindHome (newValue, oldValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        console.log('update')
        this.getmatching()
        this.$store.commit('getupdateMatchingFALSE')
      }
    }
  },
  computed: mapState(['updateMatching'])
}
</script>
