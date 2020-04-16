<template>
  <v-row id="professional" align="center" align-content="center">
    <v-col cols="12">
      <!-- <v-row v-if="hasPhoto" justify="space-around">
        <v-col cols="12">
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.png"
            height="150"
            aspect-ratio="1.4"
            contain
          ></v-img>
        </v-col>
      </v-row> -->
      <v-form ref="form" fluid>
        <!-- <v-row v-if="!hasPhoto">
          <v-col cols="12">
            <v-file-input label="Foto" prepend-icon="mdi-camera"></v-file-input>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.firstName"
              :rules="firstNameRules"
              label="Nome"
              hint="Digite apenas o primeiro nome."
              persistent-hint
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.middleName"
              :rules="middleNameRules"
              label="Nome(s) do meio"
              hint="Digite todos os nomes do meio."
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.lastName"
              :rules="lastNameRules"
              label="Sobrenome"
              hint="Digite apenas o último nome."
              persistent-hint
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="user.rg"
              :rules="rgRules"
              label="RG"
              hint="Digite os números, orgão expedidor e estado. Ex.: 123456SSPPI."
              persistent-hint
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="user.cpf"
              :rules="cpfRules"
              label="CPF"
              counter="11"
              hint="Digite apenas número."
              persistent-hint
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.hospital"
              :rules="hospitalRules"
              label="Hospital"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.location.city"
              :rules="cityRules"
              label="Cidade"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.location.city"
              :rules="stateRules"
              label="Estado"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-select
              v-model="user.profession"
              :items="professionItems"
              :rules="[(v) => !!v || 'A profissão é obrigatória.']"
              label="Profissão"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="user.registrationNumber"
              :rules="registrationNumberRules"
              label="Número de registro"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select
              v-model="user.council"
              :items="councilItens"
              :rules="[(v) => !!v || 'O Conselho é obrigatório']"
              label="Conselho/Orgão de reegistro profissional"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-btn color="info" block class="mr-4" @click="update">
              Atualizar
            </v-btn>
          </v-col>
          <!-- <v-col cols="4" sm="4" md="4">
            <v-btn
              :disabled="!valid"
              color="success"
              block
              class="mr-4"
              @click="registerprofessional"
            >
              Cadastrar
            </v-btn>
          </v-col> -->
          <v-col cols="12" sm="12" md="6">
            <v-btn color="error" block class="mr-4" @click="reset">
              Limpar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'client',
  middleware: ['auth'],
  async asyncData({ $axios, $auth }) {
    const { user } = await $axios.$get('/users/' + $auth.user.id)
    return { user }
  },
  data() {
    return {
      // valid: true,
      firstNameRules: [(v) => !!v || 'O primeiro nome é necessário.'],
      middleNameRules: [(v) => !!v || 'O(s) nome(s) é(são) necessário(s).'],
      lastNameRules: [(v) => !!v || 'O último nome é necessário.'],
      rgRules: [(v) => !!v || 'O RG é necessário.'],
      cpfRules: [(v) => !!v || 'O CPF é necessário.'],
      hospitalRules: [(v) => !!v || 'O hospital em que atende é necessário.'],
      cityRules: [(v) => !!v || 'A cidade em que atende é necessária.'],
      stateRules: [(v) => !!v || 'O estado em que atende é necessário.'],
      professionItems: [
        'Médico(a)',
        'Fisioterapeuta(a)',
        'Enfermeiro(a)',
        'Farmacêutico(a)'
      ],
      registrationNumberRules: [
        (v) => !!v || 'O número de registro do conselho é necessário.'
      ],
      councilItens: ['CRM', 'COREN', 'CREFITO', 'CRF']
    }
  },
  methods: {
    update() {},
    reset() {
      this.$refs.form.reset()
      this.tidalVolume = 0
    }
  }
}
</script>
<style scoped>
#professional .v-speed-dial {
  position: absolute;
}

#professional .v-btn--floating {
  position: relative;
}
</style>
