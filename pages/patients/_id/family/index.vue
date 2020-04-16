<template>
  <v-row id="family" align="center" align-content="center">
    <v-col cols="12">
      <v-row v-if="hasFamily" align="center" align-content="center">
        <v-col
          v-for="familyMember in familyMembers"
          :key="familyMember.id"
          cols="12"
        >
          <v-card class="mx-auto">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  Parentesco: {{ familyMember.kinship }}
                </div>
                <v-list-item-title class="headline mb-1">
                  {{ familyMember.firstName }}
                  {{ familyMember.middleName }}
                  {{ familyMember.lastName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Contato: {{ familyMember.contactNumber }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else align="center" align-content="center">
        <v-col cols="12">
          <v-card class="mx-auto">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Pesquisa sem resultados</div>
                <v-list-item-title class="headline mb-1">
                  <span>
                    Nenhum familiar para contato encontrado!
                    <v-icon color="error">mdi-alert-circle</v-icon>
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Cadastre no botão abaixo.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn block color="success" @click="addFamilyMember">
                Cadastre
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-speed-dial direction="bottom" transition="slide-y-transition" top right>
      <template v-slot:activator>
        <v-btn fab color="accent">
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
      </template>
      <v-btn :to="familyAddURI" fab dark small color="secondary">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn :to="goBackURI" fab dark small color="primary">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-row>
</template>

<script>
import moment from 'moment'
moment.locale('br')

export default {
  layout: 'client',
  middleware: ['auth'],
  async asyncData({ $axios, params }) {
    const { familyMembers } = await $axios.$get(`/patients/${params.id}/family`)
    let hasFamily
    if (familyMembers.length > 0) {
      hasFamily = true
    } else {
      hasFamily = false
    }
    return { familyMembers, hasFamily }
  },
  data() {
    return {
      goBackURI: null,
      familyAddURI: null
    }
  },
  mounted() {
    this.goBackURI = `/patients/${this.$route.params.id}`
    this.familyAddURI = `/patients/${this.$route.params.id}/family/add`
  },
  methods: {
    addFamilyMember() {
      this.$router.push(`/patients/${this.$route.params.id}/family/add`)
    }
  }
}
</script>

<style scoped>
#family .v-speed-dial {
  position: fixed;
  top: 2em;
  z-index: 999;
}

#family .v-btn--floating {
  position: relative;
}
</style>
