<template>
  <v-app id="main">
    <v-navigation-drawer v-model="drawer" app>
      <!-- <v-img
        :aspect-ratio="16 / 9"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      > -->
      <v-row justify="space-around" class="white--text pt-2">
        <v-col cols="12">
          <v-list-item>
            <v-list-item-avatar color="secondary">
              <v-img
                v-if="$auth.user.imagePath"
                src="https://cdn.vuetifyjs.com/images/john.png"
              ></v-img>

              <span v-else class="white--text headline">
                {{
                  $auth.user.firstName.charAt(0) + $auth.user.lastName.charAt(0)
                }}
              </span>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link to="/profile">
            <v-list-item-content>
              <v-list-item-title class="title">
                <span>
                  {{ $auth.user.firstName }} {{ $auth.user.lastName }}
                  <v-icon v-if="$auth.user.verified" color="info" small>
                    mdi-check-decagram
                  </v-icon>
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $auth.user.council }}: {{ $auth.user.registrationNumber }} /
                {{ $auth.user.state }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <!-- </v-img> -->
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Início
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link to="/profile">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Perfil
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item link to="/calculator">
          <v-list-item-action>
            <v-icon>mdi-calculator-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Calculadora
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/patients">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pacientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="showOverlay">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Pulmonapp</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <v-col class="text-center" cols="12">
        <span class="white--text">
          Pulmonar &copy; 2020 - Licença GNU-GPLv3
        </span>
      </v-col>
    </v-footer>
    <v-overlay :z-index="zIndex" :opacity="opacity" :value="overlay">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-card-title> Você quer realmente sair?</v-card-title>
              <v-card-actions>
                <v-btn color="error" @click="logout">Sim</v-btn>
                <v-btn color="info" @click="overlay = false">Não</v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    source: String
  },
  data() {
    return {
      drawer: false,
      opacity: 0.3,
      zIndex: 999,
      overlay: false
    }
  },
  beforeDestroy() {
    this.$toast.clearQueue()
  },
  methods: {
    showOverlay() {
      this.overlay = !this.overlay
    },
    async logout() {
      const data = { id: this.$auth.user.id }

      try {
        const response = await this.$axios.post('/api/v1/auth/logout', data)

        if (response.status === 200) {
          // this.$toast.success('Até logo! ' + this.$auth.user.name)
          localStorage.removeItem('auth._token.local')
          localStorage.removeItem('auth._refresh_token.local')
          this.$cookies.remove('auth._token.local')
          this.$cookies.remove('auth._refresh_token.local')
          this.overlay = false
          this.$router.push('/login')
        }
      } catch (error) {
        // this.$toast.error('Um erro insperado ocorreu, tente novamente.')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-link {
  text-decoration: none;
}
.custom-link:hover {
  text-decoration: underline;
}
</style>
