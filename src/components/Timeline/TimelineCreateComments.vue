<template>
    <v-dialog
      v-model="dialog"
      width="800"
      height="100"
      persistent
    >
      <v-card  width="800">
         <v-toolbar
          class="toolbar1"
          dark
          color="primary"
        >
          <v-toolbar-title>Edit Comment</v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>

        <v-card tile elevation="0" height="150">
             <v-col
          cols="12"
          sm="6"
          md="4"
        >
         <v-textarea
            label="comment"
            auto-grow
            outlined
            rows="1"
            row-height="125"
            dense
          ></v-textarea>
        </v-col>

        </v-card>

        <v-divider></v-divider>

                  <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">CLOSE</v-btn>
          <v-btn text color="success" @click="uploadCroppedImage">SAVE</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      pathS3: process.env.VUE_APP_S3,
      dialog: false,
      info: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    openDialog () {
      console.log()
      this.dialog = true
    }
  }
}
</script>

<style scoped>
</style>
