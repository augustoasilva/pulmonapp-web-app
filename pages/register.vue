<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-6">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Registre-se</v-toolbar-title>
              <v-spacer />
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon large to="login" v-on="on">
                    <v-icon>mdi-login-variant</v-icon>
                  </v-btn>
                </template>
                <span>Já tem conta? Entre!</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="firstName"
                  label="Nome"
                  name="firstName"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  hint="Digite todos os nomes do meio."
                  persistent-hint
                  required
                />
                <v-text-field
                  v-model="middleName"
                  label="Nome(s) do meio"
                  name="lastName"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  hint="Digite apenas o primeiro nome."
                  persistent-hint
                  required
                />
                <v-text-field
                  v-model="lastName"
                  label="Sobrenome"
                  name="lastName"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  hint="Digite apenas o último nome."
                  persistent-hint
                  required
                />
                <v-text-field
                  v-model="rg"
                  label="RG"
                  name="rg"
                  prepend-inner-icon="mdi-card-account-details"
                  type="text"
                  hint="Digite os números, orgão expedidor e estado. Ex.: 123456/SSPPI."
                  persistent-hint
                  required
                />
                <v-text-field
                  v-model="cpf"
                  label="CPF"
                  name="cpf"
                  prepend-inner-icon="mdi-card-account-details"
                  type="text"
                  hint="Digite apenas número."
                  persistent-hint
                  required
                />
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  type="text"
                  required
                />
                <v-select
                  v-model="profession"
                  :items="professionItems"
                  :rules="[(v) => !!v || 'Sua profissão é necessária']"
                  label="Profissão"
                  prepend-icon="mdi-card-account-details"
                  required
                ></v-select>
                <v-text-field
                  v-model="registrationNumber"
                  label="Número de registro"
                  name="registrationNumber"
                  prepend-inner-icon="mdi-card-account-details"
                  type="text"
                  hint="Digite apenas número."
                  persistent-hint
                  required
                />
                <v-text-field
                  v-model="city"
                  label="Cidade"
                  name="city"
                  prepend-inner-icon="mdi-map-marker"
                  type="text"
                  required
                />
                <v-select
                  v-model="state"
                  :items="stateItems"
                  :rules="[(v) => !!v || 'Seu estado é obrigatório']"
                  label="Estado"
                  prepend-icon="mdi-map-marker"
                  required
                ></v-select>
                <v-text-field
                  v-model="hospital"
                  label="Hospital"
                  name="hospital"
                  prepend-inner-icon="mdi-hospital-building"
                  type="text"
                  hint="Digite o nome do hospital com as primeiras letras maiúsculas. Ex.: São Marcos"
                  persistent-hint
                  required
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  label="Senha"
                  name="password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  required
                />
                <v-text-field
                  id="confirmPassword"
                  v-model="confirmPassword"
                  label="Confirme a senha"
                  name="confirmPassword"
                  prepend-inner-icon="mdi-lock-check"
                  type="password"
                  required
                />
                <v-checkbox v-model="accepetedTerms">
                  <template v-slot:label>
                    <div>
                      Eu li e aceito os
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            :href="termsAndConditions"
                            @click.stop
                            v-on="on"
                          >
                            Termos e condições
                          </a>
                        </template>
                        Abre em nova janela.
                      </v-tooltip>
                      e com as
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            :href="privacyPolicies"
                            @click.stop
                            v-on="on"
                          >
                            Políticas de Privacidade
                          </a>
                        </template>
                        Abre em nova janela.
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="register">Registrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        {{ snackBartext }}
        <v-btn color="blue" text @click="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </v-content>
</template>

<script>
// import { process } from '@hapi/joi/lib/errors'
export default {
  layout: 'clean-blue',
  data() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      rg: '',
      cpf: '',
      email: '',
      profession: '',
      professionItems: [
        'Médico(a)',
        'Fisioterapeuta(a)',
        'Enfermeiro(a)',
        'Farmacêutico(a)'
      ],
      registrationNumber: '',
      city: '',
      state: '',
      stateItems: [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO'
      ],
      hospital: '',
      password: '',
      confirmPassword: '',
      accepetedTerms: null,
      snackBartext: '',
      snackbar: false,
      snackbarTimeout: 2000,
      termsAndConditions: '/terms-and-conditions',
      privacyPolicies: '/privacy-policies'
    }
  },
  methods: {
    async register() {
      if (!this.accepetedTerms) {
        return alert(
          'Você precisa aceitar os Termos e Condições e as Políticas de Privacidade!'
        )
      }
      const data = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        rg: this.rg,
        cpf: this.cpf,
        email: this.email,
        profession: this.profession,
        registrationNumber: this.registrationNumber,
        city: this.city,
        state: this.state,
        hospital: this.hospital,
        password: this.password,
        confirmPassword: this.confirmPassword
        // accepetedTerms: this.accepetedTerms
      }
      // eslint-disable-next-line no-console
      console.log('Register Page log: ' + data.hospital)
      const response = await this.$axios.post('/api/v1/users', data)
      if (response.status === 200 && response.data.message.type === 'success') {
        this.error = null
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: data.email,
              password: data.password
            }
          })
          // this.$toast.success('Seja bem-vindo! ' + this.$auth.user.name)
          this.$router.push('/')
        } catch (error) {
          // this.$toast.error('Um erro insperado ocorreu, tente novamente.')
          this.snackbar = true
          return (this.snackBartext =
            'Um erro insperado ocorreu, tente novamente.')
        }
      }
    }
  }
}
</script>
