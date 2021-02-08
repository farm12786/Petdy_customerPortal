<template>
    <v-card tile elevation="0">
      {{profile}}
      <v-card tile elevation="0">
            <v-row class="mx-0">
              <v-col class="pl-5" cols="2" sm="3" md="2">
                <v-avatar size="70" rounded="circle">
                    <v-img :src="info.pic">
                    </v-img>
                </v-avatar>
              </v-col>
              <v-col class="pl-10" cols="9" sm="9" md="10" align-self="center">
                <v-row class="mt-3 pl-6" >
                  <b class="primary--text">{{info.name}}</b>
                </v-row>
                <v-row class="pl-6 " >
                  <div v-if="info.pettype !== null && info.pettype !== ''" class="greyC--text txtsmall" id="txt">
                    {{ info.pettype }}
                  </div>

                  <div v-if="info.gender !== null && info.gender !== ''" class="greyC--text txtsmall pl-1" id="txt">
                    {{ "|" }} {{ info.gender }}
                  </div>

                  <div v-if="info.furcolor !== null && info.furcolor !== ''" class="greyC--text txtsmall pl-1" id="txt">
                    {{ "|" }} {{ info.furcolor }}
                  </div>
                </v-row>
              </v-col>

              <v-col cols="1" v-if="showmenu === 'true'" align-self="center">
                <v-row justify="center">
                  <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                          <v-icon color="greyC" v-bind="attrs" v-on="on">
                              mdi-dots-vertical
                          </v-icon>
                      </template>
                      <v-list>
                          <v-list-item
                              v-for="(item1, index) in menu"
                              :key="index"
                          >
                              <v-list-item-title v-if="item1.eventclick === 'openCreateMatching'" class="greyB--text" @click="openCreateMatching (info, 'Edit')" >{{ item1.title }}</v-list-item-title>
                              <v-list-item-title v-if="item1.eventclick === 'openDeleteMatching'" class="greyB--text" @click="Remove(info.pet_id)" >{{ item1.title }}</v-list-item-title>
                          </v-list-item>
                      </v-list>
                  </v-menu>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        <!-- <CreateMatching ref="CreateMatching"/> -->
    </v-card>
</template>

<script>
// import CreateMatching from '@/components/Community/CreateMatching'

export default {
  components: {
    // CreateMatching
  },
  props: ['info', 'showmenu', 'profiletype'],

  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      menu: [
        {
          title: 'Edit MatchingInfo',
          eventclick: 'openCreateMatching'
        },
        {
          title: 'Delete Matching',
          eventclick: 'openDeleteMatching'
        }
      ]
    }
  },
  methods: {
    editdialog () {
      this.$emit('todo', 'edit')
    },
    deletedialog () {
      this.$emit('todo', 'delete')
    },
    openCreateMatching (info, type) {
      this.$emit('todo', 'edit')
    },
    Remove (petid) {
      this.$store.commit('getupdateMatching')
      this.axios.post(
        process.env.VUE_APP_API + 'remove_pet_match', {
          pet_id: petid
        }
      ).then(res => { console.log(res.data) })
      this.$store.commit('getupdateMatching')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
