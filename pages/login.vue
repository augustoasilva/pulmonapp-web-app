<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card class="elevation-6">
            <v-row>
              <v-img
                src="/logo-invert.png"
                aspect-ratio="1"
                alt="Pulmonapp logo"
                height="128"
                contain
              ></v-img>
            </v-row>
            <p class="headline font-weight-medium text-center">Pulmonapp</p>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="login"
                  prepend-inner-icon="mdi-account"
                  type="text"
                />

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Senha"
                  name="password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                />
              </v-form>
              <p>Não tem uma conta? <a href="/register">Registre-se!</a></p>
            </v-card-text>
            <v-card-actions>
              <!-- <v-spacer /> -->
              <v-btn color="primary" block @click="login">Entrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  layout: 'clean-blue',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/')
        const toastMsg =
          'Seja bem-vindo! ' +
          this.$auth.user.firstName +
          ' ' +
          this.$auth.user.lastName
        this.$toast(toastMsg, {
          color: 'success',
          timeout: 2000,
          icon: 'mdi-account',
          dismissable: true,
          showClose: false
        })
      } catch (error) {
        const toastMsg =
          'Um erro insperado ocorreu, tente novamente.\nErro: ' +
          error.response.message.text
        return this.$toast(toastMsg, {
          color: 'error',
          timeout: 2000,
          icon: 'mdi-alert-decagran',
          dismissable: true,
          showClose: false
        })
      }
    }
  }
}
</script>
