<template>
    <v-bottom-sheet
      overlay-opacity="0.7"
      v-model="sheet"
    >
      <v-row>
        <v-col class="pb-16 pl-7">
          <v-row justify="center" align-content="center">
            <v-card elevation="0" width="325" class="text-center">
              <p v-if="todo === 'deleteevent'" class="txtconferm txtreg px-4 py-5">
                Are you sure you want to delete Event?
              </p>

              <p v-if="todo === 'deletepet'" class="txtconferm txtreg px-4 py-5">
                Are you sure you want to delete Pet?
              </p>

              <p v-if="todo === 'deletepost'" class="txtconferm txtreg px-4 py-5">
                Are you sure you want to delete Post?
              </p>

              <v-divider></v-divider>
              <v-row>
                <v-col cols="5" class="pl-12" @click="cancel">
                  <v-btn text block>Cancel</v-btn>
                </v-col>

                  <v-divider
                  class="ml-8"
                  vertical
                ></v-divider>

                <v-col cols="5" v-if="todo === 'deleteevent'" @click="deleteEvent">
                  <v-btn text block  color="red">Delete</v-btn>
                </v-col>

                <v-col cols="5" v-if="todo === 'deletepet'" @click="deletepet">
                  <v-btn text block  color="red">Delete</v-btn>
                </v-col>

                <v-col cols="5" v-if="todo === 'deletepost'" @click="deletepost">
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
import axios from 'axios'
export default {
  components: {

  },
  data () {
    return {
      sheet: false,
      info: '',
      todo: ''
    }
  },
  methods: {
    openSheet (info, todo) {
      this.sheet = true
      console.log('info', info)
      this.info = info
      this.todo = todo
    },
    closeDialog () {
      this.sheet = false
    },
    async deleteEvent () {
      const body = {
        reminder_id: this.info.id
      }
      console.log(body)
      const result = await axios.post(
        process.env.VUE_APP_API + 'remove_pet_reminder',
        body
      )
      console.log(result)
      this.$emit('Emit', 'closeInfo')
      this.sheet = false
    },
    cancel () {
      console.log('cancel')
      this.$emit('Emit', 'cancel')
      this.sheet = false
    },
    async deletepet () {
      const body = {
        user_id: this.info.user_id,
        pet_id: this.info.id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'remove_my_pet',
        body
      )
      console.log(result)
      this.$emit('updateitempet')
      this.$store.commit('getupdateMypet', true)
      this.sheet = false
    },
    async deletepost () {
      console.log(this.info)
      const body = {
        post_id: this.info.post_id,
        user_create_id: this.info.user_id
      }
      const result = await axios.post(
        process.env.VUE_APP_API + 'remove_post',
        body
      )
      console.log(result)
      this.$emit('delete')
      this.$store.commit('getupdateprofile', true)
      this.sheet = false
    }
  }
}
</script>

<style lang="scss" scoped>
.txtconferm{
  font-size: 15px;
}
</style>
