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
          <v-toolbar-title>Edit Display</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card tile elevation="0">
             <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-textarea
            label="display"
            auto-grow
            outlined
            rows="1"
            row-height="125"
            dense
          ></v-textarea>
        </v-col>
        <v-divider  class="mt-n5"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">CLOSE</v-btn>
          <v-btn text color="primary" @click="editDisplay">SAVE</v-btn>
        </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      dialog: false,
      display: '',
      info: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    openDialog (info) {
      this.dialog = true
      this.info = info
      console.log(this.info)
    },
    editDisplay () {
      console.log('edit display')
      this.dialog = false
    }
  }
}
</script>

<style scoped>
</style>
