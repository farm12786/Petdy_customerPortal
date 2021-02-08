<template>

  <v-chip-group multiple>

    <!-- <v-row>
      <v-data-iterator
      :items="postData"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer data-app>
      <template v-slot:default="props" >
          <v-row class="px-1 ">
            <v-col class="pa-0" col="12" sm="6" md="4"  v-for="(item, index) in props.items"
            :key="index">

            </v-col>
          </v-row>

      </template>
    </v-data-iterator>
    </v-row> -->
    <v-badge class="mx-3 stokeImgMe" color="primary" icon="mdi-plus" bottom bordered offset-x="20" offset-y="20">
      <v-avatar @click="numberid(1)" size="65">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
      </v-avatar>
    </v-badge>
    <v-avatar @click="numberid(5)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
      <!-- {{n}} -->
    </v-avatar>
    <v-avatar @click="numberid(3)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
      <!-- {{n}} -->
    </v-avatar>
     <v-avatar @click="numberid(4)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
      <!-- {{n}} -->
    </v-avatar>
    <v-avatar @click="numberid(6)" size="65" class="mr-2 stokeImg" >
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
      <!-- {{n}} -->
    </v-avatar>

  </v-chip-group>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Timeline',
  components: {

  },
  data () {
    return {
      postData: [],
      post_id: '',
      picture: '',
      caption: '',
      create_date: '',
      edited_date: '',
      nickname: '',
      page: 1,
      itemsPerPage: 99999,
      n: ''
    }
  },
  async mounted () {
    const body = {
      user_id: 1
    }
    console.log(body)
    const result = await axios.post(
      process.env.VUE_APP_API + 'get_post_by_userid',
      body
    )
    console.log(result.data.list_post)
    this.postData = result.data.list_post
    result.data.list_post.forEach(post => {
      var result = post.create_date.split('T')
      var result2 = result[1].split('.')
      post.DAY = result[0]
      post.TIME = result2[0]
    })
  },

  methods: {
    openTimelinedialog (info) {
      this.$refs.Timelinedialog.openDialog(info)
      console.log('TEST')
    },
    numberid (num) {
      // console.log(num)
      this.$store.commit('getnumberid', num)
      this.$emit('update', num)
    }
  }
}
</script>

<style scoped>
.stokeImg { border: 3px solid var(--v-secondary-base); }
.stokeImgMe {
  border: 1px solid var(--v-ptimary-base);
}
</style>
