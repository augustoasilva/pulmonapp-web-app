<template>
  <v-row align="center" align-content="center">
    <v-col cols="12" class="text-justify">
      <h1>Pulmonapp - Web App</h1>
      <p>
        Aplicação web desenvolvida por
        <a href="mailto:augusto.a.silva@hotmail.com">Augusto Silva</a> para
        atuar junto ao ventilador mecânico da Equipe Pulmonar.
      </p>
      <h2>Sobre a Equipe Pulmonar</h2>
      <p>
        Liderados pelo
        <a
          href="https://www.instagram.com/damascenocaio/"
          target="_blank"
          rel="noopener noreferrer"
          >Prof. Caio Damasceno</a
        >
        a Equipe Pulmonar é uma rede de colaboração multi-profissional de
        pessoas interessadas na área de tecnologia que se uniu para tentar
        contribuir no tratamento das pessoas infectadas com a COVID-19.
      </p>
      <p>
        O objetivo da equipe é contribuir com o tratamento de pacientes
        infectados com a pandemia do COVID-19 no Brasil. E será realizado isso
        através de uma equipe multi-profissional dentro da área de tecnologia,
        adaptando respiradores comumente usados no tratamento da doença, para
        atenderem mais de um paciente, chegando até 4 pacientes simutâneamente.
      </p>
      <h2>Para que serve essa aplicação?</h2>
      <p>
        Inicialmente essa aplicação serve para o auxílio de profissionais da
        saúde na hora de calcular o volume corrente para aplicar nos pacientes a
        serem tratados devido a pandemia do COVID-19 e mantém um histórico
        simples no momento.
      </p>
      <p>
        Mais funções serão adicionadas com o tempo ampliando suas
        funcionalidades.
      </p>
      <h2>Licença GNU - GPLv3</h2>
      <p>
        Este aplicativo web está licenciado sobre a licença GPLv3 e uma cópia
        dela pode ser acessada aqui na
        <a
          href="https://github.com/augustoasilva/pulmonapp-web-app/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          página de licença do Pulmonapp
        </a>
        e assim sendo o código fonte dessa aplicação se encontra aqui no
        <a
          href="https://github.com/augustoasilva/pulmonapp-web-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          repositório oficial do Pulmonapp
        </a>
        .
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'client',
  middleware: ['auth']
}
</script>

<style></style>
