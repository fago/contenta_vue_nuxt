/**
 * Functions to get content from Contenta JSON API
 */
import jsonApiClient from './jsonApiClient'
import SubRequests from 'd8-subrequests'
import axios from 'axios'
import jsonapiParse from "jsonapi-parse";
const jsonApi = jsonApiClient()


export async function getRecipePageData(uuid) {
  const subrequests = new SubRequests(process.env.jsonApiServer + "/subrequests?_format=json")

  // Load recipe by UUID.
  let query = {
    include: 'image,category,image.thumbnail',
    filter: {
      isPublished: {
        path: 'isPublished',
        value: 1
      }
    }
  }
  subrequests.add({
    uri: process.env.jsonApiPrefix + "/recipes/" + uuid,
    options: query
  })

  // Find latest 4 recipes by cateory.
  const categoryName = 'Main course';
  const limit = 4;
  query = {
    sort: '-created',
    include: 'image,image.thumbnail',
    filter: {
      categoryName: {
        condition: {
          path: 'category.name',
          value: categoryName
        }
      }
    },
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url'
    },
    page: {
      offset: 0,
      limit: limit
    }
  }
  subrequests.add({
    uri: process.env.jsonApiPrefix + "/recipes",
    options: query
  })



  return axios.get(subrequests.getUrl())
    .then(function (response) {
      let combined_data = [];
      for (let key in response.data) {
        combined_data.push(jsonapiParse.parse(response.data[key].body))
      }
      return combined_data
    })
}

/**
 * @param {String} uuid
 */
export async function findOneRecipeByUuid (uuid) {
  const query = {
    include: 'image,category,image.thumbnail',
    filter: {
      isPublished: {
        path: 'isPublished',
        value: 1
      }
    }
  }
  return await jsonApi.get('recipes', query, uuid)
}

export async function findAllPromotedRecipes (limit = 4) {
  const query = {
    page: {
      limit
    },
    filter: {
      isPromoted: {
        path: 'isPromoted',
        value: 1
      },
      isPublished: {
        path: 'isPublished',
        value: 1
      }
    },
    include: 'image,image.thumbnail',
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url'
    },
    sort: '-created'
  }
  return await jsonApi.get('recipes', query)
}

export async function findAllRecipesCategories (limit = 20) {
  const query = {
    page: {
      limit
    }
  }
  return await jsonApi.get('categories', query)
}

export async function findAllLatestRecipes (limit = 4, offset = 0) {
  const query = {
    sort: '-created',
    page: {
      limit
    },
    include: 'image,image.thumbnail',
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url'
    }
  }
  return jsonApi.get('recipes', query)
}

export async function findHomePromotedArticlesAndRecipes (limit) {
  const promotedRecipes = jsonApi.get('recipes', {
    page: {
      limit: 3
    },
    filter: {
      isPromoted: {
        path: 'isPromoted',
        value: 1
      },
      isPublished: {
        path: 'isPublished',
        value: 1
      }
    },
    include: 'contentType,image,image.thumbnail',
    fields: {
      recipes: 'contentType,title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url',
      contentTypes: 'type'
    },
    sort: '-created'
  })
  const promotedArticles = jsonApi.get('articles', {
    page: {
      limit: 3
    },
    filter: {
      isPromoted: {
        path: 'isPromoted',
        value: 1
      },
      isPublished: {
        path: 'isPublished',
        value: 1
      }
    },
    include: 'contentType,image,image.thumbnail',
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url',
      contentTypes: 'type'
    },
    sort: '-created'
  })
  return Promise
    .all([promotedRecipes, promotedArticles])
    .then(promisesValues => {
      const data = [
        ...promisesValues[0],
        ...promisesValues[1]
      ].sort((item1, item2) => item1.createdAt > item2.createdAt).slice(0, limit)
      return data
    })
}

export async function findAllRecipesByCategoryName (categoryName, limit = 4, offset = 0) {
  const query = {
    sort: '-created',
    include: 'image,image.thumbnail',
    filter: {
      categoryName: {
        condition: {
          path: 'category.name',
          value: categoryName
        }
      }
    },
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url'
    },
    page: {
      offset: 0,
      limit: limit
    }
  }
  return await jsonApi.get('recipes', query)
}

export async function findAllRecipesByDifficultyName (difficultyName, limit = 4, offset = 0) {
  const query = {
    sort: '-created',
    include: 'image,image.thumbnail',
    filter: {
      difficulty: {
        path: 'difficulty',
        value: difficultyName
      }
    },
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url'
    },
    page: {
      offset: 0,
      limit: limit
    }
  }
  return await jsonApi.get('recipes', query)
}

export async function findAllRecipesByMaxTotalTime (maxTotalTime, limit = 4, offset = 0) {
  const query = {
    sort: '-created',
    include: 'image,image.thumbnail',
    filter: {
      totalTime: {
        condition: {
          path: 'totalTime',
          value: maxTotalTime,
          operator: '<'
        }
      }
    },
    fields: {
      recipes: 'title,difficulty,image',
      images: 'name,thumbnail',
      files: 'filename,url'
    },
    page: {
      offset: 0,
      limit: limit
    }
  }
  return await jsonApi.get('recipes', query)
}