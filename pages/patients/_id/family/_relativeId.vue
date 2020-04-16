<template>
  <v-row id="patient" align="center" align-content="center">
    <v-col cols="12">
      <v-form ref="form" fluid>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="firsName"
              :rules="firsNameRules"
              label="Nome"
              hint="Digite apenas o primeiro nome"
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
              hint="Digite todos os nomes do meio"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="lastName"
              :rules="lastNameRules"
              label="Sobrenome"
              hint="Digite apenas o último nome"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="patientRg"
              :rules="patientRgtRules"
              label="RG"
              hint="Digite os números, orgão expedidor e estado. Ex.: 123456SSPPI"
              persistent-hint
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="patientCpf"
              :rules="patientCpftRules"
              label="CPF"
              counter="11"
              hint="Digite apenas número."
              persistent-hint
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-speed-dial
      direction="top"
      transition="slide-y-reverse-transition"
      bottom
      right
      open-on-hover
    >
      <template v-slot:activator>
        <v-btn fab color="secondary">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="info">
        <v-icon>mdi-calculator-variant</v-icon>
      </v-btn>
      <v-btn fab dark small color="success">
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn fab dark small color="accent">
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>
      <v-btn fab dark small color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-row>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'client',
  middleware: ['auth'],
  data() {
    return {
      valid: true,
      firsName: '',
      firsNameRules: [],
      middleName: '',
      middleNameRules: [],
      lastName: '',
      lastNameRules: [],
      patientRg: '',
      patientRgtRules: [],
      patientCpf: '',
      patientCpftRules: [],
      patientHospital: '',
      patientHospitalRules: [],
      patientCity: '',
      patientCityRules: [],
      patientState: '',
      patientStateRules: [],
      patientWeight: '',
      patientWeightRules: [
        (v) => !!v || 'O peso do(a) paciente é necessário!',
        (v) =>
          /^\d{2}\.?\d{0,2}$/.test(v) ||
          'O peso precisa ser válida. Ex.: 70 ou 90.00'
      ],
      patientHeight: '',
      patientHeightRules: [
        (v) => !!v || 'Altura do(a) paciente é necessária!',
        (v) =>
          /^\d{3}\.?\d{0,2}$/.test(v) ||
          'Altura precisa ser válida. Ex.: 150 ou 180.00'
      ],
      tidalVolumeInputPerMass: null,
      tidalVolumeInputPerMassItens: ['4', '5', '6', '7', '8'],
      sex: null,
      sexItens: ['Masculino', 'Feminino'],
      isTidalVolume: false,
      tidalVolume: 0,
      tidalVolumeRules: []
    }
  },
  methods: {
    updatePatient() {},
    reset() {
      this.$refs.form.reset()
      this.isTidalVolume = false
      this.tidalVolume = 0
    },
    cancelUpdatePatient() {}
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
