<template>
  <v-row id="patient" align="center" align-content="center">
    <v-col cols="12">
      <v-form ref="form" fluid>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="firstName"
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
              v-model="middleName"
              :rules="middleNameRules"
              label="Nome(s) do meio"
              hint="Digite todos os nomes do meio."
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="lastName"
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
              v-model="rg"
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
              v-model="cpf"
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
              v-model="hospital"
              :rules="hospitalRules"
              label="Hospital"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="city"
              :rules="cityRules"
              label="Cidade"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="state"
              :rules="stateRules"
              label="Estado"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="weight"
              :rules="weightRules"
              label="Massa do(a) paciente (kg)"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="height"
              :rules="heightRules"
              label="Altura do(a) paciente (cm)"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-select
              v-model="tidalVolumeInputPerMass"
              :items="tidalVolumeInputPerMassItens"
              :rules="[(v) => !!v || 'Volume corrente por massa é necessário.']"
              label="Volume corrente por massa (ml/kg)"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select
              v-model="sex"
              :items="sexItens"
              :rules="[(v) => !!v || 'O sexo do(a) paciente é necessário.']"
              label="Sexo"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="tidalVolume"
              :rules="tidalVolumeRules"
              label="Volume corrente (ml)"
              hint="Para calcular o volume corrente use apenas a altura, volume corrente por massa e sexo do(a) paciente."
              persistent-hint
              readonly
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="4" md="4">
            <v-btn
              :disabled="!valid"
              color="info"
              block
              class="mr-4"
              @click="calculateTidalVolume"
            >
              Calcular
            </v-btn>
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-btn
              :disabled="!valid"
              color="success"
              block
              class="mr-4"
              @click="registerPatient"
            >
              Cadastrar
            </v-btn>
          </v-col>
          <v-col cols="4" sm="4" md="4">
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
  components: {},
  middleware: ['auth'],
  data() {
    return {
      valid: true,
      firstName: '',
      firstNameRules: [],
      middleName: '',
      middleNameRules: [],
      lastName: '',
      lastNameRules: [],
      rg: '',
      rgRules: [],
      cpf: '',
      cpfRules: [],
      hospital: '',
      hospitalRules: [],
      city: '',
      cityRules: [],
      state: '',
      stateRules: [],
      weight: '',
      weightRules: [
        (v) => !!v || 'O peso do(a) paciente é necessário!',
        (v) =>
          /^\d{2}\.?\d{0,2}$/.test(v) ||
          'O peso precisa ser válida. Ex.: 70 ou 90.00'
      ],
      height: '',
      heightRules: [
        (v) => !!v || 'Altura do(a) paciente é necessária!',
        (v) =>
          /^\d{3}\.?\d{0,2}$/.test(v) ||
          'Altura precisa ser válida. Ex.: 150 ou 180.00'
      ],
      tidalVolumeInputPerMass: null,
      tidalVolumeInputPerMassItens: ['4', '5', '6', '7', '8'],
      sex: null,
      sexItens: ['Masculino', 'Feminino'],
      tidalVolume: null,
      tidalVolumeRules: []
    }
  },
  methods: {
    calculateTidalVolume() {
      const height = parseFloat(this.height)
      const tidalVolumePerMass = parseFloat(this.tidalVolumeInputPerMass)
      let sexVar
      switch (this.sex) {
        case 'Masculino':
          sexVar = 50
          break
        case 'Feminino':
          sexVar = 45.5
          break
      }
      const ibw = sexVar + 0.91 * (height - 152.4)
      const tidalVolume = tidalVolumePerMass * ibw
      this.tidalVolume = Math.round(tidalVolume)
    },
    async registerPatient() {
      if (!this.tidalVolume) {
        const height = parseFloat(this.height)
        const tidalVolumePerMass = parseFloat(this.tidalVolumeInputPerMass)
        let sexVar
        switch (this.sex) {
          case 'Masculino':
            sexVar = 50
            break
          case 'Feminino':
            sexVar = 45.5
            break
        }
        const ibw = sexVar + 0.91 * (height - 152.4)
        const tidalVolume = tidalVolumePerMass * ibw
        this.tidalVolume = Math.round(tidalVolume)
      }
      const data = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        rg: this.rg,
        cpf: this.cpf,
        weight: this.weight,
        height: this.height,
        tidalVolumePerMass: this.tidalVolumeInputPerMass,
        sex: this.sex,
        tidalVolume: this.tidalVolume,
        location: {
          city: this.city,
          state: this.state
        },
        hospital: this.hospital,
        assignedBy: this.$auth.user.id
      }
      try {
        const response = await this.$axios.post('/api/v1/patients', data)
        if (response.status === 200) {
          this.$refs.form.reset()
          this.tidalVolume = null
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    reset() {
      this.$refs.form.reset()
      this.tidalVolume = 0
    }
  }
}
</script>
<style scoped>
#patient .v-speed-dial {
  position: absolute;
}

#patient .v-btn--floating {
  position: relative;
}
</style>
