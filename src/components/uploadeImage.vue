<template>
  <v-row class="mx-0">
    <v-col cols="12" class="mx-0" align-self="center">
              <v-row justify="center" align-content="center" class="mx-0">
                    <v-card class="uploadcard" outlined elevation="0"  :width="width" :height="height" @click="openDialog" v-if="this.$store.state.showImgstatus === false">
                          <v-row class="pa-0" justify="center" align-content="center" :style="width === 400 ? {'height':'400px'} : {'height':'250px'}">
                            <v-card-title>
                              <v-row>
                                <v-col cols="12">
                                  <v-row justify="center" align-content="center">
                                    <v-img src="../assets/icon/Mypet/upload.png" max-height="50" max-width="50"></v-img>
                                  </v-row>
                                </v-col>
                                <v-col cols="12">
                                  <v-row justify="center" align-content="center">
                                    <div>Click for upload</div>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-card-title>
                            <v-card-subtitle class="text-center">
                              <div>JPG, PNG are supported</div>
                              <div class="red--text pt-5" >* must choose image</div>
                            </v-card-subtitle>
                            </v-row>
                    </v-card>
                    <v-card elevation="0">
                      <v-img @click="openDialog" v-if="this.$store.state.showImgstatus === true" :src="this.$store.state.imgUrl" :max-width="width" :max-height="height"></v-img>
                    </v-card>
              </v-row>
    </v-col>

    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar
          tile
          elevation="0"
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
          <v-toolbar-title>upload image</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row justify="center" align-content="center">
                <croppa v-model="myCroppa"
                      :width="300"
                      :height="300"
                      :canvas-color="'#CCCCCC'"
                      :placeholder="'Choose an image'"
                      :placeholder-font-size="30"
                      :placeholder-color="'default'"
                      :accept="'image/*'"
                      :file-size-limit="0"
                      :quality="2"
                      :zoom-speed="6"
                      :disabled="false"
                      :disable-drag-and-drop="false"
                      :disable-click-to-choose="false"
                      :disable-drag-to-move="false"
                      :disable-scroll-to-zoom="false"
                      :disable-rotation="false"
                      :prevent-white-space="true"
                      :reverse-scroll-to-zoom="false"
                      :show-remove-button="false"
                      @init="handleCroppaInit"
                      @file-choose="handleCroppaFileChoose"
                      @file-size-exceed="handleCroppaFileSizeExceed"
                      @file-type-mismatch="handleCroppaFileTypeMismatch"
                      @new-image-drawn="handleNewImage"
                      @move="handleCroppaMove"
                      @zoom="handleCroppaZoom">
                </croppa>
        </v-row>

        <v-row justify="center" align-content="center">
          <v-col cols="2">
            <v-row justify="center" align-content="center">
              <v-btn icon outlined elevation="0" @click="rotateLeft"><v-icon>mdi-rotate-left</v-icon></v-btn>
            </v-row>
          </v-col>

          <v-col cols="2">
            <v-row justify="center" align-content="center">
              <v-btn icon outlined elevation="0" @click="rotateRight"><v-icon>mdi-rotate-right</v-icon></v-btn>
            </v-row>
          </v-col>

          <v-col cols="7">
            <v-row justify="center" align-content="center">
              <v-btn block outlined elevation="0" @click="changeImg" color="secondary">Change image</v-btn>
            </v-row>
          </v-col>
        </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">CLOSE</v-btn>
          <v-btn text color="success" @click="uploadCroppedImage">SAVE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['width', 'height'],
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      myCroppa: null,
      filename: ''

    }
  },
  methods: {
    openDialog () {
      this.dialog = true
      this.setwidth = this.width
      this.setheight = this.height
    },
    closeDialog () {
      this.dialog = false
      this.myCroppa.remove()
    },
    async uploadCroppedImage () {
      await this.myCroppa.generateBlob(blob => {
        this.$store.commit('getimgBlob', blob)
        console.log(this.$store.state.imgBlob)
        this.generateImage()
        this.dialog = false
      }, 'image/png', 0.1)
    },
    rotateLeft () {
      this.myCroppa.rotate(-1)
    },
    rotateRight () {
      this.myCroppa.rotate(1)
    },
    generateImage () {
      var url = this.myCroppa.generateDataUrl()
      if (!url) {
        console.log('no image')
        this.dialog = false
        return
      }
      this.$store.commit('getImgUrl', url)
      this.$store.commit('getshowImgstatusTRUE')

      this.dialog = false
    },
    handleCroppaFileChoose (file) {
      this.filename = file.name
    },
    changeImg () {
      this.myCroppa.chooseFile()
    },
    updated () {
      this.$store.commit('getimgBlob', null)
    }
  },
  computed: mapState(['cropparemove']),
  watch: {
    cropparemove (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        this.myCroppa.remove()
        this.$store.commit('getcropparemove', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadcard{border: dashed 2px var(--v-greyB-base);}
.imageBorder{border: solid 2px var(--v-greyB-base);}
</style>
