<template>
  <v-row align="center" align-content="center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Lista de pacientes
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="patients"
          :search="search"
          :loading="loading"
          :loading-text="loadingText"
          :page.sync="page"
          :items-per-page="itemsPerPage.value"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.edit="{ item }">
            <v-btn color="primary" :to="getLink(item._id)" block>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.historic="{ item }">
            <v-btn color="secondary" :to="getHistoric(item._id)" block>
              <v-icon>mdi-clipboard-account</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-center pa-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
          <v-select
            v-model="itemsPerPage"
            :items="items"
            item-text="text"
            item-value="value"
            label="Pacientes por página"
            return-object
          >
          </v-select>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'client',
  middleware: ['auth'],
  async asyncData({ $axios }) {
    const { patients } = await $axios.$get('/api/v1/patients')
    return { patients }
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: { text: '5 pacientes', value: 5 },
      // itemsPerPageParsed: 5,
      search: '',
      headers: [
        { text: 'Nome', align: 'start', value: 'firstName' },
        { text: 'Nome(s) do meio', value: 'middleName' },
        { text: 'Sobrenome', value: 'lastName' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Última atualização:', value: 'updatedAt' },
        { text: 'Editar', sortable: false, value: 'edit' },
        { text: 'Histórico', sortable: false, value: 'historic' }
      ],
      items: [
        { text: '1 paciente', value: 1 },
        { text: '5 pacientes', value: 5 },
        { text: '10 pacientes', value: 10 },
        { text: '25 pacientes', value: 25 },
        { text: '50 pacientes', value: 50 }
      ],
      loading: false,
      loadingText: 'A tabela está carregando, espera um momento!'
    }
  },
  methods: {
    getLink(id) {
      const uri = `/patients/${id}`
      return uri
    },
    getHistoric(id) {
      const uri = `/patients/${id}/historics`
      return uri
    }
  }
}
</script>

<style></style>
