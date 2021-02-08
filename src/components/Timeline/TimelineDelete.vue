<template>
    <v-bottom-sheet
      overlay-opacity="0.7"
      v-model="sheet"
    >
      <v-row>
        <v-col class="pb-16 pl-7">
          <v-row justify="center" align-content="center">
            <v-card elevation="0" width="325" class="text-center">
              <p class="txtreg py-5">
                Are you sure you want to delete comment?
              </p>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="5" class="pl-12" @click="cancel()">
                  <v-btn text block>Cancel</v-btn>
                </v-col>

                  <v-divider
                  class="ml-8"
                  vertical
                ></v-divider>

                <v-col cols="5" @click="deletecomment()">
                  <v-btn text block  color="red">Delete</v-btn>
                </v-col>

              </v-row>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-bottom-sheet>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      sheet: false
    }
  },
  methods: {
    openSheet () {
      this.sheet = true
    },
    deletecomment () {
      console.log('delete')
      this.sheet = false
    },
    cancel () {
      console.log('cancel')
      this.sheet = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
