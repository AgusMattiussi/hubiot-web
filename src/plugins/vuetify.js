import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.lighten1, /* #5C6BC0 */
        secondary: colors.indigo.lighten4, /* #C5CAE9 */
        accent: colors.indigo.accent1, /* #8C9EFF */
        contras: colors.deepOrange.lighten2 /* #FF8A65 */
      }
    }
  }
})
