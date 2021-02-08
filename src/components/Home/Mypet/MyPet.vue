<template >
  <div class="pa-2">
    <v-card
      class="elevation-0 greyF1--stoke mb-2"
      tile
      v-for="(pet, index) in itemsPet"
      :key="index"
    >
      <v-container class="pa-0">
        <v-row>
          <v-col cols="5" class="py-0">
            <v-img
              max-height="125"
              :src="pet.pic"
              class="white--text"
              @click="openPetInformation(pet)"
            ></v-img>
          </v-col>
          <v-col cols="7" class="pl-5 pr-7 py-0 mt-2">
            <v-row>
              <div class="secondary--text">
                {{ pet.name }}
              </div>
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
                  <v-list-item-title v-if="item.eventclick === 'openPetInformation'" class="greyB--text" @click="openPetInformation(pet)">{{ item.title }}</v-list-item-title>
                  <v-list-item-title v-if="item.eventclick === 'openEditPetDialog'" class="greyB--text" @click="openEditPetDialog(pet, 'editpet')">{{ item.title }}</v-list-item-title>
                  <v-list-item-title v-if="item.eventclick === 'openDeletePetDialog'" class="greyB--text" @click="openDeletepopup(pet)">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              </v-menu>
            </v-row>
            <v-row>
              <div v-if="pet.pettype !== null && pet.pettype !== ''" class="txtsmall greyB--text" id="txt">
                {{ pet.pettype }}
              </div>

              <div v-if="pet.gender !== null && pet.gender !== ''" class="txtsmall greyB--text pl-1" id="txt">
                {{ "|" }} {{ pet.gender }}
              </div>

              <div v-if="pet.furcolor !== null && pet.furcolor !== ''" class="txtsmall greyB--text pl-1" id="txt">
                {{ "|" }} {{ pet.furcolor }}
              </div>
            </v-row>
            <v-row>
              <v-col cols="4" class="px-1 py-0 ml-n2 mt-3">
                 <div
                  class="hospital rounded text-center"
                  @click="openDeviceDialog"
                >
                  <v-avatar class="mt-1" size="30" color="white">
                    <v-img
                      class="ma-1"
                      width="70%"
                      height="70%"
                      src="../../../assets/icon/collar.png"
                    ></v-img>
                  </v-avatar>
                  <br />
                  <div class="btnTxt">Device</div>
                </div>
              </v-col>

              <v-col cols="4" class="px-1 py-0 ml-1 mt-3">
                <div
                  class="hotel rounded text-center"
                  @click="openCalendarDialog(pet)"
                >
                  <v-avatar class="mt-1" size="30" color="white">
                    <v-icon color="hotel">mdi-calendar-month</v-icon>
                  </v-avatar>

                  <br />
                  <div class="btnTxt">Calendar</div>
                </div>
              </v-col>

              <v-col cols="4" class="px-1 py-0 ml-1 mt-3">
                <div
                  class="pink rounded text-center"
                  @click="openMatchingDialog(pet)"
                >
                  <v-avatar class="mt-1" size="30" color="white">
                    <v-icon color="pink">mdi-heart-outline</v-icon>
                  </v-avatar>
                  <br />
                  <div class="btnTxt">Matching</div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        </v-container>
    </v-card>
    <PetInformation ref="PetInformation"/>
    <MatchingDialog ref="MatchingDialog" />
    <CalendarDialog ref="CalendarDialog" />
    <AddpetForm ref="AddpetFormDialog"/>
    <Deletepopup ref="Deletepopup" v-on:updateitempet="reaxios"></Deletepopup>
  </div>
</template>

<script>
import axios from 'axios'
import PetInformation from '@/components/Home/PetInformation'
import CalendarDialog from '@/components/Home/Mypet/Calendar/CalendarDialog'
import MatchingDialog from '@/components/Community/MatchingDialog'
import AddpetForm from '@/components/Home/Mypet/Addpet/AddpetForm'
import { mapState } from 'vuex'
import Deletepopup from '@/components/DeletePopup'
export default {
  components: {
    PetInformation,
    CalendarDialog,
    MatchingDialog,
    AddpetForm,
    Deletepopup
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      menu: [
        {
          title: 'Pet Info',
          eventclick: 'openPetInformation'
        },
        {
          title: 'Edit Pet',
          eventclick: 'openEditPetDialog'
        },
        {
          title: 'Delete Pet',
          eventclick: 'openDeletePetDialog'
        }
      ],
      itemsPet: [],
      menuBtn: [
        {
          icon: 'icon-info'
        }
      ],
      profiletype: ''
    }
  },
  methods: {
    openDeviceDialog () {
      console.log('DeviceDialog')
    },
    onclick_addpet () {
      this.$router.push({
        path: '/Addpet'
      })
    },
    openPetInformation (info) {
      this.$refs.PetInformation.openDialog(info, 'fromother')
    },
    openCalendarDialog (info) {
      this.$refs.CalendarDialog.openDialog(info)
    },
    openMatchingDialog (info) {
      this.$refs.MatchingDialog.openDialog(info)
      console.log('MatchingDialog')
      console.log('T = ', (info))
    },
    openEditPetDialog (info, todo) {
      this.$refs.AddpetFormDialog.openDialog(info, todo)
    },
    async getItemPet () {
      const body = {
        user_id: 1
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_by_userid',
        body
      )
      console.log(result.data.pet_data)
      this.itemsPet = result.data.pet_data
    },
    openDeletepopup (pet) {
      this.$refs.Deletepopup.openSheet(pet, 'deletepet')
    },
    reaxios () {
      this.getItemPet()
    }
  },
  mounted () {
    this.getItemPet()
    console.log(this.$store.state.closemarkerInfo)
  },
  watch: {
    updateMypet (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        this.getItemPet()
        this.$store.commit('getupdateMypet', false)
      }
    }
  },
  computed: mapState(['updateMypet'])
}
</script>

<style scoped>
#infoIcon {
  color: white;
}
#button {
  white-space: normal;
  width: 100%;
}
.btnTxt {
  font-size: 10px;
  color: white;
}
#txt {
  color: black;
}
</style>
