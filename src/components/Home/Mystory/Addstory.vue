<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Create Story</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <UploadeImage ref="addpetDialog" v-bind:width="400" v-bind:height="400"></UploadeImage>
        <v-row justify="center" align-content="center" class="mx-0">
          <v-col cols="11" >
            <v-row>
              <v-textarea
                label="Post"
                auto-grow
                outlined
                rows="4"
                row-height="30"
                v-model="postCaption"
              ></v-textarea>
            </v-row>

            <v-row>
              <v-btn v-if="todo === 'createpost'"  elevation="0" block color="primary" @click="createStory">POST</v-btn>
              <v-btn v-if="todo === 'editpost'"  elevation="0" block color="primary" @click="editStory">SAVE</v-btn>
            </v-row>
          </v-col>
        </v-row>
    </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import UploadeImage from '@/components/uploadeImage'
export default {
  components: {
    UploadeImage
  },
  data () {
    return {
      postCaption: null,
      dialog: false,
      todo: null,
      postID: null,
      blobTest: new Blob([]),
      formData: null,
      info: ''
    }
  },
  methods: {
    openDialog (info, todo) {
      this.dialog = true
      this.info = info
      this.postID = info.post_id
      if (todo === 'editpost') {
        console.log('editpost')
        this.todo = todo
        this.$store.commit('getshowImgstatusTRUE')
        this.$store.commit('getImgUrl', info.picture)
        this.postCaption = info.caption
      } else if (todo === 'createpost') {
        this.$store.commit('getshowImgstatusFALSE')
        console.log('createpost')
        this.todo = todo
        this.postCaption = ''
      }
    },
    async createStory () {
      var formData = new FormData()
      formData.append('file', this.$store.state.imgBlob, 'png')
      formData.append('caption', this.postCaption)
      formData.append('user_create_id', 1)
      const result = await axios.post(
        process.env.VUE_APP_API + 'add_post',
        formData
      )
      console.log(result)
      this.$store.commit('getcropparemove', true)
      this.$store.commit('getupdatePost')
      this.$store.commit('getimgBlob', null)
      this.$store.commit('getImgUrl', null)
      this.$store.commit('getupdateprofile', true)
      this.dialog = false
    },
    async editStory () {
      var formData = new FormData()
      if (this.$store.state.imgBlob === null) {
        formData.append('file', '')
        formData.append('caption', this.postCaption)
        formData.append('user_create_id', 1)
        formData.append('post_id', this.postID)
      } else {
        formData.append('file', this.$store.state.imgBlob, 'png')
        formData.append('caption', this.postCaption)
        formData.append('user_create_id', 1)
        formData.append('post_id', this.postID)
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'edit_post',
        formData
      )
      console.log(result)
      this.$store.commit('getcropparemove', true)
      this.$store.commit('getupdatePost')
      this.$store.commit('getimgBlob', null)
      this.$store.commit('getImgUrl', null)
      this.$store.commit('getupdateprofile', true)
      this.dialog = false
      this.$emit('edit', this.info)
    }

  }
}
</script>

<style lang="scss" scoped>
.uploadcard{border-style: dashed;}
</style>
