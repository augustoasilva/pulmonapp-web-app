<template>
  <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Voltar para Inínico
    </NuxtLink> -->
  <div>
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import error401 from '~/components/errors/401.vue'
import error403 from '~/components/errors/403.vue'
import error404 from '~/components/errors/404.vue'
import error409 from '~/components/errors/409.vue'
import error422 from '~/components/errors/422.vue'
import error500 from '~/components/errors/500.vue'

export default {
  layout: 'clean-error',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      title: 'Ops... Alguma coisa deu errado'
      // pageNotFound: '404 Not Found',
      // otherError: 'An error occurred'
    }
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 401) {
        return error401
      }
      if (this.error.statusCode === 403) {
        return error403
      }
      if (this.error.statusCode === 404) {
        return error404
      }
      if (this.error.statusCode === 409) {
        return error409
      }
      if (this.error.statusCode === 422) {
        return error422
      }
      // catch everything else
      return error500
    }
  },
  head() {
    return { title: this.title }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
