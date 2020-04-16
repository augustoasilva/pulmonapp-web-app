<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card class="elevation-6">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Entrar</v-toolbar-title>
              <v-spacer />
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon large to="register" v-on="on">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </template>
                <span>Não tem uma conta? Registre-se!</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Login"
                  name="login"
                  prepend-inner-icon="mdi-account"
                  type="text"
                />

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="login">Entrar</v-btn>
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
        // this.$toast.success('Seja bem-vindo! ' + this.$auth.user.name)
        this.$router.push('/')
      } catch (error) {
        this.$toast.error('Um erro insperado ocorreu, tente novamente.')
        // eslint-disable-next-line no-console
        console.log(error.response)
      }
    }
  }
}
</script>
