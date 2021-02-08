<template>
  <v-container>
    <v-row >
<!-- ---------- -->
      <v-col col="12" sm="6" class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2' ">
         <v-data-iterator
      :items="itemsDog"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
        <v-card tile class="pa-4 elevation-0 ">
          <v-row class="px-3">
            <div class="txtbold">Dog</div>
            <v-spacer></v-spacer>
            <div @click="goPage('/community/blog/Dog')" class="txtsmall txtbold greyB--text">More</div>
          </v-row>
          <v-row class="px-2 ">
            <v-col cols="6" class="pa-1 " v-for="(item, index) in props.items"
            :key="index">
              <v-card @click="openBlogDetail(item, 'Dog')" class="elevation-0 greyF1--stoke ">
                    <v-img :src="pathS3 + item.image"> </v-img>
                    <v-card-text class="text--primary align-center pa-2">
                  <div class="text_hide">{{ item.content_short_en}}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-data-iterator>
    </v-col>
<!-- ---------- -->
      <v-col col="12" sm="6" class="pa-0" :class="$vuetify.breakpoint.xs ? 'mt-2' : 'px-2'">
        <v-data-iterator
      :items="itemsCat"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
        <v-card tile class="pa-4 elevation-0">
          <v-row class="px-3">
            <div class="txtbold">Cat</div>
            <v-spacer></v-spacer>
            <div @click="goPage('/community/blog/Cat')" class="txtsmall txtbold greyB--text">More</div>
          </v-row>
          <v-row class="px-2">
            <v-col cols="6" class="pa-1" v-for="(item, index) in props.items"
            :key="index">
              <v-card @click="openBlogDetail(item, 'Cat')" class="elevation-0 greyF1--stoke">
                    <v-img :src="pathS3 + item.image"></v-img>
                    <v-card-text class="text--primary align-center pa-2">
                  <div class="text_hide">{{ item.content_short_en}}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <BlogDetail ref="blogDetail"/>
        </template>
    </v-data-iterator>
      </v-col>

      <v-col col="12" sm="6" class="pa-0 mt-2 mb-10" :class="$vuetify.breakpoint.xs ? '' : 'px-2'">
        <v-card tile class="pa-4 elevation-0">
          <v-row class="px-3">
            <div class="txtbold">Pet Breed</div>
          </v-row>
          <v-row class="px-2">
            <v-col cols="6" class="pa-1">
              <v-card @click="goPage('/community/blog/Breed Dog')" class="pa-8 elevation-0 greyF1--stoke">
                <v-img class="mx-auto ma-2" src="../../assets/icon/Dog.png" width="60%"></v-img>
                <div class="text-center txtreg">Dog</div>
              </v-card>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-card  @click="goPage('/community/blog/Breed Cat')" class="pa-8 elevation-0 greyF1--stoke">
                <v-img class="mx-auto" src="../../assets/icon/Cat.png" width="56%"></v-img>
                <div class="text-center txtreg mt-2">Cat</div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
import BlogDetail from '@/components/Community/BlogDetail'
export default {
  created () {
    this.blogType = this.$route.params.type
  },
  components: {
    BlogDetail
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      hidden: false,
      itemsDog: [],
      itemsCat: [],
      page: 1,
      itemsPerPage: 2,
      blogName: '',
      blogContent: ''

    }
  },
  async mounted () {
    const result = await axios.post(
      process.env.VUE_APP_API + 'get_contents'
    )
    console.log(result)
    this.itemsDog = result.data.list_contents_dog
    this.itemsCat = result.data.list_contents_cat
  },
  methods: {
    goPage (url) {
      this.$router.push(url)
    },
    openBlogDetail (info, type) {
      this.$refs.blogDetail.openDialog(info, type)
      console.log('type-type ==', type)
    }
  }

}
</script>
<style lang="scss">
@import "../../assets/style/style.css";
</style>
