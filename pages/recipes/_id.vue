<template>
  <PageRecipesId v-bind="{recipesByCategory, recipe}" />
</template>

<script>
import { getRecipePageData, findOneRecipeByUuid, findAllRecipesByCategoryName } from '~/lib/api'
import PageRecipesId from '~/components/PageRecipesId'
export default {
  transition: 'page',
  components: { PageRecipesId },
  computed: {
    recipe () {
      return this.$store.state.routeData[0].data
    },
    recipesByCategory () {
      return this.$store.state.routeData[1].data
    }
  },
  beforeCreate() {
    this.$store.dispatch('routeData', this.$router.currentRoute)
  }
}
</script>
