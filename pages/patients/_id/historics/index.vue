<template>
  <v-row id="historics" align="center" align-content="center">
    <v-col cols="12">
      <v-row v-if="hasHistoric">
        <v-col v-for="historic in historics" :key="historic.id" cols="12">
          <v-card class="mx-auto">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  Assinado por:
                  {{ historic.assignedBy.firstName }}
                  {{ historic.assignedBy.middleName }}
                  {{ historic.assignedBy.lastName }}
                  em:
                  {{ historic.createdAt }}
                </div>
                <v-list-item-title class="headline mb-1">
                  {{ historic.patient.firstName }}
                  {{ historic.patient.middleName }}
                  {{ historic.patient.lastName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ historic.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions> -->
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
                    Nenhum histórico para o paciente encontrado!
                    <v-icon color="error">mdi-alert-circle</v-icon>
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Informe a equipe de desenvolvimento.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-speed-dial direction="bottom" transition="slide-y-transition" top right>
      <template v-slot:activator>
        <v-btn fab color="accent">
          <v-icon>mdi-clipboard-account</v-icon>
        </v-btn>
      </template>
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
    const { historics } = await $axios.$get(`/api/v1/historics/${params.id}`)
    let hasHistoric
    if (historics.length > 0) {
      hasHistoric = true
    } else {
      hasHistoric = false
    }
    historics.reverse()
    return { historics, hasHistoric }
  },
  data() {
    return {
      goBackURI: null
    }
  },
  mounted() {
    this.goBackURI = `/patients/${this.$route.params.id}`
  },
  methods: {}
}
</script>

<style>
#historics .v-speed-dial {
  position: fixed;
  top: 2em;
  z-index: 999;
}

#historics .v-btn--floating {
  position: relative;
}
</style>
