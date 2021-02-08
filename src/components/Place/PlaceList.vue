<template>
  <div>
    {{ active }}
    <v-data-iterator
      :items="filterItemsPlace"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row class="px-4">
          <v-col
            col="12"
            lg="12"
            class="pa-0"
            :class="$vuetify.breakpoint.xs ? '' : 'px-2'"
          >
            <v-row class="px-2">
              <v-col
                cols="6"
                lg="3"
                class="pa-1"
                v-for="(item, index) in props.items"
                :key="index"
              >
                <v-card class="greyF1--stoke" height="100%" elevation="0" tile>
                  <v-img
                    @click="openPlaceDetail(item)"
                    :src="pathS3 + item.image"
                    height="150"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-chip :color="item.color" label text-color="white">
                          {{ item.txt }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-img>
                  <v-card-text class="text--primary align-center pa-2">
                    <div>{{ item.first_name_th }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-container grid-list-xs class="py-0 px-4">
          <v-row>
            <v-col cols="4" class="text-left py-0">
              <v-btn
                v-if="page !== 1"
                dark
                small
                outlined
                color="primary"
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
                Back
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-iterator>
    <PlaceDetail ref="placeDetail" />
  </div>
</template>

<script>
import axios from 'axios'
import PlaceDetail from '@/components/Place/PlaceDetail'
export default {
  props: ['active', 'desktop'],
  components: {
    PlaceDetail
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      itemsPlace: [],
      page: 1,
      itemsPerPage: 500,
      settingPlace: [
        {
          type: 'shop',
          txt: 'Shop',
          color: this.$vuetify.theme.themes.light.shop
        },
        {
          type: 'hotel',
          txt: 'Hotel',
          color: this.$vuetify.theme.themes.light.hotel
        },
        {
          type: 'cafe',
          txt: 'Cafe',
          color: this.$vuetify.theme.themes.light.cafe
        },
        {
          type: 'farm',
          txt: 'Farm',
          color: this.$vuetify.theme.themes.light.farm
        },
        {
          type: 'salon',
          txt: 'Salon',
          color: this.$vuetify.theme.themes.light.salon
        },
        {
          type: 'hospital',
          txt: 'Hospital',
          color: this.$vuetify.theme.themes.light.hospital
        }
      ]
    }
  },
  async mounted () {
    this.getItemPlace()
  },
  computed: {
    filterItemsPlace () {
      if (this.$store.state.placeType !== 'All') {
        return this.itemsPlace.filter(
          (val) => val.bu_type === this.$store.state.placeType.toLowerCase()
        )
      }
      return this.itemsPlace
    },
    numberOfPages () {
      return Math.ceil(this.filterItemsPlace.length / this.itemsPerPage)
    }
  },
  methods: {
    async getItemPlace () {
      const body = {
        lat: '',
        long: ''
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_business_all',
        body
      )
      this.itemsPlace = result.data.list_business
      this.itemsPlace.forEach((val) => {
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
      })
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    openPlaceDetail (info) {
      if (this.desktop === true) {
        this.$refs.placeDetail.openDialog(info, 'placedesktop')
      } else {
        this.$refs.placeDetail.openDialog(info, 'place')
      }
    }
  }
}
</script>

<style scoped>
 .v-chip--label {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
