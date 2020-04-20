import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

Vue.use(VuetifyToast)
