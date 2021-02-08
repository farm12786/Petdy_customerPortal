<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Blog</v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader>
          <v-container class=" mt-n3">
            <v-row>
              <v-col class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2'">
                <v-card elevation="0">
                  <v-img height="200px" :src="pathS3 + info.image" aspect-ratio="1.7" gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,.0)" >
                    <v-row class=" mt-15"> </v-row>
                    <v-card-title class="white--text mt-15">
                      <div v-if="blogType === 'Dog' || blogType === 'Cat' || type === 'Dog' || type === 'Cat'">
                        <span>{{ info.title_en }}</span>
                      </div>
                      <!-- -------------------------------------------------------------------- -->
                      <div v-if="blogType === 'Breed Cat' || blogType === 'Breed Dog'" >
                        <span>{{ info.pet_title_th }}</span>
                        <span> ({{ info.pet_title }})</span>
                      </div>
                      <!-- -------------------------------------------------------------------- -->
                    </v-card-title>
                  </v-img>
                  <div v-if="blogType === 'Dog' || blogType === 'Cat' || type === 'Dog' || type === 'Cat'">
                  <v-col tile class="pa-4">
                    <span v-html="info.content_en"></span>
                  </v-col>
                  </div>
                    <!-- -------------------------------------------------------------------- -->
                  <div v-if="blogType === 'Breed Cat' || blogType === 'Breed Dog'" >
                    <v-col><h3>คุณสมบัติของสัตว์เลี้ยง</h3></v-col>
                    <v-col align="center" justify="center" >
                      <v-card min-height="170" width="500" min-width="250" align="center" class="elevation-0 " >
                        <v-row align="center" justify="center">
                          <v-col>
                            <v-row align="center" justify="center"> <v-img  max-width="100" src="../../assets/icon/IconBody.png"></v-img></v-row>
                            <v-row align="center" justify="center">{{ info.size_filter }}</v-row>
                            </v-col>
                          <v-col>
                            <v-row sizes="10px" align="center" justify="center"> <v-img  max-width="100" src="../../assets/icon/IconCleaning.png"></v-img></v-row>
                            <v-row align="center" justify="center">{{info.clean_filter}}</v-row>
                            </v-col>
                          <v-col>
                            <v-row align="center" justify="center"><v-img  max-width="100" src="../../assets/icon/IconFur.png"></v-img></v-row>
                            <v-row align="center" justify="center">{{info.fur_filter}}</v-row>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-row align="center" justify="center"><v-img  max-width="100" src="../../assets/icon/IconBehavior.png"></v-img></v-row>
                            <v-row align="center" justify="center">{{info.friendship_filter}}</v-row>
                          </v-col>
                          <v-col>
                            <v-row align="center" justify="center"><v-img  max-width="100" src="../../assets/icon/IconArea.png"></v-img></v-row>
                            <v-row align="center" justify="center">{{ info.location_filter }}</v-row>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                    <v-col><h3>ลักษณะทั่วไป</h3></v-col>
                    <v-col>{{ info.generalization }}</v-col>
                    <v-col><h3>รายละเอียดขนาดตัว</h3></v-col>
                    <v-col>{{ info.size_detail }}</v-col>
                    <v-col><h3>รายละเอียดสีขน</h3></v-col>
                    <v-col>{{ info.furcolor }}</v-col>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.blogType = this.$route.params.type
  },
  async mounted () {
    if (this.blogType.substring(0, 5) === 'Breed') {
      let body = ''
      if (this.blogType === 'Breed Dog') {
        body = { pet_type: 'DOG' }
      } else if (this.blogType === 'Breed Cat') {
        body = { pet_type: 'CAT' }
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'get_breed_pets',
        body
      )
      this.itemsBlog = result.data.list_breed_pets
    } else {
      const result = await axios.post(process.env.VUE_APP_API + 'get_contents')
      if (this.blogType === 'Dog') {
        this.itemsBlog = result.data.list_contents_dog
      } else if (this.blogType === 'Cat') {
        this.itemsBlog = result.data.list_contents_cat
      }
    }
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      info: '',
      type: ''
    }
  },
  methods: {
    openDialog (info, type) {
      this.dialog = true
      console.log('info', info)
      this.info = info
      this.type = type
      console.log('type-type ==', info)
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
