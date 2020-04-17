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
          <v-col cols="12" sm="12" md="6">
            <v-btn
              :disabled="!valid"
              color="success"
              block
              class="mr-4"
              @click="updatePatient"
            >
              Atualizar
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn color="error" block class="mr-4" to="/patients">
              Voltar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-speed-dial direction="bottom" transition="slide-y-transition" top right>
      <template v-slot:activator>
        <v-btn fab color="accent">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn :to="familyAdd" fab dark small color="secondary">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn :to="familyList" fab dark small color="primary">
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn :to="historicList" fab dark small color="info">
        <v-icon>mdi-clipboard-account</v-icon>
      </v-btn>
      <v-btn
        v-if="!isDischarged"
        fab
        dark
        small
        color="success"
        @click="dischargePatient"
      >
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>
      <v-btn to="/patients" fab dark small color="green">
        <v-icon>mdi-arrow-left</v-icon>
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
  async asyncData({ $axios, params }) {
    const { patient } = await $axios.$get('/api/v1/patients/' + params.id)
    const familyURI = `/patients/${params.id}/family`
    const familyAddURI = `/patients/${params.id}/family/add`
    const historicURI = `/patients/${params.id}/historics`
    return {
      firstName: patient.firstName,
      middleName: patient.middleName,
      lastName: patient.lastName,
      rg: patient.rg,
      cpf: patient.cpf,
      hospital: patient.hospital,
      city: patient.location.city,
      state: patient.location.state,
      weight: patient.weight,
      height: patient.height,
      tidalVolumeInputPerMass: patient.tidalVolumePerMass.toString(),
      sex: patient.sex,
      isDischarged: patient.isDischarged,
      tidalVolume: patient.tidalVolume,
      familyList: familyURI,
      familyAdd: familyAddURI,
      historicList: historicURI
    }
  },
  data() {
    return {
      valid: true,
      firstNameRules: [],
      middleNameRules: [],
      lastNameRules: [],
      rgRules: [],
      cpfRules: [],
      hospitalRules: [],
      cityRules: [],
      stateRules: [],
      weightRules: [
        (v) => !!v || 'O peso do(a) paciente é necessário!',
        (v) =>
          /^\d{2}\.?\d{0,2}$/.test(v) ||
          'O peso precisa ser válida. Ex.: 70 ou 90.00'
      ],
      heightRules: [
        (v) => !!v || 'Altura do(a) paciente é necessária!',
        (v) =>
          /^\d{3}\.?\d{0,2}$/.test(v) ||
          'Altura precisa ser válida. Ex.: 150 ou 180.00'
      ],
      tidalVolumeInputPerMassItens: ['4', '5', '6', '7', '8'],
      sexItens: ['Masculino', 'Feminino'],
      tidalVolumeRules: []
    }
  },
  methods: {
    async updatePatient() {
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

      const data = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        rg: this.rg,
        cpf: this.cpf,
        weight: this.weight.toString(),
        height: this.height.toString(),
        tidalVolumePerMass: this.tidalVolumeInputPerMass.toString(),
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
        const response = await this.$axios.put(
          `/api/v1/patients/${this.$route.params.id}`,
          data
        )
        if (response.status === 200) {
          // eslint-disable-next-line no-console
          console.log('Paciente atualizado!')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    async dischargePatient() {
      const data = { assignedBy: this.$auth.user.id }
      try {
        const response = await this.$axios.put(
          `/api/v1/patients/${this.$route.params.id}/discharge`,
          data
        )
        if (response.status === 200) {
          // eslint-disable-next-line no-console
          console.log('Paciente atualizado!')
          this.$router.push(`/patients/${this.$route.params.id}/historics`)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}
</script>
<style scoped>
#patient .v-speed-dial {
  position: fixed;
  top: 2em;
  z-index: 999;
}

#patient .v-btn--floating {
  position: relative;
}
</style>
