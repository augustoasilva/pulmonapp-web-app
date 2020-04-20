<template>
  <v-content>
    <v-contaienr class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="6" sm="6">
          <v-card>
            <v-toolbar color="error" dark flat>
              <v-toolbar-title>Erro 404</v-toolbar-title>
              <v-spacer />
              <v-icon>mdi-alert</v-icon>
            </v-toolbar>
            <v-card-text>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">Página não encontrada.</div>
                  <v-list-item-title class="headline mb-1">
                    O que você está procurando não existe!
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Por favor verifique o caminho que você fez, ou informe o
                    suporte.
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="80" color="error">
                  <v-icon x-large dark>mdi-help</v-icon>
                </v-list-item-avatar>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" to="/" block>Voltar para o ínicio</v-btn>
              <!-- <NuxtLink to="/">
                Voltar para início
              </NuxtLink> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-contaienr>
  </v-content>
</template>
<script>
export default {
  name: 'Error404',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
