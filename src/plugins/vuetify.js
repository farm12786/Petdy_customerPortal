import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#60C9AC',
        secondary: '#F19444',
        shop: '#F17665',
        hospital: '#60C3D9',
        cafe: '#EBA0B7',
        hotel: '#EEBE15',
        farm: '#5CBE66',
        salon: '#B490E2',
        greyC: '#CCCCCC',
        greyB: '#BBBBBB',
        greyF1: '#F1F1F1',
        brown: '#C3A17B',
        pink: '#FE99B7'

      }
      // dark: {
      //   primary: colors.blue.lighten3,
      // },
    }
  }
})
