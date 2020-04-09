import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        //Can be changed here: https://theme-generator.vuetifyjs.com/
        themes: {
          light: {
          primary: colors.indigo.base,
          secondary: colors.deepOrange.base,
          accent: colors.cyan.base,
          error: colors.red.base,
          warning: colors.amber.base,
          info: colors.blue.base,
          success: colors.green.base
          },
        },
      },
})