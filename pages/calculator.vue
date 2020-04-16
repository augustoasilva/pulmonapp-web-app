<template>
  <v-row align="center" align-content="center">
    <v-col cols="12">
      <v-row>
        <v-col>
          <v-form ref="form" fluid>
            <v-text-field
              v-model="patientWeight"
              :rules="patientWeightRules"
              label="Massa do(a) paciente (kg)"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="patientHeight"
              :rules="patientHeightRules"
              label="Altura do(a) paciente (cm)"
              required
              full-width
            ></v-text-field>
            <v-select
              v-model="tidalVolumeInput"
              :items="tidalVolumeInputItens"
              :rules="[(v) => !!v || 'Volume corrente é necessário']"
              label="Volume recorrente (ml/kg)"
              required
            ></v-select>
            <v-select
              v-model="sex"
              :items="sexItens"
              :rules="[(v) => !!v || 'O sexo do(a) paciente é necessário']"
              label="Sexo"
              required
            ></v-select>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="calculate"
            >
              Calcular
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
              Limpar
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="isTidalVolume" color="primary">
            <v-card-text class="white--text text-center">
              O volume corrente necessário é de
              <strong>{{ tidalVolume }}</strong>
              ml
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'client',
  components: {
    // Logo,
    // VuetifyLogo
  },
  middleware: ['auth'],
  data() {
    return {
      valid: true,
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
      tidalVolumeInput: null,
      tidalVolumeInputItens: ['4', '5', '6', '7', '8'],
      sex: null,
      sexItens: ['Masculino', 'Feminino'],
      isTidalVolume: false,
      tidalVolume: 0
    }
  },
  methods: {
    calculate() {
      this.$refs.form.validate()
      // const patientWeight = parseFloat(this.patientWeight)
      const patientHeight = parseFloat(this.patientHeight)
      const tidalVolumeInput = parseFloat(this.tidalVolumeInput)
      let sexVar
      switch (this.sex) {
        case 'Masculino':
          sexVar = 50
          break
        case 'Feminino':
          sexVar = 45.5
          break
      }
      const ibw = sexVar + 0.91 * (patientHeight - 152.4)
      const tidalVolume = tidalVolumeInput * ibw
      this.tidalVolume = Math.round(tidalVolume)
      this.isTidalVolume = true
    },
    reset() {
      this.$refs.form.reset()
      this.isTidalVolume = false
      this.tidalVolume = 0
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
