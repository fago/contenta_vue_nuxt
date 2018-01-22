<template>
  <PageRecipesId v-bind="{recipesByCategory, recipe}" />
</template>

<script>
import { getRecipePageData, findOneRecipeByUuid, findAllRecipesByCategoryName } from '~/lib/api'
import PageRecipesId from '~/components/PageRecipesId'
export default {
  transition: 'page',
  components: { PageRecipesId },

  async asyncData ({ params }) {
    const combined_data = await getRecipePageData(params.id)
    const recipe = combined_data[0].data;
    const recipesByCategory = combined_data[1].data
    return { recipe, recipesByCategory }
  }
}
</script>
