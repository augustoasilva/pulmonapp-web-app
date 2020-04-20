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
              v-model="contactNumber"
              :rules="contactNumbertRules"
              label="Telefone para contato"
              hint="Digite o telefone com (DDD). Ex.: (86) 91234-5678"
              persistent-hint
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="kinship"
              :rules="kinshiptRules"
              label="Parentesco"
              hint="Grau de parentensco com o paciente."
              persistent-hint
              required
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
              @click="registerFamilyMember"
            >
              Cadastrar
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-btn color="error" block class="mr-4" @click="goBack">
              Voltar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'client',
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
      contactNumber: '',
      contactNumbertRules: [],
      kinship: '',
      kinshiptRules: []
    }
  },
  methods: {
    async registerFamilyMember() {
      const data = {
        familyMember: {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          contactNumber: this.contactNumber,
          kinship: this.kinship
        },
        assignedBy: this.$auth.user.id
      }
      try {
        const response = await this.$axios.put(
          `/api/v1/patients/${this.$route.params.id}/family`,
          data
        )
        if (response.status === 200) {
          const toastMsg = 'Familiar adicionado com sucesso!'
          this.$toast(toastMsg, {
            color: 'success',
            timeout: 2000,
            icon: 'mdi-account-multiple-check',
            dismissable: true,
            showClose: false
          })
          this.$refs.form.reset()
        }
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
    },
    goBack() {
      this.$router.push(`/patients/${this.$route.params.id}`)
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
