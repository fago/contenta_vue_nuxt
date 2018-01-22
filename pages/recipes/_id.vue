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
      return this.$store.state.routeData[0].data.attributes
    },
    recipesByCategory () {
      return this.$store.state.routeData[1].data
    }
  },
}
</script>
