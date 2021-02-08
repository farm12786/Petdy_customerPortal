<template>
  <v-container :class="$vuetify.breakpoint.xs ? 'py-0' : ''">
    <v-row>
      <v-col col="12" class="pa-0" :class="$vuetify.breakpoint.xs ? '' : 'px-2' ">
         <v-data-iterator
          :items="itemsBlog"
          :items-per-page="itemsPerPage"
          :page="page"
          hide-default-footer data-app>
          <template v-slot:default="props" >
            <v-card tile class="pa-4 elevation-0 opa-0">
              <v-row class="px-3">
                <div class="txtbold">{{ blogType }}</div>
              </v-row>
              <v-row class="px-2 ">
                <v-col cols="6" sm="3" class="pa-1 " v-for="(item, index) in props.items"
                :key="index">
                  <v-card  @click="openBlogDetail(item)" class="elevation-0 greyF1--stoke ">
                    <v-img :src="pathS3 + item.image"> </v-img>
                    <v-card-text class="text--primary align-center pa-2">
                      <div v-if="blogType !== 'Dog'|| blogType !== 'Cat'"   class="text_hide">{{ item.content_short_en}}</div>
                       <div v-if="blogType.substring(0, 5) === 'Breed'" class="text_hide">  {{ item.pet_title_th  }} ({{ item.pet_title }})</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </template>

        </v-data-iterator>
      </v-col>
    </v-row>
    <BlogDetail ref="blogDetail"/>
  </v-container>
</template>

<script>
import BlogDetail from '@/components/Community/BlogDetail'
import axios from 'axios'

export default {
  components: {
    BlogDetail
  },
  created () {
    this.blogType = this.$route.params.type
    this.$emit('title', 'Blog')
  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      blogType: '',
      dialog: false,
      hidden: false,
      itemsBlog: [],
      page: 1,
      itemsPerPage: 999,
      blogName: '',
      blogContent: ''
    }
  },
  async mounted () {
    if (this.blogType.substring(0, 5) === 'Breed') {
      let body = ''
      if (this.blogType === 'Breed Dog') {
        body = { pet_type: 'DOG' }
      } else if (this.blogType === 'Breed Cat') {
        body = { pet_type: 'CAT' }
      }
      const result = await axios.post(process.env.VUE_APP_API + 'get_breed_pets', body)
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
  computed: {
    numberOfPages () {
      return Math.ceil(this.itemsBlog.length / this.itemsPerPage)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    openBlogDetail (info) {
      this.$refs.blogDetail.openDialog(info)
    },
    test () {
      this.$emit('title', 'Blog')
    }
  }
}
</script>
