<template>
<div>
    <v-toolbar dark color="primary" height="75">
      <v-row>
        <v-col cols="2">
          <v-avatar size="40" color="greyF1" class="my-1">
          <img src="../assets/icon/user.png">
        </v-avatar>
        </v-col>

        <v-col cols="8">
          <v-row justify="start">
            <b class="white--text pl-5">USERNAME</b>
          </v-row>
          <v-row>
            <div class="greyF1--text pl-5 txtreg">062-671-1870</div>
          </v-row>
        </v-col>

        <v-col cols="1" align-self="end">
          <v-row>
            <v-btn small icon color="white"><v-icon>mdi-chevron-down</v-icon></v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-toolbar>

    <div class="pl-4 pt-5 txtreg greyB--text">MENU</div>
    <v-list v-for="(item,index) in menu" :key="index">

        <v-list-item @click="clickListItem(item.title)">
          <div class="icon" :class="item.icon"></div>
          <div class="pl-3 pt-1 txtreg greyB--text">{{item.title}}</div>
        </v-list-item>

      </v-list>
</div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          icon: 'icon-home',
          title: 'Home'
        },
        {
          icon: 'icon-tech',
          title: 'Technology'
        },
        {
          icon: 'icon-feature',
          title: 'Feature'
        },
        {
          icon: 'icon-product',
          title: 'Product'
        },
        {
          icon: 'icon-community',
          title: 'Community'
        },
        {
          icon: 'icon-place',
          title: 'Place'
        },
        {
          icon: 'icon-contact',
          title: 'Contact'
        }
      ]
    }
  },
  methods: {
    clickListItem (title) {
      console.log(title)
    }
  }
}
</script>

<style scoped>
.icon-home { mask: url('../assets/icon/Mainmenu/Normal.svg'); }
.icon-tech { mask: url('../assets/icon/Mainmenu/Technology.svg'); }
.icon-feature { mask: url('../assets/icon/Mainmenu/Feature.svg'); }
.icon-product { mask: url('../assets/icon/Mainmenu/Collar.svg'); }
.icon-community { mask: url('../assets/icon/Mainmenu/Community.svg'); }
.icon-place { mask: url('../assets/icon/Mainmenu/Store.svg'); }
.icon-contact { mask: url('../assets/icon/Mainmenu/Phone.svg'); }
.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: var(--v-greyC-base);
  mask-size: cover;
}
</style>
