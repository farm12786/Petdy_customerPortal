<template>
  <v-bottom-sheet v-model="sheet" hide-overlay persistent>
    <v-card
      v-if="maptype === 'petmap'"
      tile
      elevation="0"
      class="infoCard ml-9"
    >
      <v-row justify="center" align-content="center" class="px-2">
        <v-col cols="5" sm="3" md="2" class="pr-0">
          <v-img
            @click="openPetInformation(info)"
            max-height="100"
            :src="info.pic"
          >
          </v-img>
        </v-col>

        <v-col class="pt-5 px-0" cols="6" sm="9" md="10">
          <v-row class="pl-6" align="center">
            <b class="primary--text">{{ info.name }}</b>
          </v-row>
          <v-row class="mt-2 pl-6" align="center">
            <div
              v-if="info.pettype !== null && info.pettype !== ''"
              class="txtsmall greyB--text"
              id="txt"
            >
              {{ info.pettype }}
            </div>

            <div
              v-if="info.gender !== null && info.gender !== ''"
              class="txtsmall greyB--text pl-1"
              id="txt"
            >
              {{ "|" }} {{ info.gender }}
            </div>

            <div
              v-if="info.furcolor !== null && info.furcolor !== ''"
              class="txtsmall greyB--text pl-1"
              id="txt"
            >
              {{ "|" }} {{ info.furcolor }}
            </div>
          </v-row>
          <v-row class="mt-2 pl-2" align="center">
            <v-chip
              v-if="info.status === 1"
              color="hospital"
              label
              text-color="white"
              class="ml-4"
            >
              Normal
            </v-chip>

            <v-chip
              v-if="info.status === -1"
              color="shop"
              label
              text-color="white"
              class="ml-4"
            >
              Lost !!!
            </v-chip>
          </v-row>
        </v-col>

        <v-col class="pt-1 pl-1" cols="1" sm="9" md="10" height="20">
          <v-row class="mx-0">
            <v-icon small @click="closeDialog">mdi-close</v-icon>
          </v-row>
        </v-col>

        <v-col
          v-if="maptype === 'placemap'"
          class="pl-7 pt-5"
          cols="7"
          sm="9"
          md="10"
        >
          <v-row class="pl-6" align="center">
            <b class="primary--text">{{ info.first_name_th }}</b>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      v-if="maptype === 'placemap'"
      tile
      elevation="0"
      class="infoCard ml-9"
    >
      <v-row justify="center" align-content="center" class="px-2">
        <v-col cols="5" sm="3" md="2" class="pr-0">
          <v-img
            @click="openPlaceDetail(info)"
            max-height="150"
            width="300"
            :src="pathS3 + info.image"
          >
            <v-row>
              <v-col cols="12">
                <v-chip :color="info.color" label text-color="white">
                  {{ info.txt }}
                </v-chip>
              </v-col>
            </v-row>
          </v-img>
        </v-col>

        <v-col class="pt-5 pl-5" cols="6" sm="9" md="10">
          <v-row align="center">
            <b class="black--text">{{ info.first_name_th }}</b>
          </v-row>
        </v-col>
        <v-col class="pt-1 pl-1" cols="1" sm="9" md="10" height="20">
          <v-row class="mx-0">
            <v-icon small @click="closeDialog">mdi-close</v-icon>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <PetInformation ref="PetInformation" />
    <PlaceDetail ref="placeDetail" />
  </v-bottom-sheet>
</template>

<script>
import PetInformation from '@/components/Home/PetInformation'
import PlaceDetail from '@/components/Place/PlaceDetail'
import { mapState } from 'vuex'
export default {
  components: {
    PetInformation,
    PlaceDetail
  },
  data () {
    return {
      maptype: '',
      sheet: false,
      info: '',
      pathS3: process.env.VUE_APP_S3,
      overlay: true,
      absolute: true
    }
  },

  watch: {
    sheet (newValue, oldValue) {
      if (newValue === false) {
        this.$store.commit('getshowMarkerStatusFALSE')
      }
    },
    closemarkerInfo (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        console.log('close')
        this.closeDialog()
        this.$store.commit('getclosemarkerInfo', false)
      }
    }
  },
  methods: {
    openPetInformation (info) {
      this.$refs.PetInformation.openDialog(info, 'frompetlocation')
    },
    openSheet (info, maptype) {
      this.info = info
      this.sheet = true
      console.log('info', info)
      this.maptype = maptype
      if (maptype === 'placemap') {
        this.setColor(info)
      }
    },
    closeDialog () {
      this.$store.commit('getshowMarkerStatusFALSE')
      this.sheet = false
    },
    openPlaceDetail (info) {
      this.$refs.placeDetail.openDialog(info)
    },
    setColor (val) {
      if (val.bu_type === 'shop') {
        val.txt = 'Shop'
        val.color = this.$vuetify.theme.themes.light.shop
      } else if (val.bu_type === 'hotel') {
        val.txt = 'Hotel'
        val.color = this.$vuetify.theme.themes.light.hotel
      } else if (val.bu_type === 'hospital') {
        val.txt = 'Hospital'
        val.color = this.$vuetify.theme.themes.light.hospital
      } else if (val.bu_type === 'farm') {
        val.txt = 'Farm'
        val.color = this.$vuetify.theme.themes.light.farm
      } else if (val.bu_type === 'cafe') {
        val.txt = 'Cafe'
        val.color = this.$vuetify.theme.themes.light.cafe
      } else if (val.bu_type === 'salon') {
        val.txt = 'Salon'
        val.color = this.$vuetify.theme.themes.light.salon
      }
    }
  },
  computed: mapState(['closemarkerInfo'])
}
</script>

<style lang="scss" scoped>
.infoCard {
  position: absolute;
  bottom: 100px;
  width: 80%;
}
.v-chip--label {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
