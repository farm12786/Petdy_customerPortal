<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <div></div>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Pet Infomation</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card tile elevation="0" color="greyF1">
          <v-card tile elevation="0">
            <v-row class="mx-0">
              <v-col class="pl-5" cols="4" sm="3" md="2">
                <v-avatar size="130" rounded="circle">
                  <v-img :src="info.pic"> </v-img>
                </v-avatar>
              </v-col>
              <v-col class="pl-10 pt-5" cols="7" sm="9" md="10">
                <v-row class="mt-3 pl-4 pr-5" align="center">
                  <b class="primary--text">{{ info.name }}</b>
                  <v-spacer></v-spacer>
                </v-row>

                <v-row class="mt-3 pl-4" align="center">
                  <b class="greyC--text txtInfo"
                    >ยินดีที่ได้รู้จัก ขอต้อนรับเข้าสู่หน้าแสดงข้อมูลของฉัน</b
                  >
                </v-row>

                <v-row class="mt-3 pl-0" align="center">
                  <v-chip
                    v-if="info.status === 1"
                    color="hospital"
                    text-color="white"
                    class="ml-4 px-5"
                  >
                    Normal
                  </v-chip>

                  <v-chip
                    v-if="info.status === 0"
                    color="shop"
                    text-color="white"
                    class="ml-4 px-5"
                  >
                    Lost !!!
                  </v-chip>
                </v-row>
              </v-col>

              <v-col cols="1" class="pt-5">
                <v-row class="mt-3">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="greyC" v-bind="attrs" v-on="on" class="">
                        mdi-dots-horizontal
                      </v-icon>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, index) in menu" :key="index">
                        <v-list-item-title
                          v-if="item.todo === 'editdisplay'"
                          class="greyB--text"
                          @click="openeditdisplay(info)"
                          >{{ item.title }}</v-list-item-title
                        >
                        <v-list-item-title
                          v-if="item.todo === 'editstatus'"
                          class="greyB--text"
                          @click="openEditPetDialog(info, 'editpet')"
                          >{{ item.title }}</v-list-item-title
                        >
                        <v-list-item-title
                          v-if="item.todo === 'deletepet'"
                          class="greyB--text"
                          @click="openDeletepopup(info)"
                          >{{ item.title }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-card tile elevation="0" class="mt-1 pa-2" height="700">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" class="txtreg greyB--text">
                  INFORMATION
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="txtreg txtInfo"> Breed </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7">
                  {{ info.breed }}
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-row>
                <v-col cols="4" class="txtreg txtInfo"> Gender </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7">
                  {{ info.gender }}
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-row>
                <v-col cols="4" class="txtreg txtInfo"> Birth Date </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7" v-if="from === 'frompetlocation'">
                  {{ info.date_of_birth.split("T")[0] }}
                </v-col>
                <v-col cols="7" v-if="from === 'fromother'">
                  {{ info.birthdate.split("T")[0] }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="4" class="txtreg txtInfo"> Fur Color </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7">
                  {{ info.furcolor }}
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-row>
                <v-col cols="4" class="txtreg txtInfo"> Weight </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7"> {{ info.weight }} Kg </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-row v-if="info.status === 0">
                <v-col cols="4" class="txtreg txtInfo"> Detail </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7">
                  {{ lostdetail.title }}
                </v-col>
              </v-row>

              <v-divider v-if="info.status === 0"></v-divider>
              <v-row v-if="info.status === 0">
                <v-col cols="4" class="txtreg txtInfo"> Last seen </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7">
                  {{ lostdetail.datetime.split("T")[0] }}
                </v-col>
              </v-row>

              <v-divider v-if="info.status === 0"></v-divider>
              <v-row v-if="info.status === 0">
                <v-col cols="4" class="txtreg txtInfo"> Location </v-col>
                <v-col cols="1" class="txtsmall"> : </v-col>
                <v-col cols="7">
                  {{ lostdetail.lastseenplace }}
                </v-col>
              </v-row>

              <v-btn
                v-if="info.status === 0"
                elevation="0"
                class="white--text mt-10"
                block
                color="shop"
              >
                Found Pet
              </v-btn>
            </v-container>
          </v-card>
        </v-card>
      </v-card>
      <EditDisplayText ref="EditDisplayText" />
      <AddpetForm ref="AddpetFormDialog" />
      <Deletepopup
        ref="Deletepopup"
        v-on:updateitempet="closeDialog"
      ></Deletepopup>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import EditDisplayText from '@/components/Home/Mypet/Addpet/EditDisplayText'
import AddpetForm from '@/components/Home/Mypet/Addpet/AddpetForm'
import Deletepopup from '@/components/DeletePopup'
export default {
  components: {
    EditDisplayText,
    AddpetForm,
    Deletepopup
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      info: '',
      menu: [
        {
          title: 'Edit Display Text',
          todo: 'editdisplay'
        },
        {
          title: 'Edit Pet',
          todo: 'editstatus'
        },
        {
          title: 'Delete Pet',
          todo: 'deletepet'
        }
      ],
      from: '',
      lostdetail: ''
    }
  },
  methods: {
    openDeletepopup (info) {
      this.$refs.Deletepopup.openSheet(info, 'deletepet')
    },
    openEditPetDialog (info, todo) {
      this.$refs.AddpetFormDialog.openDialog(info, todo)
    },
    async openDialog (info, from) {
      if (from === 'frompetlocation') {
        console.log('from : ', from)
        this.info = info
        this.from = from
        this.dialog = true
        console.log('info', info)
      } else if (from === 'fromother') {
        console.log('from : ', from)
        this.info = info
        this.from = from
        this.dialog = true
        console.log('info', info)
        await this.getpetlost()
      }
    },
    closeDialog () {
      this.dialog = false
    },
    opendeleteStatus () {
      console.log('Delete')
    },
    async getpetlost () {
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_pet_fromlost'
      )
      console.log(result)
      result.data.list_pet_fromlost.forEach((lost) => {
        if (lost.pet_id === this.info.pet_id) {
          this.lostdetail = lost
          console.log(this.lostdetail)
        }
      })
    },
    openeditdisplay () {
      this.$refs.EditDisplayText.openDialog(this.info)
    }
  }
}
</script>

<style scoped>
.txtInfo {
  font-size: 14px;
  font-weight: bold;
}
</style>
