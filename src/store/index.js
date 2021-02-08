import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // USER
    userID: 1,
    itemMypet: null,

    // UPLOADIMAGE
    imgUrl: '',
    showImgstatus: false,
    imgBlob: null,
    cropparemove: false,

    // PLACE
    placePageSelect: 'placeList',
    placeType: 'All',

    // MAP
    Locationlat: '',
    Locationlng: '',
    numberid: '',
    showMarkerStatus: false,
    closemarkerInfo: false,

    // STORY
    updatePost: false,

    // MATCHING
    updateMatching: false,

    // LOST&FOUND
    updateLostFound: false,

    // FINDHOME
    updateFindHome: false,

    // DONATE
    updateDonate: false,

    // MYPET
    updateMypet: false,

    // PROFILE
    updateprofile: false,
    // TIMELINE
    updateTimeline: false
  },
  mutations: {
    getPlaceType (state, val) {
      state.placeType = val
    },
    getPlacePageSelect (state, val) {
      state.placePageSelect = val
    },
    getImgUrl (state, val) {
      state.imgUrl = val
    },
    getshowImgstatusTRUE (state) {
      state.showImgstatus = true
    },
    getshowImgstatusFALSE (state) {
      state.showImgstatus = false
    },
    getLocationlat (state, val) {
      state.Locationlat = val
    },
    getLocationlng (state, val) {
      state.Locationlng = val
    },
    getimgBlob (state, val) {
      state.imgBlob = val
    },
    getuserID (state, val) {
      state.userID = val
    },
    getitemMypet (state, val) {
      state.itemMypet = val
    },
    getnumberid (state, val) {
      state.numberid = val
    },
    getshowMarkerStatusTRUE (state) {
      state.showMarkerStatus = true
    },
    getshowMarkerStatusFALSE (state) {
      state.showMarkerStatus = false
    },
    getupdatePost (state) {
      state.updatePost = !state.updatePost
    },
    getupdateMatching (state) {
      state.updateMatching = true
    },
    getupdateMatchingFALSE  (state) {
      state.updateMatching = false
    },
    getupdateLostFound (state) {
      state.updateLostFound = true
    },
    getupdateLostFoundFALSE (state) {
      state.updateLostFound = false
    },
    getupdateFindHome (state) {
      state.updateFindHome = true
    },
    getupdateFindHomeFALSE (state) {
      state.updateFindHome = false
    },
    getupdateDonate (state) {
      state.updateDonate = true
    },
    getupdateDonateFALSE (state) {
      state.updateDonate = false
    },
    getupdateTimeline (state) {
      state.updateTimeline = true
    },
    getupdateTimelineFALSE (state) {
      state.updateTimeline = false
    },
    getupdateMypet (state, val) {
      state.updateMypet = val
    },
    getupdateprofile (state, val) {
      state.updateprofile = val
    },
    getcropparemove (state, val) {
      state.cropparemove = val
    },
    getclosemarkerInfo (state, val) {
      state.closemarkerInfo = val
    }
  },
  actions: {
  },
  modules: {
  }
})
