<template>
    <div class="white">
      <v-container grid-list-xs>
        <AddpetForm/>
      </v-container>

    </div>
</template>

<script>
import AddpetForm from '@/components/Home/Mypet/Addpet/AddpetForm'
export default {
  components: {
    AddpetForm
  },
  data () {
    return {

    }
  },
  methods: {

    openaddpetDialog () {
      this.$refs.addpetDialog.openDialog()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
