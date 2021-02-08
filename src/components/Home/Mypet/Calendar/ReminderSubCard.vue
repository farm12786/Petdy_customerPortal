<template>
<div>
    <v-card v-for="(event,index) in event" :key="index" elevation="0" color="hospital" class="pa-2 my-5" >
        <v-card-title class="txtbold white--text">
            {{event.title}}
        </v-card-title>
        <v-card-subtitle class="pl-5 txtsmall white--text">
            {{event.datetime.split('T')[0]}} {{event.datetime.split('T')[1].slice(0, 8)}}
        </v-card-subtitle>
    </v-card>
</div>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style lang="scss" scoped>

</style>
